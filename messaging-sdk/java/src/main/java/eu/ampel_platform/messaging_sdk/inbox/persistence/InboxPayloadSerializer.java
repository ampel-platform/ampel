package eu.ampel_platform.messaging_sdk.inbox.persistence;

import com.google.protobuf.Message;

/**
 * Describes a serializer for {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord} message payloads.
 *
 * @since 1.0.0
 */
public interface InboxPayloadSerializer {

    /**
     * Serializes a {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord}'s payload.
     *
     * @param message the payload
     * @return The payload as bytes.
     */
    byte[] serialize(final Message message);

    /**
     * Deserializes a {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord}'s payload from bytes using a type
     * hint.
     *
     * @param data the payload as bytes
     * @param type type that the payload represents
     * @param <T>  Payload type.
     * @return The deserialized payload in the given type.
     */
    <T> Message deserialize(final byte[] data, Class<T> type);
}
