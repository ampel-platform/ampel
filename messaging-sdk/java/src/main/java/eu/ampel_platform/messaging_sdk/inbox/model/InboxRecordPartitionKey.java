package eu.ampel_platform.messaging_sdk.inbox.model;

import org.jetbrains.annotations.NotNull;

/**
 * Describes a value that can be used to partition multiple {@link InboxRecord}s when being processed in parallel.
 *
 * @param key value of the partition key
 * @since 2.0.0
 */
public record InboxRecordPartitionKey(
        @NotNull String key
) {
    public InboxRecordPartitionKey {
        if (key == null || key.isBlank()) {
            throw new IllegalArgumentException("partition key must not be blank or null");
        }
    }
}
