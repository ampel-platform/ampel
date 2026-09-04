package eu.ampel_platform.messaging_sdk.inbox.persistence;

/**
 * Indicates that there was an error serializing / deserializing an
 * {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord}'s payload.
 *
 * @since 1.0.0
 */
public final class InboxPayloadSerializationException extends RuntimeException {
    public InboxPayloadSerializationException(String message) {
        super(message);
    }

    public InboxPayloadSerializationException(String message, Throwable cause) {
        super(message, cause);
    }
}
