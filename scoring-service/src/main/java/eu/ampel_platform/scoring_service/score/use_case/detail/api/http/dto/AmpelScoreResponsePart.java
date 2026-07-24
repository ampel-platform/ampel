package eu.ampel_platform.scoring_service.score.use_case.detail.api.http.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * API-level representation of a laboratory score.
 *
 * @since 1.0.0
 */
public enum AmpelScoreResponsePart {
    @JsonProperty("green")
    GREEN,

    @JsonProperty("yellow")
    YELLOW,

    @JsonProperty("red")
    RED
}
