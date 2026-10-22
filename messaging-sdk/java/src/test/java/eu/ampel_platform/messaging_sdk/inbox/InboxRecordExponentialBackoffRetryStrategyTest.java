package eu.ampel_platform.messaging_sdk.inbox;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

final class InboxRecordExponentialBackoffRetryStrategyTest {

    private static final int BASE_RETRY_INTERVAL_MS = 1000;
    private static final int MAX_ALLOWED_RETRIES = 5;

    private static final InboxRecordExponentialBackoffRetryStrategy retryStrategy =
            new InboxRecordExponentialBackoffRetryStrategy(BASE_RETRY_INTERVAL_MS, MAX_ALLOWED_RETRIES);
    
    @Test
    public void shouldThrow_tryingToCalculateRetryDelayForNegativeAttemptNumber() {
        assertThrows(IllegalArgumentException.class, () -> retryStrategy.calculateNextRetryDelayMs(-1));
    }

    @Test
    public void shouldThrow_tryingToCalculateRetryDelayForZeroAttempt() {
        assertThrows(IllegalArgumentException.class, () -> retryStrategy.calculateNextRetryDelayMs(0));
    }

    @Test
    public void shouldSucceed_calculatingRetryDelayWhenMaxAttemptsIsNotReachedYet() {
        var retryDelay = retryStrategy.calculateNextRetryDelayMs(MAX_ALLOWED_RETRIES);
        assertTrue(retryDelay.isPresent());
    }

    @Test
    public void shouldSucceed_calculatingRetryDelayWhenMaxAttemptsHaveBeenExceeded() {
        var retryDelay = retryStrategy.calculateNextRetryDelayMs(MAX_ALLOWED_RETRIES + 1);
        assertTrue(retryDelay.isEmpty());
    }

    @Test
    public void shouldSucceed_retryDelaysForConsecutiveAttemptsAreNotLinear() {
        int samples = 500;

        // First entry is the average for attempt #1
        // Second entry is the average for attempt #2 ...
        List<Double> averageRetryDelayMs = new ArrayList<>(MAX_ALLOWED_RETRIES);

        for (int attempt = 1; attempt < MAX_ALLOWED_RETRIES; attempt++) {

            var totalRetryDelayMs = 0L;
            for (int sample = 0; sample < samples; sample++) {

                var retryDelay = retryStrategy.calculateNextRetryDelayMs(attempt);
                if (retryDelay.isEmpty()) {
                    fail("this should never happen");
                }
                totalRetryDelayMs += retryDelay.get();
            }

            averageRetryDelayMs.add((double) totalRetryDelayMs / samples);
        }

        // verify monotonic growth of attempt averages
        for (int i = 1; i < averageRetryDelayMs.size(); i++) {
            assertTrue(
                    averageRetryDelayMs.get(i) > averageRetryDelayMs.get(i - 1));
        }
    }
}
