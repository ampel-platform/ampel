package eu.ampel_platform.messaging_sdk.inbox.model;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.time.Instant;

/**
 * Describes the lifecycle of an {@link InboxRecord}.
 *
 * @param state           lifecycle state that the record is in
 * @param createdAt       when the record was created
 * @param processedAt     when the record was processed
 * @param processingError potential, error related information from processing the record
 * @since 1.0.0
 */
public record InboxRecordLifecycle(
        @NotNull InboxRecordLifecycleState state,
        @NotNull Instant createdAt,
        @Nullable Instant processedAt,
        @Nullable Instant updatedAt,
        @NotNull InboxRecordProcessingFailure processingError
) {
    public InboxRecordLifecycle {
        if (state == null) {
            throw new IllegalArgumentException("lifecycle state is required");
        }

        if (createdAt == null) {
            throw new IllegalArgumentException("creation time missing");
        }

        if (processingError == null) {
            throw new IllegalArgumentException("processing error must not be null - use a blank version if necessary");
        }
    }

    /**
     * Creates a new {@link InboxRecordLifecycle} instance where the lifecycle state is set to
     * {@link InboxRecordLifecycleState#PENDING}. Every other information falls back to its default value.
     *
     * @return An {@link InboxRecordLifecycle} instance in pending state.
     */
    static InboxRecordLifecycle newlyPending() {
        return new InboxRecordLifecycle(
                InboxRecordLifecycleState.PENDING,
                Instant.now(),
                null,
                null,
                InboxRecordProcessingFailure.blank());
    }
}
