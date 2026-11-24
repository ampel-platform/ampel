package eu.ampel_platform.scoring_service.score.use_case.detail;

import eu.ampel_platform.scoring_service.score.common.persistence.LaboratoryScoreEntity;
import eu.ampel_platform.scoring_service.score.common.persistence.LaboratoryScoreRepository;
import org.springframework.stereotype.Service;

import java.util.*;

import static java.util.Objects.requireNonNull;

/**
 * A {@link LaboratoryScoreDetailService} that deals with laboratory scores.
 * It deals with them directly via a repository without a dedicated domain layer in between.
 *
 * @since 2.0.0
 */
@Service
public final class LaboratoryScoreDetailServiceImpl implements LaboratoryScoreDetailService {

    private final LaboratoryScoreRepository repo;

    public LaboratoryScoreDetailServiceImpl(LaboratoryScoreRepository repo) {
        this.repo = requireNonNull(repo, "laboratory score repository must not be null");
    }

    @Override
    public List<ScoringSystemLaboratoryScores> getHistoricalLaboratoryScoresByScoringSystem(String medicalCaseId) {
        var laboratoryScoresInMedicalCase = repo.findAllByMedicalCaseId(medicalCaseId);
        laboratoryScoresInMedicalCase.sort(
                Comparator.comparing(LaboratoryScoreEntity::getScoreCalculatedAt));

        var laboratoryScoresByScoringSystem = groupByScoringSystem(laboratoryScoresInMedicalCase);

        var scores = new ArrayList<ScoringSystemLaboratoryScores>();
        for (ScoringSystemKey scoringSystemKey : laboratoryScoresByScoringSystem.keySet()) {
            scores.add(new ScoringSystemLaboratoryScores(
                    scoringSystemKey.scoringSystemName(),
                    scoringSystemKey.scoringSystemVersion(),
                    laboratoryScoresByScoringSystem.get(scoringSystemKey)));
        }

        scores.sort(Comparator.comparing(ScoringSystemLaboratoryScores::scoringSystemName));
        return scores;
    }

    private Map<ScoringSystemKey, List<LaboratoryScoreEntity>> groupByScoringSystem(
            List<LaboratoryScoreEntity> laboratoryScores) {
        var laboratoryScoresByScoringSystem = new HashMap<ScoringSystemKey, List<LaboratoryScoreEntity>>();
        for (LaboratoryScoreEntity laboratoryScore : laboratoryScores) {
            var scoringSystemKey = new ScoringSystemKey(laboratoryScore.getScoringSystemName(),
                    laboratoryScore.getScoringSystemVersion());

            if (laboratoryScoresByScoringSystem.containsKey(scoringSystemKey)) {
                laboratoryScoresByScoringSystem.get(scoringSystemKey)
                        .add(laboratoryScore);
            } else {
                laboratoryScoresByScoringSystem.put(scoringSystemKey,
                        new ArrayList<>(List.of(laboratoryScore)));
            }
        }

        return laboratoryScoresByScoringSystem;
    }

    private record ScoringSystemKey(
            String scoringSystemName,
            String scoringSystemVersion
    ) {
    }
}
