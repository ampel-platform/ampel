package eu.ampel_platform.scoring_service.score.common.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Meta;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository to store and retrieve {@link LaboratoryScoreEntity} information.
 *
 * @since 1.0.0
 */
@Repository
public interface LaboratoryScoreRepository extends JpaRepository<LaboratoryScoreEntity, String> {

    @Modifying
    @Meta(comment = "stores an entity within the database and ignores conflicts on the primary key making it a fit more idempotent message handling")
    @Query(value = """
            INSERT INTO laboratory_scores (
                score_id,
                scoring_system_name,
                scoring_system_version,
                medical_case_id,
                score,
                scoring_system_severity_code,
                analyte_name,
                analyte_value,
                analyte_unit,
                analyte_measured_at,
                score_calculated_at
            ) VALUES (
                :#{#laboratoryScore.getScoreId()},
                :#{#laboratoryScore.getScoringSystemName()},
                :#{#laboratoryScore.getScoringSystemVersion()},
                :#{#laboratoryScore.getMedicalCaseId()},
                :#{#laboratoryScore.getScore().name().toUpperCase()},
                :#{#laboratoryScore.getScoringSystemSeverityCode()},
                :#{#laboratoryScore.getAnalyteName()},
                :#{#laboratoryScore.getAnalyteValue()},
                :#{#laboratoryScore.getAnalyteUnit()},
                :#{#laboratoryScore.getAnalyteMeasuredAt()},
                :#{#laboratoryScore.getScoreCalculatedAt()}
            )
            ON CONFLICT (score_id) DO NOTHING;
            """, nativeQuery = true)
        // Unfortunately the custom converter is not being used here automatically. Thus, we're going to translate the
        // score ourselves (according to the converter logic).
    void saveIgnoreConflict(@Param("laboratoryScore") LaboratoryScoreEntity entity);

    /**
     * Finds all laboratory scores of all scoring systems within a medical case.
     *
     * @param medicalCaseId identifier of the medical case.
     * @return All scores within the medical case.
     */
    List<LaboratoryScoreEntity> findAllByMedicalCaseId(String medicalCaseId);
}
