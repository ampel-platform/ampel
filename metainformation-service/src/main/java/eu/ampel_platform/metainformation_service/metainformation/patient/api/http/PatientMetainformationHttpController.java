package eu.ampel_platform.metainformation_service.metainformation.patient.api.http;

import eu.ampel_platform.metainformation_service.metainformation.patient.PatientMetainformationService;
import eu.ampel_platform.metainformation_service.metainformation.patient.api.http.exceptions.MedicalCaseNotFoundException;
import eu.ampel_platform.metainformation_service.metainformation.patient.api.http.types.PatientMetainformationResource;
import eu.ampel_platform.metainformation_service.metainformation.patient.api.http.types.PatientMetainformationSexResource;
import eu.ampel_platform.metainformation_service.metainformation.patient.model.MedicalCaseId;
import eu.ampel_platform.metainformation_service.metainformation.patient.model.PatientMetainformation;
import eu.ampel_platform.metainformation_service.metainformation.patient.model.PatientName;
import eu.ampel_platform.metainformation_service.metainformation.patient.model.PatientSex;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.util.Objects.requireNonNull;

/**
 * HTTP controller for handling patient related metainformation within a medical case.
 *
 * @since 1.0.0
 */
@RestController
@RequestMapping("/medicalcases/{medicalCaseId}/metainformation/patient")
public class PatientMetainformationHttpController {

    private final PatientMetainformationService patientMetainformationService;

    public PatientMetainformationHttpController(@NotNull PatientMetainformationService patientMetainformationService) {
        this.patientMetainformationService = requireNonNull(patientMetainformationService,
                "patient metainformation service must not be null");
    }

    @GetMapping
    public ResponseEntity<PatientMetainformationResource> getPatientMetainformation(
            @PathVariable String medicalCaseId) {
        if (medicalCaseId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        var medCaseId = new MedicalCaseId(medicalCaseId);
        return patientMetainformationService.findPatientMetainformationByMedicalCaseId(
                        medCaseId)
                .map(pmi -> ResponseEntity.ok(
                        convertToResponseModel(pmi, medCaseId)))
                .orElseThrow(() -> new MedicalCaseNotFoundException(medCaseId));
    }

    private PatientMetainformationResource convertToResponseModel(
            @NotNull PatientMetainformation patientMetainformation,
            @NotNull MedicalCaseId medicalCaseId) {

        return new PatientMetainformationResource(
                patientMetainformation.getId().id(),
                medicalCaseId.id(),
                patientMetainformation.getName()
                        .map(PatientName::firstname)
                        .orElse(null),
                patientMetainformation.getName()
                        .map(PatientName::lastname)
                        .orElse(null),
                patientMetainformation.getDateOfBirth()
                        .orElse(null),
                convertToResponseModel(patientMetainformation.getSex()));
    }

    private PatientMetainformationSexResource convertToResponseModel(@NotNull PatientSex patientSex) {
        return switch (patientSex) {
            case FEMALE -> PatientMetainformationSexResource.FEMALE;
            case MALE -> PatientMetainformationSexResource.MALE;
            default -> PatientMetainformationSexResource.UNKNOWN;
        };
    }
}
