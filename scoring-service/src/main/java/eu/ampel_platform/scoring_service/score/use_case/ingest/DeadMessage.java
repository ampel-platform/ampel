package eu.ampel_platform.scoring_service.score.use_case.ingest;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

/**
 * Simple container for capturing dead messages in their original format as well as metadata for it (exception messages,
 * failure time etc.)
 * A dead message is a message that could not be read / processed.
 *
 * @since 2.0.0
 */
public record DeadMessage(
        //@JsonProperty("id")
        UUID Id,

        //@JsonProperty("error-class")
        String errorClass,

        //@JsonProperty("error-message")
        String errorMessage,

        //@JsonProperty("error-timestamp")
        Instant errorTimestamp,

        //@JsonProperty("original-message")
        byte[] originalMessage,

        //@JsonProperty("original-metadata")
        Map<String, Object> originalMetadata
) {
}
