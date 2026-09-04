package eu.ampel_platform.messaging_sdk.inbox.persistence.db;

import eu.ampel_platform.messaging_sdk.inbox.PostgresTestEnvironment;
import eu.ampel_platform.messaging_sdk.inbox.generated.TestMessage;
import eu.ampel_platform.messaging_sdk.inbox.model.*;
import eu.ampel_platform.messaging_sdk.inbox.persistence.ProtoBufByteSerializer;
import eu.ampel_platform.messaging_sdk.inbox.persistence.TransactionManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

final class JdbiPostgresInboxRecordRepositoryIT {

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

    @Nested
    class Storing {
        @Test
        public void shouldSucceed_StoringNewlyRegisteredInboxRecords() {
            var inboxRecordId = new InboxRecordId("id-123");
            var record = InboxRecord.newlyRegistered(
                    inboxRecordId,
                    new InboxRecordPartitionKey("part-A"),
                    TestMessage.newBuilder()
                            .setFoo("test-message")
                            .build());

            var recoveredInboxRecord = txManager.inTransaction(() -> {
                storage.store(record);
                return storage.findById(inboxRecordId);
            });
            if (recoveredInboxRecord.isEmpty()) {
                fail("expecting to be able to read back stored inbox record");
            }

            var ir = recoveredInboxRecord.get();
            assertEquals(inboxRecordId, ir.getId());
            assertEquals(record.getPartitionKey(), ir.getPartitionKey());
            assertEquals(record.getPayload(), ir.getPayload());

            assertEquals(record.getLifecycle().state(), ir.getLifecycle().state());
            assertTrue(isEqualUpToMillis(record.getLifecycle().createdAt(), ir.getLifecycle().createdAt()));
            assertTrue(isEqualUpToMillis(record.getLifecycle().processedAt(), ir.getLifecycle().processedAt()));
            assertEquals(record.getLifecycle().processingError().failureCount(), ir.getLifecycle().processingError().failureCount());
            assertTrue(isEqualUpToMillis(record.getLifecycle().processingError().nextRetryAt(), ir.getLifecycle().processingError().nextRetryAt()));
        }

        @Test
        public void shouldSucceed_StoringInboxRecordWithSameIdDoesNotAlterExistingDatabaseEntry() {
            // This is a test dedicated to the de-duplication feature of the inbox.
            // De-duplication is done on the database level.
            var inboxRecordId = new InboxRecordId("id-123");
            var recordA = InboxRecord.newlyRegistered(
                            inboxRecordId,
                            new InboxRecordPartitionKey("part-A"),
                            TestMessage.newBuilder()
                                    .setFoo("test-message")
                                    .build())
                    .markAsCurrentlyBeingProcessed();
            var recordB = InboxRecord.newlyRegistered(
                    inboxRecordId,
                    new InboxRecordPartitionKey("part-B"),
                    TestMessage.newBuilder()
                            .setFoo("other-test-message")
                            .build());

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
            });

            var recoveredInboxRecord = txManager.inTransaction(() -> storage.findById(inboxRecordId));
            if (recoveredInboxRecord.isEmpty()) {
                fail("expecting to be able to read back stored inbox record");
            }

