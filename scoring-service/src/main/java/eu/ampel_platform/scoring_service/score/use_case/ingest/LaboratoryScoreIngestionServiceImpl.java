package eu.ampel_platform.scoring_service.score.use_case.ingest;

import com.google.protobuf.Timestamp;
import eu.ampel_platform.messaging_sdk.generated.AmpelLaboratoryScoreCalculatedEvent;
import eu.ampel_platform.messaging_sdk.generated.AmpelScore;
import eu.ampel_platform.scoring_service.score.common.persistence.LaboratoryScoreEntity;
import eu.ampel_platform.scoring_service.score.common.persistence.LaboratoryScoreRepository;
import eu.ampel_platform.scoring_service.score.common.persistence.Score;
import io.namastack.outbox.Outbox;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
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
@Qualifier("ingestion")
@Service
public class LaboratoryScoreIngestionServiceImpl implements LaboratoryScoreIngestionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(LaboratoryScoreIngestionServiceImpl.class);

    private static final String OUTBOX_PARTITIONING_KEY = "DLQ";

    private final LaboratoryScoreRepository laboratoryScoreRepository;
    private final Outbox outbox;

    LaboratoryScoreIngestionServiceImpl(LaboratoryScoreRepository laboratoryScoreRepository,
                                        Outbox outbox) {
        this.laboratoryScoreRepository = requireNonNull(laboratoryScoreRepository, "repository must not be null");
        this.outbox = requireNonNull(outbox, "outbox must not be null");
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
        if (!messages.isEmpty()) {
            for (AmpelLaboratoryScoreCalculatedEvent message : messages) {
                laboratoryScoreRepository.saveIgnoreConflict(convertToInternalModel(message));
            }
            LOGGER.info("ingested #{} laboratory score(s)", messages.size());
        }

        if (!deadMessages.isEmpty()) {
            for (DeadMessage deadMessage : deadMessages) {
                // We are reusing the same partitioning key for all dead messages so that their original influx ordering is
                // retained. This is important for subsequent investigations, retries or different DLQ handling strategies
                // alltogether.
                outbox.schedule(deadMessage, OUTBOX_PARTITIONING_KEY);
            }
            LOGGER.warn("sent #{} messages to DLQ", deadMessages.size());
        }
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
