package eu.ampel_platform.messaging_sdk.inbox;

import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord;

/**
 * Describes an entity to handle a {@link InboxRecord} during processing.
 *
 * @since 2.0.0
 */
@FunctionalInterface
public interface InboxRecordHandler {

    /**
     * Handles the given {@link InboxRecord}.
     *
     * @param record the record to handle
     * @throws InboxRecordHandlerException if an error occurs while handling the record.
     */
    void accept(InboxRecord record) throws InboxRecordHandlerException;
}
