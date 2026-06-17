package eu.ampel_platform.messaging.event;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static java.util.Objects.requireNonNull;

/**
 * An in memory registry for storing schemas of {@link AmpelEvent}s.
 * This is internally used for attaching schema information to {@link AmpelEventMessage}s and make use of it for a 2-step
 * deserialization process of said {@link AmpelEventMessage}s.
 * </p>
 * This is intended to be solely used internally.
 */
final class AmpelEventSchemaRegistry {

    private final Map<AmpelEventSchemaInformationMetadata, Class<? extends AmpelEvent>> typeByMetadata;
    private final Map<Class<? extends AmpelEvent>, AmpelEventSchemaInformationMetadata> MetadataByType;

    AmpelEventSchemaRegistry() {
        typeByMetadata = new HashMap<>();
        MetadataByType = new HashMap<>();
    }

    /**
     * Registers an event schema associated with a specific {@link AmpelEvent}.
     *
     * @param schemaInformation Schema information.
     * @throws AmpelEventSchemaAlreadyInUseException If the schema is already registered.
     * @throws AmpelEventTypeAlreadyInUseException   If the event eventType is already registered with another schema.
     */
    void registerEventSchema(AmpelEventSchemaInformation schemaInformation)
            throws AmpelEventSchemaAlreadyInUseException, AmpelEventTypeAlreadyInUseException {
        requireNonNull(schemaInformation, "schema information must not be null");

        if (typeByMetadata.containsKey(schemaInformation.metadata())) {
            throw new AmpelEventSchemaAlreadyInUseException(schemaInformation.metadata(),
                    typeByMetadata.get(schemaInformation.metadata()));
        }
        if (MetadataByType.containsKey(schemaInformation.eventType())) {
            throw new AmpelEventTypeAlreadyInUseException(MetadataByType.get(schemaInformation.eventType()),
                    schemaInformation.eventType());
        }

        typeByMetadata.put(schemaInformation.metadata(), schemaInformation.eventType());
        MetadataByType.put(schemaInformation.eventType(), schemaInformation.metadata());
    }

    /**
     * Tries to look up the {@link AmpelEvent} type associated with the given schema metadata.
     *
     * @param schemaMetadata A schema's metadata.
     * @return The {@link AmpelEvent} eventType if there is any.
     */
    Optional<Class<? extends AmpelEvent>> lookupEventType(AmpelEventSchemaInformationMetadata schemaMetadata) {
        requireNonNull(schemaMetadata, "schema metadata must not be null");
        return Optional.ofNullable(typeByMetadata.get(schemaMetadata));
    }

    /**
     * Tries to look up schema metadata associated with the given {@link AmpelEvent} eventType.
     *
     * @param eventType {@link AmpelEvent} eventType.
     * @return The {@link AmpelEventSchemaInformation} if there is any.
     */
    Optional<AmpelEventSchemaInformationMetadata> lookupEventSchemaMetadata(Class<? extends AmpelEvent> eventType) {
        requireNonNull(eventType, "event eventType must not be null");

        return Optional.ofNullable(MetadataByType.get(eventType));
    }
}
