package eu.ampel_platform.messaging.event;

/**
 * Denotes an error stating that a message could not get deserialized into an {@link AmpelEventMessage}.
 *
 * @since 1.0.0
 */
public final class AmpelEventMessageDeserializationException extends Exception {
    AmpelEventMessageDeserializationException(String message) {
        super(message);
    }

    AmpelEventMessageDeserializationException(String message, Throwable cause) {
        super(message, cause);
    }
}
