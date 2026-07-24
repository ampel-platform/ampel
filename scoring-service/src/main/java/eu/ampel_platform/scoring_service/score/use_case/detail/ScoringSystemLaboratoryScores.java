package eu.ampel_platform.scoring_service.score.use_case.detail;

import eu.ampel_platform.scoring_service.score.common.persistence.LaboratoryScoreEntity;

import java.util.List;

/**
 * Container for laboratory scores.
 *
 * @param scoringSystemName    name of the associated scoring system
 * @param scoringSystemVersion version of the associated scoring system
 * @param scores               actual laboratory scores
 * @since 1.0.0
 */
public record ScoringSystemLaboratoryScores(
        String scoringSystemName,
        String scoringSystemVersion,
        List<LaboratoryScoreEntity> scores
) {
}
