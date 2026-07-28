package eu.ampel_platform.scoring_service.score.common.persistence;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

/**
 * Simple internal entity for interacting with storage solutions.
 * It resembles a laboratory related score.
 *
 * @since 1.0.0
 */
@Entity
@Table(name = "laboratory_scores")
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class LaboratoryScoreEntity {
    @Id
    private String scoreId;

    @Column(name = "scoring_system_name")
    private String scoringSystemName;

    @Column(name = "scoring_system_version")
    private String scoringSystemVersion;

    @Column(name = "medical_case_id")
    private String medicalCaseId;

    @Column(name = "score")
    @Convert(converter = ScoreConverter.class)
    private Score score;

    @Column(name = "scoring_system_severity_code")
    private String scoringSystemSeverityCode;

    @Column(name = "analyte_name")
    private String analyteName;

    @Column(name = "analyte_value")
    private double analyteValue;

    @Column(name = "analyte_unit")
    private String analyteUnit;

    @Column(name = "analyte_measured_at")
    private Instant analyteMeasuredAt;

    @Column(name = "score_calculated_at")
    private Instant scoreCalculatedAt;
}
