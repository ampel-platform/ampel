package eu.ampel_platform.messaging.event;

import static java.util.Objects.requireNonNull;

/**
 * Metadata of an Ampel event schema.
 *
 * @param name    the schema's name
 * @param version the schema's version
 */
record AmpelEventSchemaInformationMetadata(
        String name,
        int version
) {
    AmpelEventSchemaInformationMetadata {
        requireNonNull(name, "schema name must not be null");
        if (name.isBlank()) {
            throw new IllegalArgumentException("schema name must not be blank");
        }

        if (version <= 0) {
            throw new IllegalArgumentException("version has to be positive");
        }
    }
}
