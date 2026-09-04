package eu.ampel_platform.messaging_sdk.inbox.model;

import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class InboxRecordProcessingFailureTest {

    @Test
    public void blankHasNoRecordedErrors() {
        var blank = InboxRecordProcessingFailure.blank();

        assertEquals(0, blank.failureCount());
    }

    @Test
    public void registeringFailuresIncrementsFailureCount() {
        var inboxRecordProcessingError = InboxRecordProcessingFailure.blank()
                .registerTerminalFailure()
                .registerTerminalFailure();

        assertEquals(2, inboxRecordProcessingError.failureCount());
        assertNull(inboxRecordProcessingError.nextRetryAt());
    }

    @Test
    public void registeringFailureWithRetrySetsRetryInstant() {
        var earliestNextRetryAt = Instant.now().plusSeconds(10);

        var inboxRecordProcessingError = InboxRecordProcessingFailure.blank()
                .registerFailureWithRetry(earliestNextRetryAt);

        assertEquals(1, inboxRecordProcessingError.failureCount());
        assertEquals(earliestNextRetryAt, inboxRecordProcessingError.nextRetryAt());
    }
}
