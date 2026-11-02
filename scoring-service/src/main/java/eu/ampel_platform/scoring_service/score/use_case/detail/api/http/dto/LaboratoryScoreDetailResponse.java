package eu.ampel_platform.scoring_service.score.use_case.detail.api.http.dto;

import java.util.List;

/**
 * Response resource that encapsulates all laboratory scores within a medical case.
 *
 * @param medicalCaseId  identifies the medical case.
 * @param scoringSystems laboratory scores within the medical case grouped by scoring system.
 * @since 1.0.0
 */
public record LaboratoryScoreDetailResponse(
        String medicalCaseId,
        List<ScoringSystemLaboratoryScoresResponsePart> scoringSystems
) {
}
