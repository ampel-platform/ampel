package eu.ampel_platform.messaging.event;

import static java.util.Objects.requireNonNull;

/**
 * Internal representation of information collected from types annotated with {@link AmpelEventSchema}.
 * </p>
 * This is considered type hint data and is used for serialization and deserialization purposes.
 *
 * @param metadata  Metadata of the schema.
 * @param eventType Associated {@link AmpelEvent} type.
 */
record AmpelEventSchemaInformation(
        AmpelEventSchemaInformationMetadata metadata,
        Class<? extends AmpelEvent> eventType
) {
    AmpelEventSchemaInformation {
        requireNonNull(metadata, "metadata must not be null");
        requireNonNull(eventType, "event type must not be null");
    }
}
