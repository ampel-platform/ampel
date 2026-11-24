package eu.ampel_platform.messaging_sdk.inbox;

/**
 * Indicates that a proper {@link InboxRecordHandler} is missing for handling a
 * {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord}.
 *
 * @since 2.0.0
 */
public final class InboxRecordMissingHandlerException extends Exception {
    public InboxRecordMissingHandlerException(String message) {
        super(message);
    }
}
