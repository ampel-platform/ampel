package eu.ampel_platform.scoring_service.score.use_case.ingest;

import eu.ampel_platform.messaging_sdk.*;
import eu.ampel_platform.messaging_sdk.generated.AmpelLaboratoryScoreCalculatedEvent;
import eu.ampel_platform.messaging_sdk.generated.AmpelMessage;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.listener.BatchAcknowledgingMessageListener;
import org.springframework.kafka.support.Acknowledgment;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static java.util.Objects.requireNonNull;

/**
 * Listener for serialized {@link com.google.protobuf.Message}s. Messages are processed in batches and also acknowledged
 * as such. This listener only handles {@link AmpelLaboratoryScoreCalculatedEvent}s and drops all other messages.
 *
 * @since 1.0.0
 */
final class AmpelLaboratoryScoreCalculatedEventListener implements BatchAcknowledgingMessageListener<String, byte[]> {

    private static final Logger LOGGER = LoggerFactory.getLogger(AmpelLaboratoryScoreCalculatedEventListener.class);

    private final AmpelMessageSerde messageSerde;
    private final LaboratoryScoreIngestionService laboratoryScoreIngestionService;
    private final AmpelMessageFilter eventTypeFilter;

    AmpelLaboratoryScoreCalculatedEventListener(
            AmpelMessageSerde messageSerde,
            LaboratoryScoreIngestionService laboratoryScoreIngestionService) {
        this.messageSerde = requireNonNull(messageSerde, "message serde must not be null");
        this.laboratoryScoreIngestionService = requireNonNull(laboratoryScoreIngestionService,
                "laboratory score ingestion service must not be null");

        eventTypeFilter = AmpelMessageFilterFactory.createEventTypeFilter(
                List.of(AmpelLaboratoryScoreCalculatedEvent.getDescriptor()));
    }

    /**
     * Handles incoming serialized {@link com.google.protobuf.Message}s. Its deserializing them and filters for only
     * messages that resemble a {@link AmpelLaboratoryScoreCalculatedEvent}.
     * Errors in deserialization do not bubble up but are instead treated by downstream services ensuring that these
     * messages are stored in a DLQ.
     *
     * @param data           the data to be processed.
     * @param acknowledgment the acknowledgment.
     */
    @Override
    public void onMessage(@NonNull List<ConsumerRecord<String, byte[]>> data,
                          @Nullable Acknowledgment acknowledgment) {
        if (data.isEmpty()) {
            return;
        }
        LOGGER.debug("handling incoming message batch with #{} messages", data.size());

        var messageBatch = readMessageBatch(data);
        laboratoryScoreIngestionService.handleLaboratoryScoreCalculatedMessages(
                messageBatch.messages(),
                messageBatch.unserializableMessages());

        acknowledgment.acknowledge(messageBatch.latestOffsetIndex());
    }

    private MessageBatch readMessageBatch(List<ConsumerRecord<String, byte[]>> data) {
        var deserializedMessages = new ArrayList<AmpelLaboratoryScoreCalculatedEvent>();
        var unserializableMessages = new ArrayList<DeadMessage>();
        int offsetIndex = -1;

        for (ConsumerRecord<String, byte[]> record : data) {
            offsetIndex++;

            AmpelMessage message;
            try {
                message = messageSerde.deserialize(record.value());
            } catch (InvalidAmpelMessage e) {
                LOGGER.warn("failed deserializing incoming message - will be moved to DLQ", e);
                unserializableMessages.add(
                        new DeadMessage(
                                UUID.randomUUID(),
                                e.getClass().getCanonicalName(),
                                e.getMessage(),
                                Instant.now(),
                                record.value(),
                                Map.of()));
                continue;
            }

            // Filtering here in order to limit unnecessary unwraps which will use up resources.
            if (!eventTypeFilter.test(message)) {
                LOGGER.debug("message does not seem to wrap a laboratory score calculation event - it will be dropped");
                continue;
            }

            try {
                deserializedMessages.add((AmpelLaboratoryScoreCalculatedEvent) messageSerde.unwrapEvent(message));
            } catch (AmpelEventReconstructionException e) {
                LOGGER.warn("failed unwrapping Ampel event from message - will be moved to DLQ", e);
                unserializableMessages.add(
                        new DeadMessage(
                                UUID.randomUUID(),
                                e.getClass().getCanonicalName(),
                                e.getMessage(),
                                Instant.now(),
                                record.value(),
                                Map.of(
                                        "event-id", message.getEventId(),
                                        "event-type", message.getEventType(),
                                        "event-time", Instant.ofEpochSecond(
                                                message.getTimestamp().getSeconds(),
                                                message.getTimestamp().getNanos()),
                                        "partitioning-key", message.getPartitioningKey(),
                                        "emitter", message.getEmitter())));
            }
        }

        return new MessageBatch(
                deserializedMessages,
                unserializableMessages,
                offsetIndex);
    }
}
