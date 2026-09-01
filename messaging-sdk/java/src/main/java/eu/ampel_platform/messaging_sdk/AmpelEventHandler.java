package eu.ampel_platform.messaging_sdk;

import com.google.protobuf.Message;

/**
 * A handler for events within the Ampel platform.
 * </p>
 * <b>Note:</b> <i>Events within the platform are defined via ProtoBuf messages.</i>
 */
public interface AmpelEventHandler<M extends Message> {

    /**
     * Handles the given event.
     *
     * @param event The event to handle.
     * @throws AmpelEventHandlerException If an error occurs while handling the event.
     */
    void handleEvent(M event) throws AmpelEventHandlerException;

    /**
     * Returns class information of the event that this handler is capable of handling.
     * </p>
     * <b>Note:</b> <i>This is NOT supposed to be used by any client code and only serves internal use cases within the
     * bounds of {@link AmpelEventHandlerRouter}.</i>
     *
     * @return Class information of the handled event type.
     */
    Class<M> getHandledEventType();
}
