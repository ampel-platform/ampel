package eu.ampel_platform.metainformation_service.metainformation.patient;

import eu.ampel_platform.metainformation_service.metainformation.patient.model.MedicalCaseId;
import eu.ampel_platform.metainformation_service.metainformation.patient.model.PatientId;
import eu.ampel_platform.metainformation_service.metainformation.patient.model.PatientMetainformation;
import org.jetbrains.annotations.NotNull;

import java.util.Optional;

/**
 * Describes a component for handling patient's metainformation.
 *
 * @since 2.0.0
 */
public interface PatientMetainformationService {

    /**
     * Inserts the given patient metainformation or updates an existing record. In the latter case a record gets
     * identified by {@link PatientId} as being part of the given metainformation.
     *
     * @param patientMetainformation a patient's metainformation.
     */
    void upsertPatientMetainformation(@NotNull PatientMetainformation patientMetainformation);

    /**
     * Deletes a patient's metainformation identified by the given {@link PatientId}.
     *
     * @param patientId identifies the patient.
     */
    void deletePatientMetainformation(@NotNull PatientId patientId);

    /**
     * Tries to find a patient's metainformation based on the medical case associated with it.
     *
     * @param medicalCaseId identifies the medical case.
     * @return The patient's metainformation if there is any.
     */
    Optional<PatientMetainformation> findPatientMetainformationByMedicalCaseId(@NotNull MedicalCaseId medicalCaseId);

    /**
     * Tries to find a patient's metainformation identified by the given {@link PatientId}.
     *
     * @param patientId identifies the patient.
     * @return The patient's metainformation if there is any.
     */
    Optional<PatientMetainformation> findPatientMetainformationById(@NotNull PatientId patientId);
}
