package eu.ampel_platform.messaging_sdk;

import com.google.protobuf.Message;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

import static java.util.Objects.requireNonNull;

/**
 * A dynamic dispatcher for handling incoming events within the Ampel platform.
 * It allows for routing events to certain handlers at runtime without the needs for a consumer to rely on costly
 * reflection based techniques (e.g. instanceof checks).
 *
 * @since 1.0.0
 */
public final class AmpelEventHandlerRouter {

    private final Consumer<Message> defaultEventHandler;
    private final Map<Class<? extends Message>, AmpelEventHandler<? extends Message>> eventHandlers;

    private AmpelEventHandlerRouter(AmpelEventHandlerRouterBuilder builder) {
        this.defaultEventHandler = builder.defaultEventHandler;
        this.eventHandlers = new HashMap<>(builder.eventHandlers);
    }

    /**
     * Creates a new builder instance for a router with the given fallback handler backed in.
     *
     * @param defaultEventHandler Fallback handler that events are being routed to if no other handler for a specific
     *                            type of event has been registered.
     * @return A builder instance.
     */
    public static AmpelEventHandlerRouterBuilder newBuilder(Consumer<Message> defaultEventHandler) {
        requireNonNull(defaultEventHandler, "the fallback event handler must not be null");
        return new AmpelEventHandlerRouterBuilder(defaultEventHandler);
    }

    /**
     * Routes the given event to either a registered handler or to the default handler if no registered handler is
     * capable of handling this type of event.
     *
     * @param event The event to route.
     * @param <M>   Message type to route.
     * @throws AmpelEventHandlerException If an error occurs while handling the event.
     */
    @SuppressWarnings("unchecked")
    public <M extends Message> void routeEvent(M event) throws AmpelEventHandlerException {
        var handler = eventHandlers.get(event.getClass());
        if (handler == null) {
            defaultEventHandler.accept(event);
        } else {
            ((AmpelEventHandler<M>) handler).handleEvent(event);
        }
    }

    /**
     * Builder for {@link AmpelEventHandlerRouter}.
     *
     * @since 1.0.0
     */
    public static class AmpelEventHandlerRouterBuilder {
        private final Consumer<Message> defaultEventHandler;
        private final Map<Class<? extends Message>, AmpelEventHandler<? extends Message>> eventHandlers;

        private AmpelEventHandlerRouterBuilder(Consumer<Message> defaultEventHandler) {
            this.defaultEventHandler = requireNonNull(defaultEventHandler, "default event handler must not be null");
            this.eventHandlers = new HashMap<>();
        }

        /**
         * Registers the given list of event handlers.
         *
         * @param handlers Handlers to be registered.
         * @return Instance of this builder.
         */
        public AmpelEventHandlerRouterBuilder withEventHandlers(List<AmpelEventHandler<? extends Message>> handlers) {
            handlers.forEach(this::withEventHandler);
            return this;
        }

        /**
         * Registers the given event handler.
         *
         * @param handler Handler to be registered.
         * @return Instance of this builder.
         */
        public AmpelEventHandlerRouterBuilder withEventHandler(AmpelEventHandler<? extends Message> handler) {
            eventHandlers.put(handler.getHandledEventType(), handler);
            return this;
        }

        /**
         * Builds a {@link AmpelEventHandlerRouter} instance using the registered event handlers (including the fallback
         * handler).
         *
         * @return A configured {@link AmpelEventHandlerRouter} instance.
         */
        public AmpelEventHandlerRouter build() {
            return new AmpelEventHandlerRouter(this);
        }
    }
}
