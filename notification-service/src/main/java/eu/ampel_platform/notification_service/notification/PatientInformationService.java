package eu.ampel_platform.notification_service.notification;

import eu.ampel_platform.notification_service.notification.model.MedicalCaseId;
import eu.ampel_platform.notification_service.notification.model.PatientId;
import eu.ampel_platform.notification_service.notification.model.PatientInformation;

import java.util.Optional;

/**
 * Describes a component for handling patient information.
 *
 * @since 2.0.0
 */
public interface PatientInformationService {

    /**
     * Inserts the given patient information or updates an existing record. In the latter case a record gets identified
     * by {@link PatientId} as being part of the given information.
     *
     * @param patientInformation a patient's information.
     */
    void upsertPatientInformation(PatientInformation patientInformation);

    /**
     * Deletes information of a patient identified by the given {@link PatientId}.
     *
     * @param patientId identifies the patient information.
     */
    void deletePatientInformation(PatientId patientId);

    /**
     * Alters a patient's information by referencing the medical case that has been assigned to this patient.
     *
     * @param patientId     identifies the patient information.
     * @param medicalCaseId identifies the medical case that should be assigned.
     * @deprecated Will be removed in upcoming releases.
     */
    // TODO: move this to an aggregate - logic should not necessarily reside in the service layer!
    @Deprecated
    void assignMedicalCaseToPatient(PatientId patientId, MedicalCaseId medicalCaseId);

    /**
     * Looks up a patient's information based on the medical case associated with it.
     *
     * @param medicalCaseId identifies the medical case.
     * @return The patient information if there is any.
     */
    Optional<PatientInformation> lookupPatientInformation(MedicalCaseId medicalCaseId);
}
