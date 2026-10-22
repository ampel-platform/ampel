package eu.ampel_platform.messaging_sdk.inbox;

import eu.ampel_platform.messaging_sdk.inbox.generated.TestMessage;
import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordId;
import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordLifecycleState;
import eu.ampel_platform.messaging_sdk.inbox.persistence.ProtoBufByteSerializer;
import eu.ampel_platform.messaging_sdk.inbox.persistence.TransactionManager;
import eu.ampel_platform.messaging_sdk.inbox.persistence.db.JdbiPostgresInboxRecordRepository;
import eu.ampel_platform.messaging_sdk.inbox.persistence.db.JdbiTransactionManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;

class InboxIT {

    private PostgresTestEnvironment dbEnv;
    private JdbiPostgresInboxRecordRepository storage;
    private TransactionManager txManager;
    private Inbox inbox;

    @BeforeEach
    public void setUp() {
        dbEnv = PostgresTestEnvironment.createDefault();
        dbEnv.startEnvironment();

        var jdbi = dbEnv.getJdbiInstance();
        storage = new JdbiPostgresInboxRecordRepository(jdbi, new ProtoBufByteSerializer());
        txManager = new JdbiTransactionManager(jdbi);

        inbox = new Inbox(storage, txManager);
    }

    @AfterEach
    public void tearDown() {
        dbEnv.stopEnvironment();
    }

    @Test
    public void shouldSucceed_StoredInboxRecordIsPending() {
        var id = "some-ID";
        var partitionKey = "part-random";
        var testPayload = TestMessage.newBuilder()
                .setFoo("bar")
                .build();

        inbox.store(id, partitionKey, testPayload);

        var inboxRecord = txManager.inTransaction(() -> storage.findById(new InboxRecordId(id)));

        assertTrue(inboxRecord.isPresent());
        var recoveredInboxRecord = inboxRecord.get();

        assertEquals(id, recoveredInboxRecord.getId().id());
        assertEquals(partitionKey, recoveredInboxRecord.getPartitionKey().key());
        assertEquals(testPayload, recoveredInboxRecord.getPayload());
        assertEquals(InboxRecordLifecycleState.PENDING, recoveredInboxRecord.getLifecycle().state());
        assertTrue(recoveredInboxRecord.getLifecycle().createdAt().isBefore(Instant.now()));
        assertNull(recoveredInboxRecord.getLifecycle().processedAt());
        assertNull(recoveredInboxRecord.getLifecycle().updatedAt());
        assertNotNull(recoveredInboxRecord.getLifecycle().processingError());
        assertEquals(0, recoveredInboxRecord.getLifecycle().processingError().failureCount());
    }
}
