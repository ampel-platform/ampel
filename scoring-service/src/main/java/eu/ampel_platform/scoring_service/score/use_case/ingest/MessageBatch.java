package eu.ampel_platform.scoring_service.score.use_case.ingest;

import eu.ampel_platform.messaging_sdk.generated.AmpelLaboratoryScoreCalculatedEvent;

import java.util.List;

import static java.util.Objects.requireNonNull;

/**
 * Internal container for a batch of messages read from Kafka.
 * This container is immutable.
 *
 * @param messages               Messages that were read successfully.
 * @param unserializableMessages Messages that could not be read.
 * @param latestOffsetIndex      Offset to be committed to Kafka to clear all messages within this batch.
 * @since 2.0.0
 */
record MessageBatch(
        List<AmpelLaboratoryScoreCalculatedEvent> messages,
        List<DeadMessage> unserializableMessages,
        int latestOffsetIndex
) {
    MessageBatch {
        requireNonNull(messages, "messages must not be null");
        requireNonNull(unserializableMessages, "unserializable messages must not be null");

        if (latestOffsetIndex < 0) {
            throw new IllegalArgumentException("offset must not be negative");
        }
    }

    @Override
    public List<AmpelLaboratoryScoreCalculatedEvent> messages() {
        return List.copyOf(messages);
    }

    @Override
    public List<DeadMessage> unserializableMessages() {
        return List.copyOf(unserializableMessages);
    }
}
