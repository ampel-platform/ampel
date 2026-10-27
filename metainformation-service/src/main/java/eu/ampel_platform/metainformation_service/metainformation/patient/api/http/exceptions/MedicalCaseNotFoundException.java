package eu.ampel_platform.metainformation_service.metainformation.patient.api.http.exceptions;

import eu.ampel_platform.metainformation_service.metainformation.patient.model.MedicalCaseId;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Indicates that no record was found based on a medical case ID.
 *
 * @since 1.0.0
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class MedicalCaseNotFoundException extends RuntimeException {
    public MedicalCaseNotFoundException(@NotNull MedicalCaseId medicalCaseId) {
        super("could not find a medical case with ID '%s'"
                .formatted(medicalCaseId.id()));
    }
}
