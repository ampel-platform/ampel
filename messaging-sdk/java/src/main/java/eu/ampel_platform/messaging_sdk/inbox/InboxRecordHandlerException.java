package eu.ampel_platform.messaging_sdk.inbox;

/**
 * Indicates that there was an error handling an {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord}.
 *
 * @since 1.0.0
 */
public final class InboxRecordHandlerException extends Exception {
    public InboxRecordHandlerException(String message) {
        super(message);
    }

    public InboxRecordHandlerException(String message, Throwable cause) {
        super(message, cause);
    }
}
