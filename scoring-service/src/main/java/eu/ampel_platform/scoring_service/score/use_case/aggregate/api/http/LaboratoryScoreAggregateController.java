package eu.ampel_platform.scoring_service.score.use_case.aggregate.api.http;

import eu.ampel_platform.scoring_service.score.use_case.aggregate.LaboratoryScoreAggregateService;
import eu.ampel_platform.scoring_service.score.use_case.aggregate.api.http.dto.LaboratoryScoreAggregatedResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.util.Objects.requireNonNull;

/**
 * HTTP controller for accessing aggregated laboratory scores.
 *
 * @since 2.0.0
 */
@RestController
@RequestMapping("/medicalcases/{medicalCaseId}/scores")
public final class LaboratoryScoreAggregateController {

    private final LaboratoryScoreAggregateService svc;

    public LaboratoryScoreAggregateController(LaboratoryScoreAggregateService svc) {
        this.svc = requireNonNull(svc, "laboratory score aggregate service must not be null");
    }

    /**
     * Gets an aggregate of all laboratory scores within a specific medical case.
     *
     * @param medicalCaseId identifies the medical case.
     * @return An aggregate of all laboratory scores within the medical case.
     */
    @GetMapping("/aggregate")
    public ResponseEntity<LaboratoryScoreAggregatedResponse> getAggregatedAmpelScoreInMedicalCase(
            @PathVariable("medicalCaseId") String medicalCaseId) {
        var aggregatedLaboratoryScore = svc.getAggregatedLaboratoryScore(medicalCaseId);
        return ResponseEntity.ok(DtoMapper.mapToDto(aggregatedLaboratoryScore, medicalCaseId));
    }
}
