package eu.ampel_platform.metainformation_service.metainformation.patient.model;

import static java.util.Objects.requireNonNull;

/**
 * Describes the identifier of a patient.
 *
 * @param id value of the identifier
 * @since 2.0.0
 */
public record PatientId(String id) {
    public PatientId {
        requireNonNull(id, "identifier must not be null");
        if (id.isBlank()) {
            throw new IllegalArgumentException("identifier must not be blank");
        }
    }
}
