package eu.ampel_platform.scoring_service.score.use_case.aggregate.api.http.dto;

import eu.ampel_platform.scoring_service.score.common.api.http.dto.AmpelScoreResponsePart;

/**
 * Response resource that encapsulates the aggregated score of all laboratory scores within a medical case.
 *
 * @param medicalCaseId identifies the medical case
 * @param score         the aggregated score
 * @since 1.0.0
 */
public record LaboratoryScoreAggregatedResponse(
        String medicalCaseId,
        AmpelScoreResponsePart score
) {
}
