package eu.ampel_platform.scoring_service.score.use_case.detail.api.http.dto;

import java.util.List;

/**
 * API-level representation of laboratory scores within a specific scoring system.
 *
 * @param scoringSystemName    name of the scoring system
 * @param scoringSystemVersion version of the scoring system
 * @param scores               associated laboratory scores
 * @since 1.0.0
 */
public record ScoringSystemLaboratoryScoresResponsePart(
        String scoringSystemName,
        String scoringSystemVersion,
        List<LaboratoryScoreResponsePart> scores
) {
}
