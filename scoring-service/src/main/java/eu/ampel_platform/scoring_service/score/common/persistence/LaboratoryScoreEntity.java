package eu.ampel_platform.scoring_service.score.common.persistence;

import jakarta.persistence.*;

import java.time.Instant;

/**
 * Simple internal entity for interacting with storage solutions.
 * It resembles a laboratory related score.
 *
 * @param scoreId
 * @param scoringSystemName
 * @param scoringSystemVersion
 * @param medicalCaseId
 * @param score
 * @param scoringSystemSeverityCode
 * @param analyteName
 * @param analyteValue
 * @param analyteUnit
 * @param analyteMeasuredAt
 * @param scoreCalculatedAt
 * @since 1.0.0
 */
@Entity
@Table(name = "laboratory_scores")
public record LaboratoryScoreEntity(
        @Id
        String scoreId,

        @Column(name = "scoring_system_name")
        String scoringSystemName,

        @Column(name = "scoring_system_version")
        String scoringSystemVersion,

        @Column(name = "medical_case_id")
        String medicalCaseId,

        @Column(name = "score")
        @Convert(converter = ScoreConverter.class)
        Score score,

        @Column(name = "scoring_system_severity_code")
        String scoringSystemSeverityCode,

        @Column(name = "analyte_name")
        String analyteName,

        @Column(name = "analyte_value")
        double analyteValue,

        @Column(name = "analyte_unit")
        String analyteUnit,

        @Column(name = "analyte_measured_at")
        Instant analyteMeasuredAt,

        @Column(name = "score_calculated_at")
        Instant scoreCalculatedAt
) {
}
