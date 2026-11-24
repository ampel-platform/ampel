package eu.ampel_platform.scoring_service.score.use_case.aggregate;

/**
 * A dedicated model for aggregation purposes. It maps a score to a severity making it possible to compare two scores
 * against each other.
 *
 * @since 2.0.0
 */
public enum LaboratoryScore {
    NONE(0),
    GREEN(1),
    YELLOW(2),
    RED(3);

    private final Integer severity;

    LaboratoryScore(Integer severity) {
        this.severity = severity;
    }

    public int getSeverity() {
        return severity;
    }
}
