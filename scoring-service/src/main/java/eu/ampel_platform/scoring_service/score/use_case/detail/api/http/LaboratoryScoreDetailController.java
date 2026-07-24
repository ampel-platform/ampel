package eu.ampel_platform.scoring_service.score.use_case.detail.api.http;

import eu.ampel_platform.scoring_service.score.use_case.detail.LaboratoryScoreDetailService;
import eu.ampel_platform.scoring_service.score.use_case.detail.api.http.dto.LaboratoryScoreDetailResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.util.Objects.requireNonNull;

/**
 * HTTP controller for accessing laboratory scores in a detailed way. This includes all historical scores as well as the
 * current ones.
 *
 * @since 1.0.0
 */
@RestController
@RequestMapping("/medicalcases/{medicalCaseId}/scores")
public final class LaboratoryScoreDetailController {

    private final LaboratoryScoreDetailService svc;

    public LaboratoryScoreDetailController(LaboratoryScoreDetailService svc) {
        this.svc = requireNonNull(svc, "laboratory score detail service must not be null");
    }

    /**
     * Get all laboratory scores within a specific medical case grouped by scoring system.
     *
     * @param medicalCaseId identifies the medical case.
     * @return All laboratory scores within a specific medical case if there are any.
     */
    @GetMapping("/history")
    public ResponseEntity<LaboratoryScoreDetailResponse> getDetailedLaboratoryScoresInMedicalCase(
            @PathVariable("medicalCaseId") String medicalCaseId) {
        var historicalLaboratoryScores = svc.getHistoricalLaboratoryScoresByScoringSystem(medicalCaseId);
        return ResponseEntity.ok(DtoMapper.mapToDto(historicalLaboratoryScores, medicalCaseId));
    }
}
