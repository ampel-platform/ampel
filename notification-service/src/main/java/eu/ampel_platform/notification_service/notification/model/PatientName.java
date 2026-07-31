package eu.ampel_platform.notification_service.notification.model;

/**
 * Describes a patient's full name.
 *
 * @param firstname patient's firstname
 * @param lastname  patient's lastname
 * @since 1.0.0
 */
public record PatientName(String firstname, String lastname) {
}
