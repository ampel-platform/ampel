package eu.ampel_platform.scoring_service.score.use_case.aggregate;

/**
 * Describes a service for dealing with aggregated laboratory scores.
 *
 * @since 2.0.0
 */
public interface LaboratoryScoreAggregateService {

    /**
     * Retrieves a single score representing the aggregate of all laboratory scores within a medical case.
     *
     * @param medicalCase identifies the medical case.
     * @return An aggregate of all laboratory scores.
     */
    LaboratoryScore getAggregatedLaboratoryScore(String medicalCase);
}
