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
import java.time.temporal.ChronoUnit;

import static org.junit.jupiter.api.Assertions.*;

class InboxRecordStalenessResolverIT {

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

    public InboxRecordStalenessResolver createStalenessResolver(final Duration stalenessThreshold,
                                                                final int maxItemsPerRun) {
        return new InboxRecordStalenessResolver(
                storage,
                txManager,
                stalenessThreshold,
                maxItemsPerRun);
    }

    @Test
    public void shouldSucceed_NoStaleRecordsFound() {
        var resolver = createStalenessResolver(Duration.ofMinutes(5), 10);
        assertDoesNotThrow(resolver::resolve);
    }

    @Test
    public void shouldSucceed_FindsAndResolvesStaleRecordsUpToBatchSize() {
        var recordA = InboxRecord.restore(
                new InboxRecordId("rec-A"),
                new InboxRecordPartitionKey("part-A"),
                TestMessage.newBuilder()
                        .setFoo("bar")
                        .build(),
                new InboxRecordLifecycle(
                        InboxRecordLifecycleState.PROCESSING,
                        Instant.now().minusSeconds(10000),
                        null,
                        // in 'PROCESSING' state since 900 seconds (stale)
                        Instant.now().minusSeconds(900),
                        new InboxRecordProcessingFailure(
                                0,
                                null)));
        var recordB = InboxRecord.restore(
                new InboxRecordId("rec-B"),
                new InboxRecordPartitionKey("part-B"),
                TestMessage.newBuilder()
                        .setFoo("bar")
                        .build(),
                new InboxRecordLifecycle(
                        InboxRecordLifecycleState.PROCESSING,
                        Instant.now().minusSeconds(11000),
                        null,
                        // in 'PROCESSING' state since 700 seconds (stale)
                        Instant.now().minusSeconds(700),
                        new InboxRecordProcessingFailure(
                                0,
                                null)));
        var recordC = InboxRecord.restore(
                new InboxRecordId("rec-C"),
                new InboxRecordPartitionKey("part-C"),
                TestMessage.newBuilder()
                        .setFoo("bar")
                        .build(),
                new InboxRecordLifecycle(
                        InboxRecordLifecycleState.PROCESSING,
                        Instant.now().minusSeconds(10),
                        null,
                        // not stale - just entered processing state
                        Instant.now(),
                        new InboxRecordProcessingFailure(
                                0,
                                null)));

        txManager.inTransaction(() -> {
            storage.store(recordA);
            storage.store(recordB);
            storage.store(recordC);
        });

        var maxResolvedItemsPerRun = 1;
        var stalenessResolver = createStalenessResolver(Duration.ofSeconds(500), maxResolvedItemsPerRun);

        // First run
        stalenessResolver.resolve();

        var recoveredRecordA = storage.findById(recordA.getId());

        assertTrue(recoveredRecordA.isPresent());
        assertEquals(InboxRecordLifecycleState.PENDING, recoveredRecordA.get().getLifecycle().state());

        var recoveredRecordB = storage.findById(recordB.getId());
        assertTrue(recoveredRecordB.isPresent());
        assertEquals(recordB.getLifecycle().state(), recoveredRecordB.get().getLifecycle().state());

        // Seconds run
        stalenessResolver.resolve();

        recoveredRecordB = storage.findById(recordB.getId());
        assertTrue(recoveredRecordB.isPresent());
        assertEquals(InboxRecordLifecycleState.PENDING, recoveredRecordB.get().getLifecycle().state());

        var recoveredRecordC = storage.findById(recordC.getId());
        assertTrue(recoveredRecordC.isPresent());
        // Truncating for the comparison since the database is only storing up to millis. Thus, restored values are
        // missing some information (precision).
        assertNotNull(recordC.getLifecycle().updatedAt());
        assertNotNull(recoveredRecordC.get().getLifecycle().updatedAt());
        assertEquals(recordC.getLifecycle().updatedAt().truncatedTo(ChronoUnit.MILLIS),
                recoveredRecordC.get().getLifecycle().updatedAt().truncatedTo(ChronoUnit.MILLIS));
    }
}
