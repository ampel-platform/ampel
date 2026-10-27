package eu.ampel_platform.metainformation_service.metainformation.patient.api.http.types;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Describes possible values of a patient's sex.
 *
 * @since 1.0.0
 */
public enum PatientMetainformationSexResource {
    @JsonProperty("male")
    MALE,

    @JsonProperty("female")
    FEMALE,

    @JsonProperty("unknown")
    UNKNOWN;
}
