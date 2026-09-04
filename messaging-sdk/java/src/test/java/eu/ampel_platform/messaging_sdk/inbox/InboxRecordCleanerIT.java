package eu.ampel_platform.messaging_sdk.inbox;

import eu.ampel_platform.messaging_sdk.inbox.generated.TestMessage;
import eu.ampel_platform.messaging_sdk.inbox.model.*;
import eu.ampel_platform.messaging_sdk.inbox.persistence.ProtoBufByteSerializer;
import eu.ampel_platform.messaging_sdk.inbox.persistence.TransactionManager;
import eu.ampel_platform.messaging_sdk.inbox.persistence.db.JdbiPostgresInboxRecordRepository;
import eu.ampel_platform.messaging_sdk.inbox.persistence.db.JdbiTransactionManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class InboxRecordCleanerIT {

    private static final int MAX_CLEANUPS_PER_RUN = 2;

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

    public InboxRecordCleaner createInboxRecordCleaner(final Duration ageThreshold,
                                                       final int maxItemsPerRun) {
        return new InboxRecordCleaner(
                storage,
                txManager,
                ageThreshold,
                maxItemsPerRun);
    }

    @Test
    public void shouldSucceed_CleaningUpWithoutAnyRecords() {
        var inboxRecordCleaner = createInboxRecordCleaner(Duration.ofHours(10), 1000);
        assertDoesNotThrow(inboxRecordCleaner::runCleanup);
    }

    @Test
    public void shouldSucceed_CleaningUpOnlyCompletedRecords() {
        var recordA = InboxRecord.restore(
                new InboxRecordId("rec-A"),
                new InboxRecordPartitionKey("part-A"),
                TestMessage.newBuilder()
                        .setFoo("test")
                        .build(),
                new InboxRecordLifecycle(
                        InboxRecordLifecycleState.COMPLETED,
                        Instant.now().minusSeconds(1000),
                        Instant.now().minusSeconds(100),
                        Instant.now().minusSeconds(100),
                        new InboxRecordProcessingFailure(
                                0,
                                null)));
        var recordB = InboxRecord.restore(
                new InboxRecordId("rec-B"),
                new InboxRecordPartitionKey("part-B"),
                TestMessage.newBuilder()
                        .setFoo("other-test")
                        .build(),
                new InboxRecordLifecycle(
                        InboxRecordLifecycleState.PENDING,
                        Instant.now().minusSeconds(900),
                        null,
                        null,
                        new InboxRecordProcessingFailure(
                                0,
                                null)));

        txManager.inTransaction(() -> {
            storage.store(recordA);
            storage.store(recordB);
        });

        var inboxRecordCleaner = createInboxRecordCleaner(Duration.ofMillis(0), 1000);
        inboxRecordCleaner.runCleanup();

        var recoveredRecordA = txManager.inTransaction(() -> storage.findById(recordA.getId()));
        var recoveredRecordB = txManager.inTransaction(() -> storage.findById(recordB.getId()));

        assertTrue(recoveredRecordA.isEmpty());
        assertTrue(recoveredRecordB.isPresent());
    }

    @Test
    public void shouldSucceed_CleaningUpRecordsUpToConfiguredBatchSize() {
        var records = new ArrayList<InboxRecord>();
        for (int i = 0; i <= MAX_CLEANUPS_PER_RUN; i++) {
            // The last entry is the oldest one!
            records.add(
                    InboxRecord.restore(
                            new InboxRecordId("rec-" + i),
                            new InboxRecordPartitionKey("part-" + i),
                            TestMessage.newBuilder()
                                    .setFoo("test")
                                    .build(),
                            new InboxRecordLifecycle(
                                    InboxRecordLifecycleState.COMPLETED,
                                    // Does not really matter that it's 5 times the amount of the other parameters.
                                    // The important part is that it needs to be older than the other parameters in
                                    // order to make sense. So every factor other than 1 is sufficient.
                                    Instant.now().minusSeconds(5 * (long) Math.pow(10, i)),
                                    Instant.now().minusSeconds((long) Math.pow(10, i)),
                                    Instant.now().minusSeconds((long) Math.pow(10, i)),
                                    new InboxRecordProcessingFailure(
                                            0,
                                            null))));
        }

        txManager.inTransaction(() -> {
            for (var record : records) {
                storage.store(record);
            }
        });

        var inboxRecordCleaner = createInboxRecordCleaner(Duration.ofMillis(0), MAX_CLEANUPS_PER_RUN);
        inboxRecordCleaner.runCleanup();

        var recordIdsNotYetCleanedUp = txManager.inTransaction(() -> storage.findCompletedRecordIds(
                Duration.ofMillis(0), records.size()));

        assertEquals(records.size() - MAX_CLEANUPS_PER_RUN, recordIdsNotYetCleanedUp.size());
        assertEquals(records.getFirst().getId(), recordIdsNotYetCleanedUp.getFirst());
    }

    @Test
    public void shouldSucceed_OnlyCompletedRecordsOlderThanThresholdAreTakenIntoAccount() {
        var recordA = InboxRecord.restore(
                new InboxRecordId("rec-A"),
                new InboxRecordPartitionKey("part-A"),
                TestMessage.newBuilder()
                        .setFoo("test")
                        .build(),
                new InboxRecordLifecycle(
                        InboxRecordLifecycleState.COMPLETED,
                        Instant.now().minusSeconds(10),
                        Instant.now().minusSeconds(1),
                        Instant.now().minusSeconds(1),
                        new InboxRecordProcessingFailure(
                                0,
                                null)));
        var recordB = InboxRecord.restore(
                new InboxRecordId("rec-B"),
                new InboxRecordPartitionKey("part-B"),
                TestMessage.newBuilder()
                        .setFoo("other-test")
                        .build(),
                new InboxRecordLifecycle(
                        InboxRecordLifecycleState.COMPLETED,
                        Instant.now().minusSeconds(1000000),
                        Instant.now().minusSeconds(100000),
                        Instant.now().minusSeconds(100000),
                        new InboxRecordProcessingFailure(
                                0,
                                null)));

        txManager.inTransaction(() -> {
            storage.store(recordA);
            storage.store(recordB);
        });

        var minAgeThreshold = Duration.ofSeconds(5000);
        var inboxRecordCleaner = createInboxRecordCleaner(minAgeThreshold, MAX_CLEANUPS_PER_RUN);
        inboxRecordCleaner.runCleanup();

        var recoveredRecordA = txManager.inTransaction(() -> storage.findById(recordA.getId()));
        var recoveredRecordB = txManager.inTransaction(() -> storage.findById(recordB.getId()));

        assertTrue(recoveredRecordA.isPresent());
        assertTrue(recoveredRecordB.isEmpty());
    }
}
