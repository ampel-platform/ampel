package eu.ampel_platform.notification_service.notification.model;

import java.time.LocalDate;
import java.util.Optional;

import static java.util.Objects.requireNonNull;

/**
 * Describes a patient's overall information necessary for notifications.
 * <p>
 * <b>Note:</b>
 * <i>
 * Some information are optional since they are not always at hand during emergency admissions. In these cases it's
 * important to simply register a patient within the system and fill out necessary information later on.
 * </i>
 * </p>
 *
 * @param patientId     a patient's identifier
 * @param patientName   (optional) a patient's full name
 * @param dateOfBirth   (optional) a patient's date of birth. It is ignored that patient's may have been born in other time zones.
 *                      The date of birth will always be referencing the time zone that the application runs in.
 * @param medicalCaseId (optional) a patient's medical case identifier
 * @since 1.0.0
 */
public record PatientInformation(
        PatientId patientId,
        PatientName patientName,
        LocalDate dateOfBirth,
        MedicalCaseId medicalCaseId
) {
    public PatientInformation {
        requireNonNull(patientId, "patient ID must not be null");
    }

    /**
     * Gets a patient's full name.
     *
     * @return The patient's full name if there is any.
     */
    public Optional<PatientName> getName() {
        return Optional.ofNullable(patientName);
    }

    /**
     * Gets the patient's date of birth.
     *
     * @return The patient's date of birth if there is any.
     */
    public Optional<LocalDate> getDateOfBirth() {
        return Optional.ofNullable(dateOfBirth);
    }

    /**
     * Gets the identifier of the medical case that the patient is associated with.
     *
     * @return The medical case identifier if there is any.
     */
    public Optional<MedicalCaseId> getMedicalCaseId() {
        return Optional.ofNullable(medicalCaseId);
    }
}
