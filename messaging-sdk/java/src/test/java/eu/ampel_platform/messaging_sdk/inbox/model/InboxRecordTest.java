package eu.ampel_platform.messaging_sdk.inbox.model;

import eu.ampel_platform.messaging_sdk.inbox.generated.TestMessage;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import static org.junit.jupiter.api.Assertions.*;

public final class InboxRecordTest {

    @Test
    public void newlyRegisteredInboxRecordInPendingStateWithoutRecordedErrors() {
        var id = new InboxRecordId("test-id");
        var partitionKey = new InboxRecordPartitionKey("medical-case-A");
        var payload = TestMessage.newBuilder()
                .setFoo("test-message")
                .build();

        var record = InboxRecord.newlyRegistered(id, partitionKey, payload);

        assertEquals(id, record.getId());
        assertEquals(partitionKey, record.getPartitionKey());
        assertEquals(payload, record.getPayload());
        assertEquals(InboxRecordLifecycleState.PENDING, record.getLifecycle().state());
        assertTrue(record.getLifecycle().createdAt().isBefore(Instant.now()));
        assertNull(record.getLifecycle().processedAt());
        assertNull(record.getLifecycle().updatedAt());
        assertNotNull(record.getLifecycle().processingError());
        assertEquals(0, record.getLifecycle().processingError().failureCount());
    }

    @Test
    public void restoredInboxRecordIsNotAltered() {
        var id = new InboxRecordId("test-id");
        var partitionKey = new InboxRecordPartitionKey("medical-case-A");
        var payload = TestMessage.newBuilder()
                .setFoo("test-message")
                .build();
        var lifecycle = new InboxRecordLifecycle(
                InboxRecordLifecycleState.COMPLETED,
                Instant.now().minus(1, ChronoUnit.DAYS),
                Instant.now(),
                Instant.now(),
                new InboxRecordProcessingFailure(
                        2,
                        Instant.now().plusSeconds(5)));

        var restoredRecord = InboxRecord.restore(id, partitionKey, payload, lifecycle);

        assertEquals(id, restoredRecord.getId());
        assertEquals(partitionKey, restoredRecord.getPartitionKey());
        assertEquals(payload, restoredRecord.getPayload());
        assertEquals(lifecycle, restoredRecord.getLifecycle());
    }

    @Test
    public void recordInFailedStatedIsRenderedFailed() {
        var record = new InboxRecord(
                new InboxRecordId("record-123"),
                new InboxRecordPartitionKey("medical-case-A"),
                TestMessage.newBuilder()
                        .setFoo("test-message")
                        .build(),
                new InboxRecordLifecycle(
                        InboxRecordLifecycleState.PROCESSING,
                        Instant.now(),
                        null,
                        Instant.now(),
                        InboxRecordProcessingFailure.blank()));

        var failedRecord = record.markAsFailed();

        assertTrue(failedRecord.isMarkedFailed());
    }

    @Nested
    public class StateTransitions {

        @Nested
        public class Completed {
            @Test
            public void shouldSucceed_TryTransitioningFromProcessingToCompleted() {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                InboxRecordLifecycleState.PROCESSING,
                                Instant.now(),
                                null,
                                Instant.now(),
                                InboxRecordProcessingFailure.blank()));

                InboxRecord markedRecord = record.markAsSuccessfullyCompleted();
                assertEquals(record.getId(), markedRecord.getId());
                assertEquals(record.getPartitionKey(), markedRecord.getPartitionKey());
                assertEquals(record.getPayload(), markedRecord.getPayload());
                assertEquals(InboxRecordLifecycleState.COMPLETED, markedRecord.getLifecycle().state());
                assertEquals(record.getLifecycle().createdAt(), markedRecord.getLifecycle().createdAt());
                assertNotNull(markedRecord.getLifecycle().processedAt());
                assertTrue(markedRecord.getLifecycle().processedAt()
                        .isAfter(markedRecord.getLifecycle().createdAt()));
                assertNotNull(markedRecord.getLifecycle().updatedAt());
                assertTrue(markedRecord.getLifecycle().updatedAt()
                        .isAfter(markedRecord.getLifecycle().createdAt()));
                assertEquals(record.getLifecycle().processingError(), markedRecord.getLifecycle().processingError());
            }

