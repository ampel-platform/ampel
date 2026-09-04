package eu.ampel_platform.messaging_sdk.inbox;

import java.util.Optional;

/**
 * Describes a strategy for retrying to process an {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord} after
 * a previous attempt has failed.
 *
 * @since 1.0.0
 */
public interface InboxRecordRetryStrategy {

    /**
     * Calculates the delay in milliseconds for retrying to process an
     * {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord} in the X attempt.
     *
     * @param retryAttempt the number of the next retry attempt (1 = first attempt, 2 = second attempt)
     * @return The calculated delay in milliseconds if it can be calculated.
     */
    Optional<Integer> calculateNextRetryDelayMs(int retryAttempt);
}
