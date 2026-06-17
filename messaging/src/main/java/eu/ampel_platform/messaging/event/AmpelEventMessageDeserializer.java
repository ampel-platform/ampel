package eu.ampel_platform.messaging.event;

/**
 * A deserializer capable of deserializing a byte stream into an {@link AmpelEventMessage}.
 *
 * @since 1.0.0
 */
public interface AmpelEventMessageDeserializer {

    /**
     * Deserializes the given byte stream into an {@link AmpelEventMessage}.
     *
     * @param serializedMessage The byte stream to deserialize.
     * @return The deserialized messages in the form of an {@link AmpelEventMessage}.
     * @throws AmpelEventMessageDeserializationException If the byte stream cannot get deserialized.
     */
    AmpelEventMessage deserialize(byte[] serializedMessage) throws AmpelEventMessageDeserializationException;
}
