package eu.ampel_platform.scoring_service.score.common.persistence;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * Converter for translating a {@link Score} between the application and the storage solution.
 *
 * @since 2.0.0
 */
@Converter(autoApply = true)
public final class ScoreConverter implements AttributeConverter<Score, String> {
    @Override
    public String convertToDatabaseColumn(Score attribute) {
        return attribute.name().toUpperCase();
    }

    @Override
    public Score convertToEntityAttribute(String dbData) {
        for (Score score : Score.values()) {
            if (score.name().equalsIgnoreCase(dbData)) {
                return score;
            }
        }
        return null;
    }
}
