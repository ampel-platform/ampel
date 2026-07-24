package eu.ampel_platform.scoring_service.score.use_case.detail.api.http;

import eu.ampel_platform.scoring_service.score.common.persistence.LaboratoryScoreEntity;
import eu.ampel_platform.scoring_service.score.common.persistence.Score;
import eu.ampel_platform.scoring_service.score.use_case.detail.ScoringSystemLaboratoryScores;
import eu.ampel_platform.scoring_service.score.use_case.detail.api.http.dto.AmpelScoreResponsePart;
import eu.ampel_platform.scoring_service.score.use_case.detail.api.http.dto.LaboratoryScoreDetailResponse;
import eu.ampel_platform.scoring_service.score.use_case.detail.api.http.dto.LaboratoryScoreResponsePart;
import eu.ampel_platform.scoring_service.score.use_case.detail.api.http.dto.ScoringSystemLaboratoryScoresResponsePart;

import java.util.List;

/**
 * Utility for converting between API-level DTOs and internal models.
 *
 * @since 1.0.0
 */
final class DtoMapper {

    private DtoMapper() {
    }

    /**
     * Converts the internal model into an HTTP response object that holds laboratory scores.
     *
     * @param scoresByScoringSystem laboratory scores grouped by scoring systems
     * @param medicalCaseId         identifies the medical case associated with the laboratory scores
     * @return HTTP response object with all laboratory scores within a medical case.
     */
    static LaboratoryScoreDetailResponse mapToDto(List<ScoringSystemLaboratoryScores> scoresByScoringSystem,
                                                  String medicalCaseId) {
        return new LaboratoryScoreDetailResponse(
                medicalCaseId,
                mapScoresByScoringSystemToDto(scoresByScoringSystem));
    }

    private static List<ScoringSystemLaboratoryScoresResponsePart> mapScoresByScoringSystemToDto(
            List<ScoringSystemLaboratoryScores> scoresByScoringSystem) {
        return scoresByScoringSystem.stream()
                .map(s -> new ScoringSystemLaboratoryScoresResponsePart(
                        s.scoringSystemName(),
                        s.scoringSystemVersion(),
                        mapScoresToDto(s.scores())))
                .toList();
    }

    private static List<LaboratoryScoreResponsePart> mapScoresToDto(
            List<LaboratoryScoreEntity> scores) {
        return scores.stream()
                .map(s -> new LaboratoryScoreResponsePart(
                        mapScoreToDto(s.getScore()),
                        s.getScoringSystemSeverityCode(),
                        s.getAnalyteName(),
                        s.getAnalyteValue(),
                        s.getAnalyteUnit(),
                        s.getAnalyteMeasuredAt(),
                        s.getScoreCalculatedAt()))
                .toList();
    }

    private static AmpelScoreResponsePart mapScoreToDto(Score score) {
        return switch (score) {
            case RED -> AmpelScoreResponsePart.RED;
            case YELLOW -> AmpelScoreResponsePart.YELLOW;
            case GREEN -> AmpelScoreResponsePart.GREEN;
        };
    }
}
