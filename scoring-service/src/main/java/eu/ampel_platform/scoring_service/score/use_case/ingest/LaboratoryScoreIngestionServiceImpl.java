package eu.ampel_platform.scoring_service.score.use_case.ingest;

import com.google.protobuf.Timestamp;
import eu.ampel_platform.messaging_sdk.generated.AmpelLaboratoryScoreCalculatedEvent;
import eu.ampel_platform.messaging_sdk.generated.AmpelScore;
import eu.ampel_platform.scoring_service.score.common.persistence.LaboratoryScoreEntity;
import eu.ampel_platform.scoring_service.score.common.persistence.LaboratoryScoreRepository;
import eu.ampel_platform.scoring_service.score.common.persistence.Score;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

import static java.util.Objects.requireNonNull;

/**
 * A service for reliably ingesting messages carrying laboratory related scores, as well as dead messages into the
 * system.
 *
 * @since 1.0.0
 */
@Service
public class LaboratoryScoreIngestionServiceImpl implements LaboratoryScoreIngestionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(LaboratoryScoreIngestionServiceImpl.class);

    private final LaboratoryScoreRepository laboratoryScoreRepository;

    LaboratoryScoreIngestionServiceImpl(LaboratoryScoreRepository laboratoryScoreRepository) {
        this.laboratoryScoreRepository = requireNonNull(laboratoryScoreRepository, "repository must not be null");
    }

    /**
     * Ingests laboratory score related messages into the database. It does the same for messages that could not be
     * read. All of this is happening during the same transaction. Dead messages are being written to a dedicated
     * table where a downstream process picks them up and reliably publishes them to a DLQ topic in Kafka. This is done
     * using the outbox pattern.
     *
     * @param messages     Messages carrying laboratory related scores.
     * @param deadMessages Messages that could not be read.
     */
    @Transactional
    @Override
    public void handleLaboratoryScoreCalculatedMessages(
            List<AmpelLaboratoryScoreCalculatedEvent> messages,
            List<DeadMessage> deadMessages) {
        for (AmpelLaboratoryScoreCalculatedEvent message : messages) {
            laboratoryScoreRepository.saveIgnoreConflict(convertToInternalModel(message));
        }
        // TODO: write DLQ entries here (using outbox pattern)
        LOGGER.info("ingested #{} laboratory score(s)", messages.size());
    }

    private LaboratoryScoreEntity convertToInternalModel(AmpelLaboratoryScoreCalculatedEvent laboratoryScore) {
        return LaboratoryScoreEntity.builder()
                .scoreId(laboratoryScore.getScoreId())
                .scoringSystemName(laboratoryScore.getScoringSystemName())
                .scoringSystemVersion(laboratoryScore.getScoringSystemVersion())
                .medicalCaseId(laboratoryScore.getMedicalCaseId())
                .score(convertToInternalModel(laboratoryScore.getScore()))
                .scoringSystemSeverityCode(laboratoryScore.getScoringSystemSeverityCode())
                .analyteName(laboratoryScore.getAnalyteName())
                .analyteValue(laboratoryScore.getAnalyteValue())
                .analyteUnit(laboratoryScore.getAnalyteUnit())
                .analyteMeasuredAt(convertToInternalModel(laboratoryScore.getAnalyteMeasuredAt()))
                .scoreCalculatedAt(convertToInternalModel(laboratoryScore.getCalculatedAt()))
                .build();
    }

    private Score convertToInternalModel(AmpelScore ampelScore) {
        return switch (ampelScore) {
            case AmpelScore.AMPEL_GREEN, AmpelScore.UNRECOGNIZED -> Score.GREEN;
            case AmpelScore.AMPEL_YELLOW -> Score.YELLOW;
            case AmpelScore.AMPEL_RED -> Score.RED;
        };
    }

    private Instant convertToInternalModel(Timestamp timestamp) {
        return Instant.ofEpochSecond(timestamp.getSeconds(), timestamp.getNanos());
    }
}
