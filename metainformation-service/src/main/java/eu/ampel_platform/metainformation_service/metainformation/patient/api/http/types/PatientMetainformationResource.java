package eu.ampel_platform.metainformation_service.metainformation.patient.api.http.types;

import java.time.LocalDate;

/**
 * Simple data container for responding to HTTP requests related to patient metainformation.
 *
 * @param id          identifies the patient.
 * @param firstname   the patient's firstname (optional).
 * @param lastname    the patient's lastname (optional).
 * @param dateOfBirth the patient's date of birth (optional).
 * @param sex         the patient's sex.
 * @since 1.0.0
 */
public record PatientMetainformationResource(
        String id,
        String firstname,
        String lastname,
        LocalDate dateOfBirth,
        PatientMetainformationSexResource sex
) {
}
