package eu.ampel_platform.messaging.event;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.json.JsonMapper;

import static java.util.Objects.requireNonNull;

/**
 * {@link AmpelEventMessageSerializer} and {@link AmpelEventMessageDeserializer} for {@link AmpelEventMessage}s that
 * operates in JSON format.
 *
 * @since 1.0.0
 */
public final class AmpelEventMessageSerdeJson implements AmpelEventMessageSerializer, AmpelEventMessageDeserializer {

    private final ObjectMapper mapper;
    private final AmpelEventSchemaRegistry schemaRegistry;

    AmpelEventMessageSerdeJson(ObjectMapper mapper, AmpelEventSchemaRegistry schemaRegistry) {
        this.mapper = requireNonNull(mapper, "JSON mapper must not be null");
        this.schemaRegistry = requireNonNull(schemaRegistry, "schema registry must not be null");
    }

    /**
     * Creates an {@link AmpelEventMessageSerdeJson} instance using default settings (including a default JSON mapper
     * instance for keeping integrity between serialized and deserialized messages).
     *
     * @return The default {@link AmpelEventMessageSerdeJson} instance.
     */
    public static AmpelEventMessageSerdeJson create() {
        try {
            var eventSchemaDiscovery = new AmpelEventSchemaReflectionDiscovery();
            var discoveredAmpelEventSchema = eventSchemaDiscovery.discoverAmpelEventSchemas();

            var registry = new AmpelEventSchemaRegistry();
            for (AmpelEventSchemaInformation eventSchemaInformation : discoveredAmpelEventSchema) {
                registry.registerEventSchema(eventSchemaInformation);
            }

            return new AmpelEventMessageSerdeJson(
                    createAmpelJsonMapper(),
                    registry);
        } catch (AmpelEventSchemaAlreadyInUseException | AmpelEventTypeAlreadyInUseException e) {
            throw new RuntimeException("could not create populated message schema registry", e);
        }
    }

    /**
     * The basic JSON mapper used by {@link AmpelEventMessageSerdeJson}.
     *
     * @return The JSON mapper.
     */
    static ObjectMapper createAmpelJsonMapper() {
        return JsonMapper.builder()
                .findAndAddModules()
//                .disable(SerializationFeature.WRITE_DATE_TIMESTAMPS_AS_NANOSECONDS)
//                .disable(DeserializationFeature.READ_DATE_TIMESTAMPS_AS_NANOSECONDS)
                .propertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE)
                .build();
    }

    @Override
    public AmpelEventMessage deserialize(byte[] serializedMessage) throws AmpelEventMessageDeserializationException {
        try {
            var intermediateMessage = mapper.readValue(serializedMessage, IntermediateMessage.class);

            if (intermediateMessage.header == null) {
                throw new AmpelEventMessageDeserializationException("could not deserialize message header");
            }

            var typeHint = schemaRegistry.lookupEventType(
                            new AmpelEventSchemaInformationMetadata(intermediateMessage.header.getEventType(),
                                    intermediateMessage.header.getEventVersion()))
                    .orElseThrow(() -> new AmpelEventMessageDeserializationException("could not deserialize message " +
                            "due to missing schema information. Make sure to add @AmpelEventSchema to events that " +
                            "should be both, serializable and deserializable"));

            return new AmpelEventMessage(
                    intermediateMessage.header,
                    mapper.treeToValue(intermediateMessage.intermediatePayload, typeHint));
        } catch (Exception e) {
            throw new AmpelEventMessageDeserializationException("could not deserialize message", e);
        }
    }

    @Override
    public byte[] serialize(AmpelEventMessage message) throws AmpelEventMessageSerializationException {
        try {
            var schema = schemaRegistry.lookupEventSchemaMetadata(message.payload().getClass())
                    .orElseThrow(() -> new AmpelEventMessageSerializationException("could not serialize message " +
                            "due to missing schema information. Make sure to add @AmpelEventSchema to events that " +
                            "should be both, serializable and deserializable"));

            message.header().setEventType(schema.name());
            message.header().setEventVersion(schema.version());

            return mapper.writeValueAsBytes(message);
        } catch (JsonProcessingException e) {
            throw new AmpelEventMessageSerializationException("could not serialize message", e);
        }
    }

    private record IntermediateMessage(
            AmpelEventMessageHeader header,
            @JsonProperty("payload") JsonNode intermediatePayload
    ) {
    }
}
