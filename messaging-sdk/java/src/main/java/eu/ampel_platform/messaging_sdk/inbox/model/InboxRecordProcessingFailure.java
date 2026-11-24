package eu.ampel_platform.messaging_sdk.inbox.model;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.jetbrains.annotations.Range;

import java.time.Instant;

/**
 * Describes error related metadata related to processing an {@link InboxRecord}.
 *
 * @param failureCount how often processing the record failed already
 * @param nextRetryAt  earliest instant of when an {@link InboxRecord} can be tried to be processed again
 * @since 2.0.0
 */
public record InboxRecordProcessingFailure(
        @Range(from = 0, to = Integer.MAX_VALUE) int failureCount,
        @Nullable Instant nextRetryAt
) {
    public InboxRecordProcessingFailure {
        if (failureCount < 0) {
            throw new IllegalArgumentException("failure count must not be negative");
        }
    }

    /**
     * Creates a new {@link InboxRecordProcessingFailure} instance. Carries over the invoked object's state as a
     * reference and increments the failure count.
     *
     * @return An {@link InboxRecordProcessingFailure} instance with adjusted state.
     */
    InboxRecordProcessingFailure registerTerminalFailure() {
        return new InboxRecordProcessingFailure(
                failureCount() + 1,
                null
        );
    }

    /**
     * Creates a new {@link InboxRecordProcessingFailure} instance. Carries over the invoked object's state as a
     * reference and increments the failure count while also replacing the failure count. Additionally, sets a dedicated
     * instant for when the associated {@link InboxRecord} can be tried to be processed again.
     *
     * @param nextRetryAt earliest instant when an {@link InboxRecord} can get tried to be processed again
     * @return An {@link InboxRecordProcessingFailure} instance with adjusted state.
     */
    InboxRecordProcessingFailure registerFailureWithRetry(@NotNull Instant nextRetryAt) {
        if (nextRetryAt == null) {
            throw new IllegalArgumentException("next retry instant must not be null");
        }
        if (failureCount() > 0 && nextRetryAt() != null && nextRetryAt.isBefore(nextRetryAt())) {
            throw new IllegalArgumentException("next retry instant must not be before the previous one");
        }

        return new InboxRecordProcessingFailure(
                failureCount() + 1,
                nextRetryAt
        );
    }

    /**
     * Creates a new {@link InboxRecordProcessingFailure} instance where no failure is recorded yet.
     *
     * @return A blank {@link InboxRecordProcessingFailure} instance.
     */
    static InboxRecordProcessingFailure blank() {
        return new InboxRecordProcessingFailure(0, null);
    }
}
