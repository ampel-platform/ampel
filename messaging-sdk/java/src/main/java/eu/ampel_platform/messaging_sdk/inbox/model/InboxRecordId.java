package eu.ampel_platform.messaging_sdk.inbox.model;

import org.jetbrains.annotations.NotNull;

/**
 * Describes the identifier of an {@link InboxRecord}.
 *
 * @param id value of the identifier
 * @since 2.0.0
 */
public record InboxRecordId(
        @NotNull String id
) {
    public InboxRecordId {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("inbox record id must not be null or blank");
        }
    }
}
