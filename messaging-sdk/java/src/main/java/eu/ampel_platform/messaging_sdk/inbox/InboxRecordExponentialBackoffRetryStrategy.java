package eu.ampel_platform.messaging_sdk.inbox;

import org.jetbrains.annotations.Range;

import java.util.Optional;
import java.util.Random;

/**
 * A strategy for retrying the processing of {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord}s by
 * applying an exponential backoff.
 * </p>
 * The implementation is making use of an equal jitter, i.e. no fully randomized jitter but one that operates within
 * upper and lower bounds.
 *
 * @since 2.0.0
 */
public final class InboxRecordExponentialBackoffRetryStrategy implements InboxRecordRetryStrategy {

    private static final int EXPONENTIAL_FACTOR = 2;

    private final int baseIntervalMs;
    private final int maxAllowedRetries;

    /**
     * Creates a new {@link InboxRecordExponentialBackoffRetryStrategy} with the given configuration.
     *
     * @param baseIntervalMs    interval in milliseconds forming the base of each delay calculation
     * @param maxAllowedRetries upper limit of how many retry attempts are allowed
     */
    public InboxRecordExponentialBackoffRetryStrategy(
            int baseIntervalMs,
            @Range(from = 1, to = Integer.MAX_VALUE) int maxAllowedRetries) {
        if (baseIntervalMs <= 0) {
            throw new IllegalArgumentException("base interval (ms) has to be truly positive");
        }
        this.baseIntervalMs = baseIntervalMs;

        if (maxAllowedRetries < 1) {
            throw new IllegalArgumentException("at least one retry has to be allowed");
        }
        this.maxAllowedRetries = maxAllowedRetries;
    }

    /**
     * Calculates the time in ms for when processing an {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord}
     * can be retried again.
     * </p>
     * The calculation is based on an exponential backoff which is accompanied by an equal jitter operating in upper
     * and lower bounds. This calculation effectively prevents naive retries and also retry flooding in case of a
     * congested handler.
     *
     * @param nextRetryAttempt denotes the number of retries when processing an {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord} again.
     * @return The delay in ms for when processing an {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord}
     * can be retried again. If no delay could be calculated, e.g. because the maximum amount of retries has been
     * exceeded then {@link Optional#empty()} is returned.
     */
    @Override
    public Optional<Integer> calculateNextRetryDelayMs(int nextRetryAttempt) {
        if (nextRetryAttempt <= 0) {
            throw new IllegalArgumentException("a retry attempt has to be truly positive");
        }
        if (nextRetryAttempt > maxAllowedRetries) {
            return Optional.empty();
        }

        // This calculation is using an equal jitter. Thus, it's not fully randomized but also not working
        // solely on an exponential backoff algorithm.
        //
        // The calculation is based on the following formula:
        //
        // t(r) = (baseInterval * (expo_factor^r) + random(0, baseInterval * (expo_factor^r))) / 2
        var random = new Random();
        var retryDelay = (int) ((baseIntervalMs * Math.pow(EXPONENTIAL_FACTOR, nextRetryAttempt)
                + random.nextDouble(baseIntervalMs * Math.pow(EXPONENTIAL_FACTOR, nextRetryAttempt))) / 2);

        return Optional.of(retryDelay);
    }
}
