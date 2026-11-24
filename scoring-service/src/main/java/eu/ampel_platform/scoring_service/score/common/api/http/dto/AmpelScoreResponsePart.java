package eu.ampel_platform.scoring_service.score.common.api.http.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * API-level representation of a laboratory score.
 *
 * @since 2.0.0
 */
public enum AmpelScoreResponsePart {
    @JsonProperty("green")
    GREEN,

    @JsonProperty("yellow")
    YELLOW,

    @JsonProperty("red")
    RED,

    @JsonProperty("none")
    NONE
}
