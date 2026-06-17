package eu.ampel_platform.messaging.event;

/**
 * Denotes an error stating that an {@link AmpelEventSchema} is already in use and cannot be repurposed.
 */
final class AmpelEventSchemaAlreadyInUseException extends Exception {
    public AmpelEventSchemaAlreadyInUseException(AmpelEventSchemaInformationMetadata schemaMetadata,
                                                 Class<? extends AmpelEvent> eventType) {
        super("schema '%s' in version '%d' is already in use for event eventType '%s'"
                .formatted(
                        schemaMetadata.name(),
                        schemaMetadata.version(),
                        eventType.getName()));
    }
}
