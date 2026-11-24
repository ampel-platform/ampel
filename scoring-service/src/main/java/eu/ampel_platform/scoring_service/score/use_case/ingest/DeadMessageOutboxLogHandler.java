package eu.ampel_platform.scoring_service.score.use_case.ingest;

import io.namastack.outbox.handler.OutboxRecordMetadata;
import io.namastack.outbox.handler.OutboxTypedHandler;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

import static java.util.Objects.requireNonNull;

/**
 * A component that automatically gets hooked up and registered with Namastack Outbox.
 * This is simply going to log any {@link DeadMessage}s that are published to the outbox table. Messages are getting
 * logged in their serialized format (JSON).
 *
 * @since 2.0.0
 */
@Component
public final class DeadMessageOutboxLogHandler implements OutboxTypedHandler<DeadMessage> {

    private static final Logger LOGGER = LoggerFactory.getLogger(DeadMessageOutboxLogHandler.class);
    private final ObjectMapper jsonSerializer;

    public DeadMessageOutboxLogHandler(ObjectMapper jsonSerializer) {
        this.jsonSerializer = requireNonNull(jsonSerializer, "JSON serializer must not be null");
    }

    @Override
    public void handle(DeadMessage deadMessage, @NonNull OutboxRecordMetadata outboxRecordMetadata) {
        try {
            LOGGER.warn("registered dead message: {}", jsonSerializer.writeValueAsString(deadMessage));
        } catch (JacksonException e) {
            LOGGER.warn("could not serialize dead message for logging", e);
        }
    }
}
