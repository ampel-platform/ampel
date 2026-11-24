package eu.ampel_platform.notification_service.inbox.event_handler;

import com.google.protobuf.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

/**
 * A {@link Consumer} that is used whenever an event couldn't get handled due to a missing handler.
 *
 * @since 2.0.0
 */
public final class FallbackEventHandler implements Consumer<Message> {
    private static final Logger LOGGER = LoggerFactory.getLogger(FallbackEventHandler.class);

    @Override
    public void accept(Message message) {
        // TODO: this needs to send the event to a DLQ
        LOGGER.warn("couldn't find a handler for message of type {}", message.getClass().getName());
    }
}