            @Test
            public void shouldSucceed_TryTransitioningToCompletedWhenAlreadyCompleted() {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                InboxRecordLifecycleState.COMPLETED,
                                Instant.now(),
                                Instant.now(),
                                Instant.now(),
                                InboxRecordProcessingFailure.blank()));

                var markedRecord = record.markAsSuccessfullyCompleted();

                assertEquals(record, markedRecord);
            }

            @ParameterizedTest
            @EnumSource(value = InboxRecordLifecycleState.class,
                    names = {"PROCESSING", "COMPLETED"},
                    mode = EnumSource.Mode.EXCLUDE)
            public void shouldFail_TryTransitioningToCompletedFromNonProcessingState(InboxRecordLifecycleState lifecycleState) {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                lifecycleState,
                                Instant.now(),
                                null,
                                Instant.now(),
                                InboxRecordProcessingFailure.blank()));

                assertThrows(IllegalStateException.class, record::markAsSuccessfullyCompleted);
            }
        }

        @Nested
        public class Failed {

            @Test
            public void shouldSucceed_TryTransitioningFromProcessingToFailed() {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                InboxRecordLifecycleState.PROCESSING,
                                Instant.now(),
                                null,
                                Instant.now(),
                                InboxRecordProcessingFailure.blank()));

                var markedRecord = record.markAsFailed();

                assertEquals(record.getId(), markedRecord.getId());
                assertEquals(record.getPartitionKey(), markedRecord.getPartitionKey());
                assertEquals(record.getPayload(), markedRecord.getPayload());
                assertEquals(InboxRecordLifecycleState.FAILED, markedRecord.getLifecycle().state());
                assertEquals(record.getLifecycle().createdAt(), markedRecord.getLifecycle().createdAt());
                assertNotNull(markedRecord.getLifecycle().processedAt());
                assertTrue(markedRecord.getLifecycle().processedAt()
                        .isAfter(markedRecord.getLifecycle().createdAt()));
                assertNotNull(markedRecord.getLifecycle().updatedAt());
                assertTrue(markedRecord.getLifecycle().updatedAt()
                        .isAfter(markedRecord.getLifecycle().createdAt()));
                assertNotNull(markedRecord.getLifecycle().processingError());
                assertEquals(1, markedRecord.getLifecycle().processingError().failureCount());
            }

            @Test
            public void shouldSucceed_TryTransitioningPreviouslyFailedRecordFromProcessingToFailed() {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                InboxRecordLifecycleState.PROCESSING,
                                Instant.now(),
                                null,
                                Instant.now(),
                                new InboxRecordProcessingFailure(
                                        1,
                                        Instant.now().plusSeconds(5))));

                var markedRecord = record.markAsFailed();

                assertNotNull(markedRecord.getLifecycle().processingError());
                assertEquals(2, markedRecord.getLifecycle().processingError().failureCount());
            }

            @Test
            public void shouldFail_TryTransitioningToFailedWhenAlreadyFailed() {
                // Already included in the parameterized test but consciously decided to put it in a dedicated test so
                // that the intent is clearly visible.

                // A record cannot be marked as "FAILED" multiple times since this would allow to alter the cause of a
                // failure. Doing so makes potential debugging unnecessarily hard, since this state is meant as a
                // terminal state. If a record needs to get retried instead, then there's a dedicated method to mark it
                // for this reason.
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                InboxRecordLifecycleState.FAILED,
                                Instant.now(),
                                null,
                                Instant.now(),
                                InboxRecordProcessingFailure.blank()));

                assertThrows(IllegalStateException.class, record::markAsFailed);
            }

            @ParameterizedTest
            @EnumSource(value = InboxRecordLifecycleState.class,
                    names = {"PROCESSING"},
                    mode = EnumSource.Mode.EXCLUDE)
            public void shouldFail_TryTransitioningToFailedFromNonProcessingState(InboxRecordLifecycleState lifecycleState) {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                lifecycleState,
                                Instant.now(),
                                null,
                                Instant.now(),
                                InboxRecordProcessingFailure.blank()));

                assertThrows(IllegalStateException.class, record::markAsFailed);
            }
        }

        @Nested
        public class Retry {

            @Test
            public void shouldSucceed_TryRetransitioningToWaitingForRetryFromProcessingState() {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                InboxRecordLifecycleState.PROCESSING,
                                Instant.now(),
                                null,
                                Instant.now(),
                                InboxRecordProcessingFailure.blank()));

                var earliestRetryAt = Instant.now().plusSeconds(5);
                var markedRecord = record.markForRetryAfterError(earliestRetryAt);

                assertEquals(record.getId(), markedRecord.getId());
                assertEquals(record.getPartitionKey(), markedRecord.getPartitionKey());
                assertEquals(record.getPayload(), markedRecord.getPayload());
                assertEquals(InboxRecordLifecycleState.WAITING_FOR_RETRY, markedRecord.getLifecycle().state());
                assertEquals(record.getLifecycle().createdAt(), markedRecord.getLifecycle().createdAt());
                assertNotNull(markedRecord.getLifecycle().processedAt());
                assertTrue(markedRecord.getLifecycle().processedAt()
                        .isAfter(markedRecord.getLifecycle().createdAt()));
                assertNotNull(markedRecord.getLifecycle().updatedAt());
                assertTrue(markedRecord.getLifecycle().updatedAt()
                        .isAfter(markedRecord.getLifecycle().createdAt()));
                assertNotNull(markedRecord.getLifecycle().processingError());
                assertEquals(1, markedRecord.getLifecycle().processingError().failureCount());
                assertEquals(earliestRetryAt, markedRecord.getLifecycle().processingError().nextRetryAt());
            }

            @Test
            public void shouldFail_TryRetransitioningToWaitingForRetryWithoutRetryInstant() {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                InboxRecordLifecycleState.PROCESSING,
                                Instant.now(),
                                null,
                                Instant.now(),
                                InboxRecordProcessingFailure.blank()));

                assertThrows(NullPointerException.class, () -> record.markForRetryAfterError(null));
            }

            @ParameterizedTest
            @EnumSource(value = InboxRecordLifecycleState.class,
                    names = {"PROCESSING"},
                    mode = EnumSource.Mode.EXCLUDE)
            public void shouldFail_TryTransitioningToWaitingForRetryFromNonProcessingState(InboxRecordLifecycleState lifecycleState) {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                lifecycleState,
                                Instant.now(),
                                null,
                                Instant.now(),
                                InboxRecordProcessingFailure.blank()));

                assertThrows(IllegalStateException.class,
                        () -> record.markForRetryAfterError(
                                Instant.now().plusSeconds(5)));
            }
        }

        @Nested
        public class Processing {

            @Test
            public void shouldSucceed_TryTransitioningToProcessingWhenAlreadyInProcessingState() {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                InboxRecordLifecycleState.PROCESSING,
                                Instant.now(),
                                null,
                                Instant.now(),
                                InboxRecordProcessingFailure.blank()));

                var markedRecord = record.markAsCurrentlyBeingProcessed();
                assertEquals(record, markedRecord);
            }

            @Test
            public void shouldSucceed_TryTransitioningToProcessingFromPendingState() {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                InboxRecordLifecycleState.PENDING,
                                Instant.now(),
                                null,
                                null,
                                InboxRecordProcessingFailure.blank()));

                var markedRecord = record.markAsCurrentlyBeingProcessed();

                assertEquals(record.getId(), markedRecord.getId());
                assertEquals(record.getPartitionKey(), markedRecord.getPartitionKey());
                assertEquals(record.getPayload(), markedRecord.getPayload());
                assertEquals(InboxRecordLifecycleState.PROCESSING, markedRecord.getLifecycle().state());
                assertEquals(record.getLifecycle().createdAt(), markedRecord.getLifecycle().createdAt());
                assertEquals(record.getLifecycle().processedAt(), markedRecord.getLifecycle().processedAt());
                assertNotNull(markedRecord.getLifecycle().updatedAt());
                assertNotEquals(record.getLifecycle().updatedAt(), markedRecord.getLifecycle().updatedAt());
                assertEquals(record.getLifecycle().processingError(), markedRecord.getLifecycle().processingError());
            }

            @ParameterizedTest
            @EnumSource(value = InboxRecordLifecycleState.class,
                    names = {"PROCESSING", "PENDING", "WAITING_FOR_RETRY"},
                    mode = EnumSource.Mode.EXCLUDE)
            public void shouldFail_TryTransitioningToProcessingFromTerminalState(InboxRecordLifecycleState lifecycleState) {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                lifecycleState,
                                Instant.now(),
                                null,
                                Instant.now(),
                                InboxRecordProcessingFailure.blank()));

                assertThrows(IllegalStateException.class, record::markAsCurrentlyBeingProcessed);
            }
        }

        @Nested
        public class Requeue {

            @Test
            public void shouldSucceed_TryTransitioningToBeingRequeuedIfAlreadyInThatState() {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                InboxRecordLifecycleState.PENDING,
                                Instant.now(),
                                null,
                                Instant.now(),
                                new InboxRecordProcessingFailure(
                                        1,
                                        Instant.now().plusSeconds(10))));

                var markedRecord = record.markAsBeingRequeued();
                assertEquals(record, markedRecord);
            }

            @ParameterizedTest
            @EnumSource(value = InboxRecordLifecycleState.class,
                    names = {"PROCESSING", "PENDING"},
                    mode = EnumSource.Mode.EXCLUDE)
            public void shouldFail_TryTransitioningToBeingRequeuedFromNonProcessingState(InboxRecordLifecycleState lifecycleState) {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                lifecycleState,
                                Instant.now(),
                                null,
                                Instant.now(),
                                new InboxRecordProcessingFailure(
                                        1,
                                        Instant.now().plusSeconds(10))));

                assertThrows(IllegalArgumentException.class, record::markAsBeingRequeued);
            }

            @Test
            public void shouldSucceed_TryTransitioningToBeingRequeuedFromProcessingState() {
                var record = new InboxRecord(
                        new InboxRecordId("record-123"),
                        new InboxRecordPartitionKey("medical-case-A"),
                        TestMessage.newBuilder()
                                .setFoo("test-message")
                                .build(),
                        new InboxRecordLifecycle(
                                InboxRecordLifecycleState.PROCESSING,
                                Instant.now(),
                                null,
                                Instant.now(),
                                InboxRecordProcessingFailure.blank()));

                var markedRecord = record.markAsBeingRequeued();

                assertEquals(record.getId(), markedRecord.getId());
                assertEquals(record.getPartitionKey(), markedRecord.getPartitionKey());
                assertEquals(record.getPayload(), markedRecord.getPayload());
                assertEquals(InboxRecordLifecycleState.PENDING, markedRecord.getLifecycle().state());
                assertEquals(record.getLifecycle().createdAt(), markedRecord.getLifecycle().createdAt());
                assertEquals(record.getLifecycle().processedAt(), markedRecord.getLifecycle().processedAt());
                assertNotNull(markedRecord.getLifecycle().updatedAt());
                assertNotNull(record.getLifecycle().updatedAt());
                assertTrue(record.getLifecycle().updatedAt().isBefore(markedRecord.getLifecycle().updatedAt()));
                assertEquals(record.getLifecycle().processingError(), markedRecord.getLifecycle().processingError());
            }
        }
    }
}
