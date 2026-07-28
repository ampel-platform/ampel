package eu.ampel_platform.scoring_service.score.use_case.aggregate.api.http;

import eu.ampel_platform.scoring_service.score.common.api.http.dto.AmpelScoreResponsePart;
import eu.ampel_platform.scoring_service.score.use_case.aggregate.LaboratoryScore;
import eu.ampel_platform.scoring_service.score.use_case.aggregate.api.http.dto.LaboratoryScoreAggregatedResponse;

/**
 * Utility for converting between API-level DTOs and internal models.
 *
 * @since 1.0.0
 */
final class DtoMapper {

    private DtoMapper() {
    }

    /**
     * Converts the internal model into an HTTP response object that holds a single aggregate for laboratory scores.
     *
     * @param score the aggregated score.
     * @return HTTP response object.
     */
    static LaboratoryScoreAggregatedResponse mapToDto(LaboratoryScore score, String medicalCaseId) {
        var mappedScore = switch (score) {
            case LaboratoryScore.NONE -> AmpelScoreResponsePart.NONE;
            case LaboratoryScore.GREEN -> AmpelScoreResponsePart.GREEN;
            case LaboratoryScore.YELLOW -> AmpelScoreResponsePart.YELLOW;
            case LaboratoryScore.RED -> AmpelScoreResponsePart.RED;
        };

        return new LaboratoryScoreAggregatedResponse(medicalCaseId, mappedScore);
    }
}
