package eu.ampel_platform.scoring_service.score.use_case.ingest;

import eu.ampel_platform.messaging_sdk.generated.AmpelLaboratoryScoreCalculatedEvent;

import java.util.List;

/**
 * A service for ingesting {@link AmpelLaboratoryScoreCalculatedEvent} messages into the system.
 *
 * @since 2.0.0
 */
public interface LaboratoryScoreIngestionService {

    /**
     * Ingests a collection of {@link AmpelLaboratoryScoreCalculatedEvent} into the system. It also ingests messages
     * that could not be read for deferred processing.
     *
     * @param messages     Messages carrying laboratory related scores.
     * @param deadMessages Messages that could not be read.
     */
    void handleLaboratoryScoreCalculatedMessages(List<AmpelLaboratoryScoreCalculatedEvent> messages,
                                                 List<DeadMessage> deadMessages);
}
