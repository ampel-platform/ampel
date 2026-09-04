package eu.ampel_platform.messaging_sdk.inbox;

import com.google.protobuf.Descriptors;
import eu.ampel_platform.messaging_sdk.inbox.generated.TestMessage;
import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord;
import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordId;
import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordLifecycleState;
import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordPartitionKey;
import eu.ampel_platform.messaging_sdk.inbox.persistence.ProtoBufByteSerializer;
import eu.ampel_platform.messaging_sdk.inbox.persistence.TransactionManager;
import eu.ampel_platform.messaging_sdk.inbox.persistence.db.JdbiPostgresInboxRecordRepository;
import eu.ampel_platform.messaging_sdk.inbox.persistence.db.JdbiTransactionManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class InboxRecordProcessorIT {

    private static final int MAX_PROCESSED_ITEMS_PER_RUN = 2;
    private static final InboxRecordRetryStrategy STATIC_RETRY_STRATEGY = _ -> Optional.of(10);

    private PostgresTestEnvironment dbEnv;
    private JdbiPostgresInboxRecordRepository storage;
    private TransactionManager txManager;

    @BeforeEach
    public void setUp() {
        dbEnv = PostgresTestEnvironment.createDefault();
        dbEnv.startEnvironment();

        var jdbi = dbEnv.getJdbiInstance();
        storage = new JdbiPostgresInboxRecordRepository(jdbi, new ProtoBufByteSerializer());
        txManager = new JdbiTransactionManager(jdbi);
    }

    @AfterEach
    public void tearDown() {
        dbEnv.stopEnvironment();
    }

    private InboxRecordProcessor getProcessor(
            InboxRecordRetryStrategy retryStrategy,
            Map<Descriptors.Descriptor, InboxRecordHandler> handlers) {
        return new InboxRecordProcessor(
                storage,
                txManager,
                MAX_PROCESSED_ITEMS_PER_RUN,
                retryStrategy,
                handlers);
    }

    private InboxRecordProcessor getProcessor(
            InboxRecordRetryStrategy retryStrategy,
            Map<Descriptors.Descriptor, InboxRecordHandler> handlers,
            int maxProcessableItems) {
        return new InboxRecordProcessor(
                storage,
                txManager,
                maxProcessableItems,
                retryStrategy,
                handlers);
    }

    @Test
    public void shouldSucceed_ThereAreNoClaimableRecords() {
        var processor = getProcessor(STATIC_RETRY_STRATEGY, Map.of());
        assertDoesNotThrow(processor::runProcessing);
    }

    @Test
    public void shouldSucceed_NoRegisteredHandlerMarksTheRecordForRetry() {
        var record = InboxRecord.newlyRegistered(
                new InboxRecordId("rec-A"),
                new InboxRecordPartitionKey("test-part"),
                TestMessage.newBuilder()
                        .setFoo("test")
                        .build());

        txManager.inTransaction(() -> storage.store(record));

        var processor = getProcessor(STATIC_RETRY_STRATEGY, Map.of());
        processor.runProcessing();

        var recoveredRecord = txManager.inTransaction(() -> storage.findById(record.getId()));

        assertTrue(recoveredRecord.isPresent());
        assertEquals(InboxRecordLifecycleState.WAITING_FOR_RETRY, recoveredRecord.get().getLifecycle().state());
        assertTrue(record.getLifecycle().processingError().failureCount() <
                recoveredRecord.get().getLifecycle().processingError().failureCount());
    }

    @Test
    public void shouldSucceed_ExceptionDuringRecordHandlingLeadsToRemainingClaimedRecordsInSamePartitionGettingUnclaimed() {
        var sharedPartitionKey = new InboxRecordPartitionKey("test-part");
        var recordA = InboxRecord.newlyRegistered(
                new InboxRecordId("rec-A"),
                sharedPartitionKey,
                TestMessage.newBuilder()
                        .setFoo("test")
                        .build());
        var recordB = InboxRecord.newlyRegistered(
                new InboxRecordId("rec-B"),
                sharedPartitionKey,
                TestMessage.newBuilder()
                        .setFoo("test")
                        .build());

        txManager.inTransaction(() -> {
            storage.store(recordA);
            storage.store(recordB);
        });

        var throwingHandler = new InboxRecordHandler() {
            @Override
            public void accept(InboxRecord record) throws InboxRecordHandlerException {
                throw new InboxRecordHandlerException("dedicated-throw");
            }
        };

        var processor = getProcessor(STATIC_RETRY_STRATEGY, Map.of(
                TestMessage.getDescriptor(), throwingHandler));
        processor.runProcessing();

        var recoveredRecordA = txManager.inTransaction(() -> storage.findById(recordA.getId()));

        var recoveredRecordB = txManager.inTransaction(() -> storage.findById(recordB.getId()));

        assertTrue(recoveredRecordA.isPresent());
        assertEquals(InboxRecordLifecycleState.WAITING_FOR_RETRY, recoveredRecordA.get().getLifecycle().state());
        assertEquals(recordA.getLifecycle().processingError().failureCount() + 1,
                recoveredRecordA.get().getLifecycle().processingError().failureCount());

        assertTrue(recoveredRecordB.isPresent());
        assertEquals(InboxRecordLifecycleState.PENDING, recoveredRecordB.get().getLifecycle().state());
        assertEquals(recordB.getLifecycle().processingError().failureCount(),
                recoveredRecordB.get().getLifecycle().processingError().failureCount());
    }

    @Test
    public void shouldSucceed_ErrorInPartitionDoesNotAffectOtherPartition() {
        var recordA = InboxRecord.newlyRegistered(
                new InboxRecordId("rec-A"),
                new InboxRecordPartitionKey("part-A"),
                TestMessage.newBuilder()
                        .setFoo("test-message")
                        .build());
        var recordB = InboxRecord.newlyRegistered(
                new InboxRecordId("rec-B"),
                new InboxRecordPartitionKey("part-B"),
                TestMessage.newBuilder()
                        .setFoo("other-test-message")
                        .build());

        txManager.inTransaction(() -> {
            storage.store(recordA);
            storage.store(recordB);
        });

        var firstInvocationFailsHandler = new InboxRecordHandler() {
            private int invocationCounter = 0;

            @Override
            public void accept(InboxRecord record) throws InboxRecordHandlerException {
                if (invocationCounter == 0) {
                    invocationCounter++;
                    throw new InboxRecordHandlerException("dedicated-throw");
                }
                invocationCounter++;
            }
        };

        var processor = getProcessor(STATIC_RETRY_STRATEGY, Map.of(
                TestMessage.getDescriptor(), firstInvocationFailsHandler));
        processor.runProcessing();

        var recoveredRecordA = txManager.inTransaction(() -> storage.findById(recordA.getId()));
        var recoveredRecordB = txManager.inTransaction(() -> storage.findById(recordB.getId()));

        assertTrue(recoveredRecordA.isPresent());
        assertEquals(InboxRecordLifecycleState.WAITING_FOR_RETRY, recoveredRecordA.get().getLifecycle().state());
        assertEquals(recordA.getLifecycle().processingError().failureCount() + 1,
                recoveredRecordA.get().getLifecycle().processingError().failureCount());

        assertTrue(recoveredRecordB.isPresent());
        assertEquals(InboxRecordLifecycleState.COMPLETED, recoveredRecordB.get().getLifecycle().state());
        assertEquals(recordB.getLifecycle().processingError().failureCount(),
                recoveredRecordB.get().getLifecycle().processingError().failureCount());
    }

    @Test
    public void shouldSucceed_AllRecordsInAllPartitionsGetProcessedAndSetToCompleted() {
        var sharedPartitionKey = new InboxRecordPartitionKey("shared-key");
        var recordA = InboxRecord.newlyRegistered(
                new InboxRecordId("rec-A"),
                sharedPartitionKey,
                TestMessage.newBuilder()
                        .setFoo("test-message")
                        .build());
        var recordB = InboxRecord.newlyRegistered(
                new InboxRecordId("rec-B"),
                sharedPartitionKey,
                TestMessage.newBuilder()
                        .setFoo("other-test-message")
                        .build());
        var recordC = InboxRecord.newlyRegistered(
                new InboxRecordId("rec-C"),
                new InboxRecordPartitionKey("other-key"),
                TestMessage.newBuilder()
                        .setFoo("yet-another-test-message")
                        .build());

        txManager.inTransaction(() -> {
            storage.store(recordA);
            storage.store(recordB);
            storage.store(recordC);
        });

        var noOpHandler = new InboxRecordHandler() {
            @Override
            public void accept(InboxRecord record) {
            }
        };

        var maxProcessableItems = 3;
        var processor = getProcessor(STATIC_RETRY_STRATEGY,
                Map.of(TestMessage.getDescriptor(), noOpHandler),
                maxProcessableItems);
        processor.runProcessing();

        var successfullyProcessedRecords = txManager.inTransaction(() -> storage.findCompletedRecordIds(
                Duration.ofMillis(0), 3));

        assertEquals(3, successfullyProcessedRecords.size());
        assertEquals(recordA.getId(), successfullyProcessedRecords.get(0));
        assertEquals(recordB.getId(), successfullyProcessedRecords.get(1));
        assertEquals(recordC.getId(), successfullyProcessedRecords.get(2));
    }
}
