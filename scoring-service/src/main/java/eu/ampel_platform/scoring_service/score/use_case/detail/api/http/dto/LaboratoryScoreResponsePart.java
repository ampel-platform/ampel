package eu.ampel_platform.scoring_service.score.use_case.detail.api.http.dto;

import java.time.Instant;

/**
 * API-level representation of a laboratory score accompanied by information that led to this score.
 *
 * @param score                Ampel score
 * @param severity             scoring system specific severity code encoding an Ampel score
 * @param analyteName          analyte that triggered the score calculation
 * @param analyteValue         value of the analyte
 * @param analyteValueUnit     unit of the analyte
 * @param analyteMeasuringTime when the analyte was measured
 * @param resultCreationTime   when the score was calculated
 * @since 1.0.0
 */
public record LaboratoryScoreResponsePart(
        AmpelScoreResponsePart score,
        String severity,
        String analyteName,
        double analyteValue,
        String analyteValueUnit,
        Instant analyteMeasuringTime,
        Instant resultCreationTime
) {
}
