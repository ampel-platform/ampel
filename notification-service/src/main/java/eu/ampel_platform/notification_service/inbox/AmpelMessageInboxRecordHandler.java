package eu.ampel_platform.notification_service.inbox;

import eu.ampel_platform.messaging_sdk.AmpelEventHandlerException;
import eu.ampel_platform.messaging_sdk.AmpelEventHandlerRouter;
import eu.ampel_platform.messaging_sdk.inbox.InboxRecordHandler;
import eu.ampel_platform.messaging_sdk.inbox.InboxRecordHandlerException;
import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static java.util.Objects.requireNonNull;

/**
 * An adapter to make {@link AmpelEventHandlerRouter} compatible with the {@link InboxRecordHandler} interface.
 * </p>
 * This handler takes {@link InboxRecord}s containing {@link com.google.protobuf.Message}s resembling AMPEL events
 * and hands them off to a {@link AmpelEventHandlerRouter} instance to take care of it.
 *
 * @since 1.0.0
 */
public final class AmpelMessageInboxRecordHandler implements InboxRecordHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(AmpelMessageInboxRecordHandler.class);

    private final AmpelEventHandlerRouter ampelEventHandlerRouter;

    public AmpelMessageInboxRecordHandler(@NotNull AmpelEventHandlerRouter ampelEventHandlerRouter) {
        this.ampelEventHandlerRouter = requireNonNull(ampelEventHandlerRouter,
                "Ampel event handler router must not be null");
    }

    @Override
    public void accept(InboxRecord record) throws InboxRecordHandlerException {
        try {
            LOGGER.debug("processing record with ID '{}'", record.getId().id());
            ampelEventHandlerRouter.routeEvent(record.getPayload());
        } catch (AmpelEventHandlerException e) {
            throw new InboxRecordHandlerException("cannot handle event of inbox record with ID '%s'"
                    .formatted(record.getId().id()), e);
        }
    }
}
