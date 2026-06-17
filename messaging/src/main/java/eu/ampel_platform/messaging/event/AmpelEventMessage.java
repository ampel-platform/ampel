package eu.ampel_platform.messaging.event;

import static java.util.Objects.requireNonNull;

/**
 * Defines a message as it's being used throughout the Ampel platform.
 * <p>
 * It is designed as an envelope in order to attach useful metadata to an event which is the message's actual payload.
 *
 * @param header  The message's metadata.
 * @param payload The message's actual payload.
 * @since 1.0.0
 */
public record AmpelEventMessage(
        AmpelEventMessageHeader header,
        AmpelEvent payload
) {
    public AmpelEventMessage {
        requireNonNull(header, "header must not be null");
        requireNonNull(payload, "payload must not be null");
    }
}
