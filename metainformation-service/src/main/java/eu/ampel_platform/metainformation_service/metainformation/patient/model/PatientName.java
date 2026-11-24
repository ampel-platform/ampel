package eu.ampel_platform.metainformation_service.metainformation.patient.model;

/**
 * Describes a patient's full name.
 *
 * @param firstname patient's firstname
 * @param lastname  patient's lastname
 * @since 2.0.0
 */
public record PatientName(String firstname, String lastname) {
}
