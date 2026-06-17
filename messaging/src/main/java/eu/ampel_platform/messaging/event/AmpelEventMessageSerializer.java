package eu.ampel_platform.messaging.event;

/**
 * A serializer capable of serializing a {@link AmpelEventMessage} into a byte stream.
 *
 * @since 1.0.0
 */
public interface AmpelEventMessageSerializer {

    /**
     * Serializes the given {@link AmpelEventMessage} into a byte stream.
     *
     * @param message The message to serialize.
     * @return The serialized message as a byte stream.
     * @throws AmpelEventMessageSerializationException If the message cannot get serialized.
     */
    byte[] serialize(AmpelEventMessage message) throws AmpelEventMessageSerializationException;
}
