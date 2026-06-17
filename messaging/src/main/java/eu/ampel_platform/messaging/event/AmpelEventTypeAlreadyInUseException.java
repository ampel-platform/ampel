package eu.ampel_platform.messaging.event;

/**
 * Denotes an error stating that an {@link AmpelEvent} is already in use and cannot be repurposed.
 */
final class AmpelEventTypeAlreadyInUseException extends Exception {
    public AmpelEventTypeAlreadyInUseException(AmpelEventSchemaInformationMetadata schemaMetadata,
                                               Class<? extends AmpelEvent> eventType) {
        super("event eventType '%s' is already in use for schema '%s' in version '%d'"
                .formatted(
                        eventType.getName(),
                        schemaMetadata.name(),
                        schemaMetadata.version()));
    }
}
