package eu.ampel_platform.messaging_sdk;

import com.google.protobuf.Message;
import com.google.protobuf.Parser;
import io.github.classgraph.ClassGraph;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static java.util.Objects.requireNonNull;

/**
 * A registry for storing parsers for certain Ampel event types.
 * </p>
 * This is especially important for deserialization since Ampel events are wrapped in ProtoBuf's
 * {@link com.google.protobuf.Any} type which acts as a general type. In order to deserialize anything wrapped in it,
 * certain type information needs to be looked up which is exactly what this registry is for.
 *
 * @since 2.0.0
 */
public final class AmpelEventTypeRegistry {

    private static final Logger LOGGER = LoggerFactory.getLogger(AmpelEventTypeRegistry.class);
    private static final String PROTO_BUF_GENERATED_PACKAGE = "eu.ampel_platform.messaging_sdk";

    private final Map<String, Parser<? extends Message>> parserByTypeUrl;

    private static List<Class<Message>> CLASS_INSTANCES;

    private AmpelEventTypeRegistry(Map<String, Parser<? extends Message>> parserByTypeUrl) {
        this.parserByTypeUrl = requireNonNull(parserByTypeUrl, "mapping from event type url to parser must not be null");
    }

    /**
     * Tries to discover all Ampel event types within the classpath and their associated parsers.
     *
     * @return The type URLs (ProtoBuf specific) of discovered Ampel events associated with their respective parser.
     */
    public static Map<String, Parser<? extends Message>> discoverParsersByEventUrl() {
        // Make use of a singleton here in order to skip the expensive class scan.
        // Since classes are resolved during runtime anyway, there's no need to assume additional classes have been
        // added since the last invocation.
        if (CLASS_INSTANCES == null) {
            try (var scan = new ClassGraph()
                    .acceptPackages(PROTO_BUF_GENERATED_PACKAGE)
                    .enableClassInfo()
                    .scan()) {

                CLASS_INSTANCES = scan.getClassesImplementing(Message.class)
                        .filter(ci -> !ci.isAbstract())
                        .loadClasses(Message.class);
            }
        }

        var eventTypesByTypeUrl = new HashMap<String, Parser<? extends Message>>();
        for (Class<Message> instance : CLASS_INSTANCES) {
            try {
                var defaultInstance = (Message) instance.getDeclaredMethod("getDefaultInstance").invoke(instance);
                eventTypesByTypeUrl.put(
                        defaultInstance.getDescriptorForType().getFullName(),
                        defaultInstance.getParserForType());
            } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
                LOGGER.error("could not get descriptor for message type '{}'", instance.getName(), e);
            }
        }

        return eventTypesByTypeUrl;
    }

    /**
     * Configures an unmodifiable {@link AmpelEventTypeRegistry} instance with the given registry entries.
     *
     * @param parsersByEventTypeUrl A mapping of type URLs (ProtoBuf specific) of Ampel events to their associated
     *                              respective parser.
     * @return A {@link AmpelEventTypeRegistry} instance.
     * @see #discoverParsersByEventUrl()
     */
    public static AmpelEventTypeRegistry withParsersForEventTypeUrls(
            Map<String, Parser<? extends Message>> parsersByEventTypeUrl) {
        return new AmpelEventTypeRegistry(parsersByEventTypeUrl);
    }

    /**
     * Tries to obtain the associated parser for the given type URL (ProtoBuf specific).
     *
     * @param typeUrl A type URL in the context of ProtoBuf. It's a globally unique identifier for and resolves to a
     *                message's type. See ProtoBuf documentation on the Any type for more information.
     * @return The associated parser if the given type URL has been registered with this registry.
     * @throws InvalidTypeUrlException If the given type URL is invalid.
     */
    Optional<Parser<? extends Message>> getParserForTypeUrl(String typeUrl)
            throws InvalidTypeUrlException {
        String[] parts = typeUrl.split("/");
        if (parts.length <= 1) {
            throw new InvalidTypeUrlException("the given type URL '%s' is invalid"
                    .formatted(typeUrl));
        }

        return Optional.ofNullable(parserByTypeUrl.get(parts[parts.length - 1]));
    }
}
