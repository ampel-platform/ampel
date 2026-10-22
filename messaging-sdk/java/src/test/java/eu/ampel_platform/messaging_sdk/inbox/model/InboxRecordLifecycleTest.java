package eu.ampel_platform.messaging_sdk.inbox.model;

import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;

public final class InboxRecordLifecycleTest {

    @Test
    public void NewlyPendingLifecycleDoesNotContainRecordedErrorsOrProcessingTime() {
        var lifecycle = InboxRecordLifecycle.newlyPending();

        assertEquals(InboxRecordLifecycleState.PENDING, lifecycle.state());
        assertTrue(lifecycle.createdAt().isBefore(Instant.now()));
        assertNull(lifecycle.processedAt());
        assertNull(lifecycle.updatedAt());
        assertNotNull(lifecycle.processingError());
        assertEquals(0, lifecycle.processingError().failureCount());
    }

}
