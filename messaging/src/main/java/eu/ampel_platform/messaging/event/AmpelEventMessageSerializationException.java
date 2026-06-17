package eu.ampel_platform.messaging.event;

/**
 * Denotes an error stating that an {@link AmpelEventMessage} could not get serialized.
 *
 * @since 1.0.0
 */
public final class AmpelEventMessageSerializationException extends Exception {
    AmpelEventMessageSerializationException(String message) {
        super(message);
    }

    AmpelEventMessageSerializationException(String message, Throwable cause) {
        super(message, cause);
    }
}
