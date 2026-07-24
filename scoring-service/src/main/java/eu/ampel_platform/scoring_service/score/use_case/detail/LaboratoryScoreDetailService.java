package eu.ampel_platform.scoring_service.score.use_case.detail;

import java.util.List;

/**
 * Describes a service for dealing with detailed laboratory scores.
 *
 * @since 1.0.0
 */
public interface LaboratoryScoreDetailService {

    /**
     * Retrieves all laboratory scores within a medical case and groups them by scoring system.
     * The grouping key is based on a combination of a scoring system's name and version.
     *
     * @param medicalCaseId identifies the medical case.
     * @return All laboratory scores within a medical case.
     */
    List<ScoringSystemLaboratoryScores> getHistoricalLaboratoryScoresByScoringSystem(String medicalCaseId);
}