            var ir = recoveredInboxRecord.get();
            assertEquals(inboxRecordId, ir.getId());
            assertEquals(recordA.getPartitionKey(), ir.getPartitionKey());
            assertEquals(recordA.getPayload(), ir.getPayload());
            assertEquals(recordA.getLifecycle().state(), ir.getLifecycle().state());
            assertTrue(isEqualUpToMillis(recordA.getLifecycle().createdAt(), ir.getLifecycle().createdAt()));
            assertTrue(isEqualUpToMillis(recordA.getLifecycle().processedAt(), ir.getLifecycle().processedAt()));
            assertEquals(recordA.getLifecycle().processingError().failureCount(), ir.getLifecycle().processingError().failureCount());
            assertTrue(isEqualUpToMillis(recordA.getLifecycle().processingError().nextRetryAt(), ir.getLifecycle().processingError().nextRetryAt()));
        }
    }

    @Nested
    class Updating {

        @Test
        public void shouldSucceed_TryUpdatingNonExistingInboxRecordDoesNotStoreAnything() {
            var record = InboxRecord.newlyRegistered(
                    new InboxRecordId("id-123"),
                    new InboxRecordPartitionKey("part-A"),
                    TestMessage.newBuilder()
                            .setFoo("test-message")
                            .build());

            txManager.inTransaction(() -> storage.update(record));

            var recoveredRecord = txManager.inTransaction(() -> storage.findById(record.getId()));
            assertTrue(recoveredRecord.isEmpty());
        }

        @Test
        public void shouldSucceed_TryUpdatingAlreadyExistingRecordOverwritesValues() {
            var record = InboxRecord.newlyRegistered(
                    new InboxRecordId("id-123"),
                    new InboxRecordPartitionKey("part-A"),
                    TestMessage.newBuilder()
                            .setFoo("test-message")
                            .build());

            txManager.inTransaction(() -> storage.store(record));

            var processedRecord = txManager.inTransaction(() -> {
                var updated = record.markAsCurrentlyBeingProcessed();
                storage.update(updated);
                return updated;
            });

            var completedRecord = txManager.inTransaction(() -> {
                var updated = processedRecord.markAsSuccessfullyCompleted();
                storage.update(updated);
                return updated;
            });

            var recoveredRecord = txManager.inTransaction(() -> storage.findById(record.getId()));
            if (recoveredRecord.isEmpty()) {
                fail("expecting that an inbox record exists");
            }

            var r = recoveredRecord.get();
            assertEquals(completedRecord.getId(), r.getId());
            assertEquals(completedRecord.getPartitionKey(), r.getPartitionKey());
            assertEquals(completedRecord.getPayload(), r.getPayload());
            assertEquals(completedRecord.getLifecycle().state(), r.getLifecycle().state());
            assertTrue(isEqualUpToMillis(completedRecord.getLifecycle().createdAt(), r.getLifecycle().createdAt()));
            assertTrue(isEqualUpToMillis(completedRecord.getLifecycle().processedAt(), r.getLifecycle().processedAt()));
            assertEquals(completedRecord.getLifecycle().processingError().failureCount(), r.getLifecycle().processingError().failureCount());
            assertTrue(isEqualUpToMillis(completedRecord.getLifecycle().processingError().nextRetryAt(), r.getLifecycle().processingError().nextRetryAt()));
        }
    }

    @Nested
    class Deleting {

        @Test
        public void shouldSucceed_TryDeletingNonExistingRecordById() {
            txManager.inTransaction(() -> storage.deleteById(List.of(new InboxRecordId("does-not-exist"))));
        }

        @Test
        public void shouldSucceed_DeletingExistingRecordsById() {
            var recordA = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-A"),
                            new InboxRecordPartitionKey("part-A"),
                            TestMessage.newBuilder()
                                    .setFoo("test-message")
                                    .build())
                    .markAsCurrentlyBeingProcessed();
            var recordB = InboxRecord.newlyRegistered(
                    new InboxRecordId("rec-B"),
                    new InboxRecordPartitionKey("part-B"),
                    TestMessage.newBuilder()
                            .setFoo("other-test-message")
                            .build());
            var recordC = InboxRecord.newlyRegistered(
                    new InboxRecordId("rec-C"),
                    new InboxRecordPartitionKey("part-C"),
                    TestMessage.newBuilder()
                            .setFoo("yet-another-test-message")
                            .build());

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
                storage.store(recordC);
            });

            txManager.inTransaction(() -> storage.deleteById(List.of(recordA.getId(), recordC.getId())));

            var recoveredRecordA = txManager.inTransaction(() -> storage.findById(recordA.getId()));
            var recoveredRecordB = txManager.inTransaction(() -> storage.findById(recordB.getId()));
            var recoveredRecordC = txManager.inTransaction(() -> storage.findById(recordC.getId()));

            assertTrue(recoveredRecordA.isEmpty());
            assertTrue(recoveredRecordB.isPresent());
            assertTrue(recoveredRecordC.isEmpty());
        }
    }

    @Nested
    class FindCompleted {

        @Test
        public void shouldSucceed_TryFindingCompletedRecordsIfNoneExist() {
            var pendingRecords = txManager.inTransaction(() -> storage.findCompletedRecordIds(Duration.ofMillis(0), 10));

            assertTrue(pendingRecords.isEmpty());
        }

        @Test
        public void shouldSucceed_TryFindingOnlyCompletedRecordsEvenIfOthersExist() {
            var recordA = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-A"),
                            new InboxRecordPartitionKey("part-A"),
                            TestMessage.newBuilder()
                                    .setFoo("test-message")
                                    .build())
                    .markAsCurrentlyBeingProcessed();
            var recordB = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-B"),
                            new InboxRecordPartitionKey("part-B"),
                            TestMessage.newBuilder()
                                    .setFoo("other-test-message")
                                    .build())
                    .markAsCurrentlyBeingProcessed()
                    .markAsFailed();
            // the only one that is completed
            var recordC = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-C"),
                            new InboxRecordPartitionKey("part-C"),
                            TestMessage.newBuilder()
                                    .setFoo("yet-another-test-message")
                                    .build())
                    .markAsCurrentlyBeingProcessed()
                    .markAsSuccessfullyCompleted();

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
                storage.store(recordC);
            });

            var foundCompletedRecords = txManager.inTransaction(() -> storage.findCompletedRecordIds(
                    Duration.ofMillis(0), 10));

            assertEquals(1, foundCompletedRecords.size());
            assertEquals(recordC.getId(), foundCompletedRecords.getFirst());
        }

        @Test
        public void shouldSucceed_TryFindingCompletedRecordsIfThereAreMoreThanBatchSizeSortsByProcessedAtInstant() {
            // latest completed
            var recordA = InboxRecord.restore(
                    new InboxRecordId("rec-A"),
                    new InboxRecordPartitionKey("part-A"),
                    TestMessage.newBuilder()
                            .setFoo("test-message")
                            .build(),
                    new InboxRecordLifecycle(
                            InboxRecordLifecycleState.COMPLETED,
                            Instant.now().minusSeconds(10000),
                            Instant.now().minusSeconds(100),
                            Instant.now().minusSeconds(100),
                            new InboxRecordProcessingFailure(
                                    0,
                                    null)));
            // second-oldest completed
            var recordB = InboxRecord.restore(
                    new InboxRecordId("rec-B"),
                    new InboxRecordPartitionKey("part-B"),
                    TestMessage.newBuilder()
                            .setFoo("other-test-message")
                            .build(),
                    new InboxRecordLifecycle(
                            InboxRecordLifecycleState.COMPLETED,
                            Instant.now().minusSeconds(10000),
                            Instant.now().minusSeconds(150),
                            Instant.now().minusSeconds(150),
                            new InboxRecordProcessingFailure(
                                    0,
                                    null)));
            // oldest completed
            var recordC = InboxRecord.restore(
                    new InboxRecordId("rec-C"),
                    new InboxRecordPartitionKey("part-C"),
                    TestMessage.newBuilder()
                            .setFoo("yet-another-test-message")
                            .build(),
                    new InboxRecordLifecycle(
                            InboxRecordLifecycleState.COMPLETED,
                            Instant.now().minusSeconds(10000),
                            Instant.now().minusSeconds(200),
                            Instant.now().minusSeconds(200),
                            new InboxRecordProcessingFailure(
                                    0,
                                    null)));

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
                storage.store(recordC);
            });

            var foundCompletedRecords = txManager.inTransaction(() -> storage.findCompletedRecordIds(
                    Duration.ofMillis(0), 2));

            assertEquals(2, foundCompletedRecords.size());
            assertEquals(recordC.getId(), foundCompletedRecords.getFirst());
            assertEquals(recordB.getId(), foundCompletedRecords.getLast());
        }

        @Test
        public void shouldSucceed_TryFindingCompletedRecordsThatDoNotExceedAgeThresholdYet() {
            // latest completed
            var recordA = InboxRecord.restore(
                    new InboxRecordId("rec-A"),
                    new InboxRecordPartitionKey("part-A"),
                    TestMessage.newBuilder()
                            .setFoo("test-message")
                            .build(),
                    new InboxRecordLifecycle(
                            InboxRecordLifecycleState.COMPLETED,
                            Instant.now().minusSeconds(10000),
                            Instant.now().minusSeconds(100),
                            Instant.now(), // updated at
                            new InboxRecordProcessingFailure(
                                    0,
                                    null)));
            var recordB = InboxRecord.restore(
                    new InboxRecordId("rec-B"),
                    new InboxRecordPartitionKey("part-B"),
                    TestMessage.newBuilder()
                            .setFoo("test-message")
                            .build(),
                    new InboxRecordLifecycle(
                            InboxRecordLifecycleState.COMPLETED,
                            Instant.now().minusSeconds(10000),
                            Instant.now().minusSeconds(100),
                            Instant.now().minus(3, ChronoUnit.HOURS), // updated at
                            new InboxRecordProcessingFailure(
                                    0,
                                    null)));

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
            });

            var foundCompletedRecords = txManager.inTransaction(() -> storage.findCompletedRecordIds(
                    Duration.ofHours(2), 2));

            assertEquals(1, foundCompletedRecords.size());
            assertEquals(recordB.getId(), foundCompletedRecords.getFirst());
        }
    }

    @Nested
    class ClaimPending {

        @Test
        public void shouldSucceed_MultiplePendingRecordsFromPartitionGetClaimed() {
            var partitionKey = new InboxRecordPartitionKey("part-A");
            var recordA = InboxRecord.newlyRegistered(
                    new InboxRecordId("rec-A"),
                    partitionKey,
                    TestMessage.newBuilder()
                            .setFoo("test-message")
                            .build());

            var recordB = InboxRecord.newlyRegistered(
                    new InboxRecordId("rec-B"),
                    partitionKey,
                    TestMessage.newBuilder()
                            .setFoo("other-test-message")
                            .build());

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
            });

            var claimedPendingRecords = txManager.inTransaction(() -> storage.claimPendingRecords(10));

            assertFalse(claimedPendingRecords.isEmpty());
            assertEquals(2, claimedPendingRecords.size());


            assertEquals(recordA.getId(), claimedPendingRecords.getFirst().getId());
            assertEquals(recordA.getPartitionKey(), claimedPendingRecords.getFirst().getPartitionKey());
            assertEquals(recordA.getPayload(), claimedPendingRecords.getFirst().getPayload());
            assertEquals(InboxRecordLifecycleState.PROCESSING, claimedPendingRecords.getFirst().getLifecycle().state());
            assertTrue(isEqualUpToMillis(recordA.getLifecycle().createdAt(), claimedPendingRecords.getFirst().getLifecycle().createdAt()));
            assertTrue(isEqualUpToMillis(recordA.getLifecycle().processedAt(), claimedPendingRecords.getFirst().getLifecycle().processedAt()));
            assertEquals(recordA.getLifecycle().processingError().failureCount(), claimedPendingRecords.getFirst().getLifecycle().processingError().failureCount());
            assertTrue(isEqualUpToMillis(recordA.getLifecycle().processingError().nextRetryAt(), claimedPendingRecords.getFirst().getLifecycle().processingError().nextRetryAt()));
            assertFalse(isEqualUpToMillis(recordA.getLifecycle().updatedAt(), claimedPendingRecords.getFirst().getLifecycle().updatedAt()));

            assertEquals(recordB.getId(), claimedPendingRecords.getLast().getId());
            assertEquals(recordB.getPartitionKey(), claimedPendingRecords.getLast().getPartitionKey());
            assertEquals(recordB.getPayload(), claimedPendingRecords.getLast().getPayload());
            assertEquals(InboxRecordLifecycleState.PROCESSING, claimedPendingRecords.getLast().getLifecycle().state());
            assertTrue(isEqualUpToMillis(recordB.getLifecycle().createdAt(), claimedPendingRecords.getLast().getLifecycle().createdAt()));
            assertTrue(isEqualUpToMillis(recordB.getLifecycle().processedAt(), claimedPendingRecords.getLast().getLifecycle().processedAt()));
            assertEquals(recordB.getLifecycle().processingError().failureCount(), claimedPendingRecords.getLast().getLifecycle().processingError().failureCount());
            assertTrue(isEqualUpToMillis(recordB.getLifecycle().processingError().nextRetryAt(), claimedPendingRecords.getLast().getLifecycle().processingError().nextRetryAt()));
            assertFalse(isEqualUpToMillis(recordB.getLifecycle().updatedAt(), claimedPendingRecords.getLast().getLifecycle().updatedAt()));
        }

        @Test
        public void shouldSucceed_ClaimPendingRecordsUpToBatchSize() {
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
            var recordC = InboxRecord.newlyRegistered(
                    new InboxRecordId("rec-C"),
                    new InboxRecordPartitionKey("part-C"),
                    TestMessage.newBuilder()
                            .setFoo("yet-another-test-message")
                            .build());

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
                storage.store(recordC);
            });

            var claimedPendingRecords = txManager.inTransaction(() -> storage.claimPendingRecords(2));

            assertEquals(2, claimedPendingRecords.size());
            assertEquals(recordA.getId(), claimedPendingRecords.getFirst().getId());
            assertEquals(recordB.getId(), claimedPendingRecords.getLast().getId());
        }

        @Test
        public void shouldSucceed_ClaimPendingRecordsAgainDoesNotYieldRecordsBeingProcessed() {
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

            var claimedRecordsBatchA = txManager.inTransaction(() -> storage.claimPendingRecords(1));
            var claimedRecordsBatchB = txManager.inTransaction(() -> storage.claimPendingRecords(1));

            assertFalse(claimedRecordsBatchA.isEmpty());
            assertFalse(claimedRecordsBatchB.isEmpty());
            assertEquals(recordA.getId(), claimedRecordsBatchA.getFirst().getId());
            assertEquals(recordB.getId(), claimedRecordsBatchB.getFirst().getId());
        }

        @Test
        public void shouldSucceed_RecordWithRegisteredRetryPreventsOtherRecordsInPartitionFromBeingClaimedIfRetryDelayHasNotElapsed() {
            var partitionKey = new InboxRecordPartitionKey("part-A");
            var recordA = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-A"),
                            partitionKey,
                            TestMessage.newBuilder()
                                    .setFoo("test-message")
                                    .build())
                    .markAsCurrentlyBeingProcessed()
                    .markForRetryAfterError(Instant.now().plusSeconds(10000));
            var recordB = InboxRecord.newlyRegistered(
                    new InboxRecordId("rec-B"),
                    partitionKey,
                    TestMessage.newBuilder()
                            .setFoo("other-test-message")
                            .build());

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
            });

            var claimedRecords = txManager.inTransaction(() -> storage.claimPendingRecords(10));

            var recoveredRecordA = txManager.inTransaction(() -> storage.findById(recordA.getId()));
            var recoveredRecordB = txManager.inTransaction(() -> storage.findById(recordB.getId()));

            assertTrue(claimedRecords.isEmpty());

            assertTrue(recoveredRecordA.isPresent());
            assertEquals(recordA.getId(), recoveredRecordA.get().getId());
            assertEquals(recordA.getPartitionKey(), recoveredRecordA.get().getPartitionKey());
            assertEquals(recordA.getPayload(), recoveredRecordA.get().getPayload());
            assertEquals(recordA.getLifecycle().state(), recoveredRecordA.get().getLifecycle().state());
            assertEquals(InboxRecordLifecycleState.WAITING_FOR_RETRY, recoveredRecordA.get().getLifecycle().state());
            assertTrue(isEqualUpToMillis(recordA.getLifecycle().createdAt(), recoveredRecordA.get().getLifecycle().createdAt()));
            assertTrue(isEqualUpToMillis(recordA.getLifecycle().processedAt(), recoveredRecordA.get().getLifecycle().processedAt()));
            assertEquals(recordA.getLifecycle().processingError().failureCount(), recoveredRecordA.get().getLifecycle().processingError().failureCount());
            assertTrue(isEqualUpToMillis(recordA.getLifecycle().processingError().nextRetryAt(), recoveredRecordA.get().getLifecycle().processingError().nextRetryAt()));
            assertTrue(isEqualUpToMillis(recordA.getLifecycle().updatedAt(), recoveredRecordA.get().getLifecycle().updatedAt()));

            assertTrue(recoveredRecordB.isPresent());
            assertEquals(recordB.getId(), recoveredRecordB.get().getId());
            assertEquals(recordB.getPartitionKey(), recoveredRecordB.get().getPartitionKey());
            assertEquals(recordB.getPayload(), recoveredRecordB.get().getPayload());
            assertEquals(recordB.getLifecycle().state(), recoveredRecordB.get().getLifecycle().state());
            assertTrue(isEqualUpToMillis(recordB.getLifecycle().createdAt(), recoveredRecordB.get().getLifecycle().createdAt()));
            assertTrue(isEqualUpToMillis(recordB.getLifecycle().processedAt(), recoveredRecordB.get().getLifecycle().processedAt()));
            assertEquals(recordB.getLifecycle().processingError().failureCount(), recoveredRecordB.get().getLifecycle().processingError().failureCount());
            assertTrue(isEqualUpToMillis(recordB.getLifecycle().processingError().nextRetryAt(), recoveredRecordB.get().getLifecycle().processingError().nextRetryAt()));
            assertTrue(isEqualUpToMillis(recordB.getLifecycle().updatedAt(), recoveredRecordB.get().getLifecycle().updatedAt()));
        }

        @Test
        public void shouldSucceed_RecordWithRegisteredRetryDoesNotBlockClaimingInPartitionIfRetryDelayHasAlreadyElapsed() {
            var partitionKey = new InboxRecordPartitionKey("part-A");
            var recordA = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-A"),
                            partitionKey,
                            TestMessage.newBuilder()
                                    .setFoo("test-message")
                                    .build())
                    .markAsCurrentlyBeingProcessed()
                    // Instant retry
                    .markForRetryAfterError(Instant.now());
            var recordB = InboxRecord.newlyRegistered(
                    new InboxRecordId("rec-B"),
                    partitionKey,
                    TestMessage.newBuilder()
                            .setFoo("other-test-message")
                            .build());

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
            });

            var claimedRecords = txManager.inTransaction(() -> storage.claimPendingRecords(10));

            assertEquals(2, claimedRecords.size());
            assertEquals(recordA.getId(), claimedRecords.getFirst().getId());
            assertEquals(recordA.getPartitionKey(), claimedRecords.getFirst().getPartitionKey());
            assertEquals(recordA.getPayload(), claimedRecords.getFirst().getPayload());
            assertEquals(InboxRecordLifecycleState.PROCESSING, claimedRecords.getFirst().getLifecycle().state());
            assertTrue(isEqualUpToMillis(recordA.getLifecycle().createdAt(), claimedRecords.getFirst().getLifecycle().createdAt()));
            assertTrue(isEqualUpToMillis(recordA.getLifecycle().processedAt(), claimedRecords.getFirst().getLifecycle().processedAt()));
            assertEquals(recordA.getLifecycle().processingError().failureCount(), claimedRecords.getFirst().getLifecycle().processingError().failureCount());
            assertTrue(isEqualUpToMillis(recordA.getLifecycle().processingError().nextRetryAt(), claimedRecords.getFirst().getLifecycle().processingError().nextRetryAt()));
            assertFalse(isEqualUpToMillis(recordA.getLifecycle().updatedAt(), claimedRecords.getFirst().getLifecycle().updatedAt()));

            assertEquals(recordB.getId(), claimedRecords.getLast().getId());
            assertEquals(recordB.getPartitionKey(), claimedRecords.getLast().getPartitionKey());
            assertEquals(recordB.getPayload(), claimedRecords.getLast().getPayload());
            assertEquals(InboxRecordLifecycleState.PROCESSING, claimedRecords.getLast().getLifecycle().state());
            assertTrue(isEqualUpToMillis(recordB.getLifecycle().createdAt(), claimedRecords.getLast().getLifecycle().createdAt()));
            assertTrue(isEqualUpToMillis(recordB.getLifecycle().processedAt(), claimedRecords.getLast().getLifecycle().processedAt()));
            assertEquals(recordB.getLifecycle().processingError().failureCount(), claimedRecords.getLast().getLifecycle().processingError().failureCount());
            assertTrue(isEqualUpToMillis(recordB.getLifecycle().processingError().nextRetryAt(), claimedRecords.getLast().getLifecycle().processingError().nextRetryAt()));
            assertFalse(isEqualUpToMillis(recordB.getLifecycle().updatedAt(), claimedRecords.getLast().getLifecycle().updatedAt()));
        }

        @Test
        public void shouldSucceed_FailedRecordInPartitionPreventsSubsequentRecordsFromBeingClaimed() {
            // This is an important test. If records in the same partition (aka same aggregate) can get claimed and be
            // processed even though there exists a terminally failed (all retries exhausted) entry, then the aggregate
            // could end up in a faulty state as processing of one entry gets entirely skipped (failed == ignored).
            // Thus, records must not be able to be claimed in such situations!
            // Records of other partitions should not be affected by this restriction since they are bound to different
            // aggregates.
            var partitionKey = new InboxRecordPartitionKey("part-A");
            var recordA = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-A"),
                            partitionKey,
                            TestMessage.newBuilder()
                                    .setFoo("test-message")
                                    .build())
                    .markAsCurrentlyBeingProcessed()
                    .markAsFailed();
            var recordB = InboxRecord.newlyRegistered(
                    new InboxRecordId("rec-B"),
                    partitionKey,
                    TestMessage.newBuilder()
                            .setFoo("other-test-message")
                            .build());
            var recordC = InboxRecord.newlyRegistered(
                    new InboxRecordId("rec-C"),
                    new InboxRecordPartitionKey("other-part-key"),
                    TestMessage.newBuilder()
                            .setFoo("yet-another-test-message")
                            .build());

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
                storage.store(recordC);
            });

            var claimedRecords = txManager.inTransaction(() -> storage.claimPendingRecords(10));
            var recoveredBlockedRecord = txManager.inTransaction(() -> storage.findById(recordB.getId()));

            assertEquals(1, claimedRecords.size());
            assertEquals(recordC.getId(), claimedRecords.getFirst().getId());
            assertTrue(recoveredBlockedRecord.isPresent());
            assertEquals(InboxRecordLifecycleState.PENDING, recoveredBlockedRecord.get().getLifecycle().state());
        }

        @Test
        public void shouldSucceed_CompletedRecordsAreNotGettingClaimed() {
            var recordA = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-A"),
                            new InboxRecordPartitionKey("part-A"),
                            TestMessage.newBuilder()
                                    .setFoo("test-message")
                                    .build())
                    .markAsCurrentlyBeingProcessed()
                    .markAsSuccessfullyCompleted();
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

            var claimedRecords = txManager.inTransaction(() -> storage.claimPendingRecords(10));

            assertEquals(1, claimedRecords.size());
            assertEquals(recordB.getId(), claimedRecords.getFirst().getId());
        }

        @Test
        public void shouldSucceed_ClaimedRecordsAreOrderedByCreationTimestamp() throws InterruptedException {
            // keeping the number quite high so that the database has an actual chance of making use of concurrent
            // processing during the record update. Despite that fact, we're still looking for correct ordering
            // regarding the claimed records (by creation timestamp).
            var numberOfTestRecords = 1000;
            var testRecords = new ArrayList<InboxRecord>(numberOfTestRecords);
            for (int i = 0; i < numberOfTestRecords; i++) {
                testRecords.add(InboxRecord.newlyRegistered(
                        new InboxRecordId("rec-" + i),
                        new InboxRecordPartitionKey("part-" + i),
                        TestMessage.newBuilder()
                                .setFoo("test")
                                .build()));
                // TODO: truncate time information on a model level so that we don't have to do any of these
                //       shenanigans in tests...
                Thread.sleep(2); // dirty solution for making sure that times are differing enough to not create
                // issues with truncation.
            }

            txManager.inTransaction(() -> {
                for (InboxRecord testRecord : testRecords) {
                    storage.store(testRecord);
                }
            });

            var claimedRecords = txManager.inTransaction(() -> storage.claimPendingRecords(numberOfTestRecords));

            assertEquals(numberOfTestRecords, claimedRecords.size());
            claimedRecords.sort(Comparator.comparing(a -> a.getLifecycle().createdAt()));

            assertIterableEquals(
                    testRecords.stream()
                            .map(InboxRecord::getId)
                            .toList(),
                    claimedRecords.stream()
                            .map(InboxRecord::getId)
                            .toList());
        }
    }

    @Nested
    class FindStalled {

        @Test
        public void shouldSucceed_FindingOnlyStalledRecordsInProcessingState() {
            // Stalled
            var recordA = InboxRecord.restore(
                    new InboxRecordId("rec-A"),
                    new InboxRecordPartitionKey("part-A"),
                    TestMessage.newBuilder()
                            .setFoo("test-message")
                            .build(),
                    new InboxRecordLifecycle(
                            InboxRecordLifecycleState.PROCESSING,
                            Instant.now().minusSeconds(10000),
                            null,
                            Instant.now().minusSeconds(9500),
                            new InboxRecordProcessingFailure(
                                    0,
                                    Instant.now().plusSeconds(10000))));
            // Also very old but is not considered stalled. Only records in processing state can get stalled.
            var recordB = InboxRecord.restore(
                    new InboxRecordId("rec-B"),
                    new InboxRecordPartitionKey("part-B"),
                    TestMessage.newBuilder()
                            .setFoo("other-test-message")
                            .build(),
                    new InboxRecordLifecycle(
                            InboxRecordLifecycleState.PENDING,
                            Instant.now().minusSeconds(10000),
                            null,
                            Instant.now().minusSeconds(9500),
                            new InboxRecordProcessingFailure(
                                    0,
                                    null)));
            // also in processing state but not stalled, since the update timestamp is as of now.
            var recordC = InboxRecord.restore(
                    new InboxRecordId("rec-C"),
                    new InboxRecordPartitionKey("part-C"),
                    TestMessage.newBuilder()
                            .setFoo("yet-another-test-message")
                            .build(),
                    new InboxRecordLifecycle(
                            InboxRecordLifecycleState.PROCESSING,
                            Instant.now().minusSeconds(10000),
                            null,
                            Instant.now(),
                            new InboxRecordProcessingFailure(
                                    0,
                                    null)));

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
                storage.store(recordC);
            });

            var foundStalledRecords = txManager.inTransaction(() -> storage.findStalledRecords(Duration.ofSeconds(60), 10));

            assertEquals(1, foundStalledRecords.size());
            assertEquals(recordA.getId(), foundStalledRecords.getFirst().getId());
        }

        @Test
        public void shouldSucceed_FindingNumberOfStalledRecordsUpToBatchSize() {
            var recordA = InboxRecord.restore(
                    new InboxRecordId("rec-A"),
                    new InboxRecordPartitionKey("part-A"),
                    TestMessage.newBuilder()
                            .setFoo("test-message")
                            .build(),
                    new InboxRecordLifecycle(
                            InboxRecordLifecycleState.PROCESSING,
                            Instant.now().minusSeconds(10000),
                            null,
                            Instant.now().minusSeconds(9500),
                            new InboxRecordProcessingFailure(
                                    0,
                                    Instant.now().plusSeconds(10000))));
            var recordB = InboxRecord.restore(
                    new InboxRecordId("rec-B"),
                    new InboxRecordPartitionKey("part-B"),
                    TestMessage.newBuilder()
                            .setFoo("other-test-message")
                            .build(),
                    new InboxRecordLifecycle(
                            InboxRecordLifecycleState.PROCESSING,
                            Instant.now().minusSeconds(10000),
                            null,
                            Instant.now().minusSeconds(9800),
                            new InboxRecordProcessingFailure(
                                    0,
                                    Instant.now().plusSeconds(10000))));
            var recordC = InboxRecord.restore(
                    new InboxRecordId("rec-C"),
                    new InboxRecordPartitionKey("part-C"),
                    TestMessage.newBuilder()
                            .setFoo("yet-another-test-message")
                            .build(),
                    new InboxRecordLifecycle(
                            InboxRecordLifecycleState.PROCESSING,
                            Instant.now().minusSeconds(10000),
                            null,
                            Instant.now().minusSeconds(9999),
                            new InboxRecordProcessingFailure(
                                    0,
                                    Instant.now().plusSeconds(10000))));

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
                storage.store(recordC);
            });

            var batchSize = 2;
            var foundStalledRecords = txManager.inTransaction(() ->
                    storage.findStalledRecords(Duration.ofSeconds(60), batchSize));

            assertEquals(batchSize, foundStalledRecords.size());
            // ordering depends on updated_at timestamp (oldest stalled record comes first)
            assertEquals(recordC.getId(), foundStalledRecords.getFirst().getId());
            assertEquals(recordB.getId(), foundStalledRecords.getLast().getId());
        }
    }

    @Nested
    class FindFailed {

        @Test
        public void shouldSucceed_OnlyFindsFailedInboxRecords() {
            var recordA = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-A"),
                            new InboxRecordPartitionKey("part-A"),
                            TestMessage.newBuilder()
                                    .setFoo("test")
                                    .build())
                    .markAsCurrentlyBeingProcessed()
                    .markAsFailed();
            var recordB = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-B"),
                            new InboxRecordPartitionKey("part-B"),
                            TestMessage.newBuilder()
                                    .setFoo("other-test")
                                    .build());
            var recordC = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-C"),
                            new InboxRecordPartitionKey("part-C"),
                            TestMessage.newBuilder()
                                    .setFoo("yet-another-test")
                                    .build())
                    .markAsCurrentlyBeingProcessed();

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
                storage.store(recordC);
            });

            var batchSize = 3;
            var failedRecords = txManager.inTransaction(() -> storage.findFailedRecords(batchSize));

            assertEquals(1, failedRecords.size());
            assertEquals(recordA.getId(), failedRecords.getFirst().getId());
        }

        @Test
        public void shouldSucceed_FindsFailedInboxRecordsUpToBatchSize() {
            var recordA = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-A"),
                            new InboxRecordPartitionKey("part-A"),
                            TestMessage.newBuilder()
                                    .setFoo("test")
                                    .build())
                    .markAsCurrentlyBeingProcessed()
                    .markAsFailed();
            var recordB = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-B"),
                            new InboxRecordPartitionKey("part-B"),
                            TestMessage.newBuilder()
                                    .setFoo("other-test")
                                    .build())
                    .markAsCurrentlyBeingProcessed()
                    .markAsFailed();
            var recordC = InboxRecord.newlyRegistered(
                            new InboxRecordId("rec-C"),
                            new InboxRecordPartitionKey("part-C"),
                            TestMessage.newBuilder()
                                    .setFoo("yet-another-test")
                                    .build())
                    .markAsCurrentlyBeingProcessed()
                    .markAsFailed();

            txManager.inTransaction(() -> {
                storage.store(recordA);
                storage.store(recordB);
                storage.store(recordC);
            });

            var batchSize = 2;
            var failedRecords = txManager.inTransaction(() -> storage.findFailedRecords(batchSize));

            assertEquals(2, failedRecords.size());
            assertEquals(recordA.getId(), failedRecords.getFirst().getId());
            assertEquals(recordB.getId(), failedRecords.getLast().getId());
        }
    }

    private boolean isEqualUpToMillis(Instant a, Instant b) {
        if (a == null) {
            return b == null;
        } else {
            if (b == null) {
                return false;
            }
        }

        return Duration.between(
                        a.truncatedTo(ChronoUnit.MILLIS),
                        b.truncatedTo(ChronoUnit.MILLIS))
                .isZero();
    }
}
