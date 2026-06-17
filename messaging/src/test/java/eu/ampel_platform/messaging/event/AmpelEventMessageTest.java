package eu.ampel_platform.messaging.event;

import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;

final class AmpelEventMessageTest {

    private record TestEvent() implements AmpelEvent {
    }

    @Test
    public void should_throw_tryingToCreateWithoutHeader() {
        assertThrows(
                NullPointerException.class,
                () -> new AmpelEventMessage(null, new TestEvent()));
    }

    @Test
    public void should_throw_tryingToCreateWithoutPayload() {
        var header = new AmpelEventMessageHeader(
                UUID.randomUUID(),
                Instant.now(),
                "test-system",
                UUID.randomUUID()
        );

        assertThrows(
                NullPointerException.class,
                () -> new AmpelEventMessage(header, null));
    }
}
