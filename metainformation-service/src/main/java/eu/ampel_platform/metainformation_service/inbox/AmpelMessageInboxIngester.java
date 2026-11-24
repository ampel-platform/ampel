package eu.ampel_platform.metainformation_service.inbox;

import com.google.protobuf.Message;
import eu.ampel_platform.messaging_sdk.AmpelEventReconstructionException;
import eu.ampel_platform.messaging_sdk.AmpelMessageFilter;
import eu.ampel_platform.messaging_sdk.AmpelMessageSerde;
import eu.ampel_platform.messaging_sdk.InvalidAmpelMessage;
import eu.ampel_platform.messaging_sdk.generated.AmpelMessage;
import eu.ampel_platform.messaging_sdk.inbox.Inbox;
import jakarta.transaction.Transactional;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.jetbrains.annotations.NotNull;
import org.jspecify.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.listener.BatchAcknowledgingMessageListener;
import org.springframework.kafka.support.Acknowledgment;

import java.util.List;

import static java.util.Objects.requireNonNull;

/**
 * A consumer for {@link AmpelMessage}s that are being read from Kafka and handed over to an inbox for deferred
 * processing.
 * Messages are both, read from and acknowledged to Kafka in batches.
 *
 * @since 2.0.0
 */
public class AmpelMessageInboxIngester implements BatchAcknowledgingMessageListener<String, byte[]> {

    private static final Logger LOGGER = LoggerFactory.getLogger(AmpelMessageInboxIngester.class);

    private final AmpelMessageSerde messageSerde;
    private final AmpelMessageFilter messageTypeFilter;
    private final Inbox inbox;

    public AmpelMessageInboxIngester(@NotNull AmpelMessageSerde messageSerde,
                                     @NotNull AmpelMessageFilter messageTypeFilter,
                                     @NotNull Inbox inbox) {
        this.messageSerde = requireNonNull(messageSerde, "message serde must not be null");
        this.messageTypeFilter = requireNonNull(messageTypeFilter, "message type filter must not be null");
        this.inbox = requireNonNull(inbox, "inbox must not be null");
    }

    @Transactional
    @Override
    public void onMessage(List<ConsumerRecord<String, byte[]>> data, @Nullable Acknowledgment acknowledgment) {
        if (data.isEmpty()) {
            return;
        }
        LOGGER.debug("handling incoming message batch with #{} messages", data.size());

        var offset = -1;
        AmpelMessage message;
        for (ConsumerRecord<String, byte[]> record : data) {
            offset++;
            try {
                message = messageSerde.deserialize(record.value());
            } catch (InvalidAmpelMessage e) {
                // TODO: publish to DLQ here via an Outbox!
                LOGGER.error("something went wrong here", e);
                continue;
            }

            if (!messageTypeFilter.test(message)) {
                LOGGER.debug("message does not resemble an event that this service is interested in - thus, it will" +
                        " be dropped");
                continue;
            }

            Message event;
            try {
                event = messageSerde.unwrapEvent(message);
            } catch (AmpelEventReconstructionException e) {
                // TODO: publish to DLQ here via an Outbox!
                LOGGER.error("something went wrong here as well", e);
                continue;
            }

            inbox.store(
                    message.getEventId(),
                    message.getPartitioningKey(),
                    event
            );
        }

        acknowledgment.acknowledge(offset);
        LOGGER.info("ingested #{} messages", offset + 1);
    }
}
