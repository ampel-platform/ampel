package eu.ampel_platform.scoring_service.score.use_case.aggregate;

import eu.ampel_platform.scoring_service.score.common.persistence.LaboratoryScoreEntity;
import eu.ampel_platform.scoring_service.score.common.persistence.LaboratoryScoreRepository;
import eu.ampel_platform.scoring_service.score.common.persistence.Score;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Stream;

import static java.util.Objects.requireNonNull;

/**
 * A {@link LaboratoryScoreAggregateService} that deals with laboratory scores.
 * It deals with them directly via a repository without a dedicated domain layer in between.
 *
 * @since 1.0.0
 */
@Service
public final class LaboratoryScoreAggregateServiceImpl implements LaboratoryScoreAggregateService {

    private final LaboratoryScoreRepository repo;

    public LaboratoryScoreAggregateServiceImpl(LaboratoryScoreRepository repo) {
        this.repo = requireNonNull(repo, "laboratory score repository must not be null");
    }

    @Override
    public LaboratoryScore getAggregatedLaboratoryScore(String medicalCase) {
        var laboratoryScoresInMedicalCase = repo.findAllByMedicalCaseId(medicalCase);

        var latestScoresInScoringSystems = getLatestScoresInScoringSystems(laboratoryScoresInMedicalCase);
        return getHighestRankedLaboratoryScore(latestScoresInScoringSystems);
    }

    private List<LaboratoryScore> getLatestScoresInScoringSystems(
            List<LaboratoryScoreEntity> scores) {

        var latestScoreByScoringSystem = new HashMap<ScoringSystemKey, LaboratoryScoreEntity>();
        for (LaboratoryScoreEntity score : scores) {
            var scoringSystemKey = new ScoringSystemKey(
                    score.getScoringSystemName(),
                    score.getScoringSystemVersion());

            if (latestScoreByScoringSystem.containsKey(scoringSystemKey)
                    && latestScoreByScoringSystem.get(scoringSystemKey)
                    .getScoreCalculatedAt().isAfter(score.getScoreCalculatedAt())) {
                continue;
            }
            latestScoreByScoringSystem.put(scoringSystemKey, score);
        }

        return latestScoreByScoringSystem.values()
                .stream()
                .map(score -> switch (score.getScore()) {
                    case RED -> LaboratoryScore.RED;
                    case YELLOW -> LaboratoryScore.YELLOW;
                    case Score.GREEN -> LaboratoryScore.GREEN;
                })
                .toList();
    }

    private LaboratoryScore getHighestRankedLaboratoryScore(List<LaboratoryScore> scores) {
        var scoresWithLowestRankStream = Stream.concat(Stream.of(LaboratoryScore.NONE), scores.stream());

        return scoresWithLowestRankStream
                .max(Comparator.comparingInt(LaboratoryScore::getSeverity))
                .orElse(LaboratoryScore.NONE);
    }

    private record ScoringSystemKey(
            String scoringSystemName,
            String scoringSystemVersion
    ) {
    }
}
