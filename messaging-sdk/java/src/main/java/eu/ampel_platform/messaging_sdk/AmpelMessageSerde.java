package eu.ampel_platform.messaging_sdk;

import com.google.protobuf.Any;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Message;
import com.google.protobuf.Timestamp;
import eu.ampel_platform.messaging_sdk.generated.AmpelMessage;

import java.time.Instant;
import java.util.UUID;

import static java.util.Objects.requireNonNull;

/**
 * Serialization and deserialization utility for Ampel events that should be sent over the wire in the form of
 * {@link AmpelMessage}s.
 * </p>
 * Wrapping events into a broader, more generic message format allows for better routing capabilities since consumers
 * do not need to deserialize the whole message but just its metadata. You can refer to an {@link AmpelMessage} also in
 * the sense of an envelope.
 *
 * @since 1.0.0
 */
public final class AmpelMessageSerde {

    private final String applicationIdentifier;
    private final AmpelEventTypeRegistry eventTypeRegistry;

    /**
     * Creates a new instance of this utility.
     *
     * @param applicationIdentifier Metadata used for wrapping Ampel events into {@link AmpelMessage}s in order to
     *                              specify who sent/emitted this event.
     * @param eventTypeRegistry     Used solely for deserialization/unwrapping purposes in order to reconstruct an
     *                              Ampel event from ProtoBuf's generic Any type.
     */
    public AmpelMessageSerde(String applicationIdentifier, AmpelEventTypeRegistry eventTypeRegistry) {
        this.applicationIdentifier = requireNonNull(applicationIdentifier, "application identifier must not be null");
        if (applicationIdentifier.isBlank()) {
            throw new IllegalArgumentException("application identifier must not be blank");
        }
        this.eventTypeRegistry = requireNonNull(eventTypeRegistry, "event type registry must not be null");
    }

    /**
     * Wraps an Ampel event into an {@link AmpelMessage} to be sent over the wire.
     *
     * @param partitioningKey   Metadata for the message in order to allow for message partitioning.
     * @param event             Ampel event to be wrapped.
     * @param eventCreationTime When the event has been created.
     * @return The Ampel event wrapped inside an {@link AmpelMessage} instance.
     */
    public AmpelMessage wrapEvent(String partitioningKey, Message event, Instant eventCreationTime) {
        requireNonNull(partitioningKey, "partitioning key must not be null");
        if (partitioningKey.isBlank()) {
            throw new IllegalArgumentException("partitioning key must not be blank");
        }
        requireNonNull(event, "event must not be null");

        return AmpelMessage.newBuilder()
                .setEventId(UUID.randomUUID().toString())
                .setTimestamp(Timestamp.newBuilder()
                        .setSeconds(eventCreationTime.getEpochSecond())
                        .setNanos(eventCreationTime.getNano())
                        .build())
                .setPartitioningKey(partitioningKey)
                .setEmitter(applicationIdentifier)
                .setPayload(Any.pack(event))
                .build();
    }

    /**
     * Restores the Ampel event wrapped within the given {@link AmpelMessage}.
     *
     * @param message Message wrapping the desired Ampel event.
     * @return The unwrapped Ampel event.
     * @throws AmpelEventReconstructionException If the Ampel cannot be reconstructed.
     * @see AmpelEventHandler
     * @see AmpelEventHandlerRouter
     */
    public Message unwrapEvent(AmpelMessage message)
            throws AmpelEventReconstructionException {
        try {
            var parser = eventTypeRegistry.getParserForTypeUrl(message.getPayload().getTypeUrl())
                    .orElseThrow(() -> new AmpelEventReconstructionException("wrapped payload is not a recognizable Ampel event"));

            return parser.parseFrom(message.getPayload().getValue());
        } catch (InvalidProtocolBufferException e) {
            throw new AmpelEventReconstructionException("packed payload is not a recognizable Ampel event", e);
        } catch (InvalidTypeUrlException e) {
            throw new AmpelEventReconstructionException("wrapped payload is malformed", e);
        }
    }

    /**
     * Serializes a given {@link AmpelMessage} into its byte format.
     *
     * @param ampelMessage The message to serialize.
     * @return The serialized message.
     */
    public byte[] serialize(AmpelMessage ampelMessage) {
        requireNonNull(ampelMessage, "ampel message must not be null");
        return ampelMessage.toByteArray();
    }

    /**
     * Takes a stream of bytes and tries to deserialize it into an {@link AmpelMessage}.
     *
     * @param bytes Stream of bytes.
     * @return Given bytes deserialized into an {@link AmpelMessage} instance.
     * @throws InvalidAmpelMessage If the stream of bytes cannot be deserialized into an {@link AmpelMessage} which can
     *                             only happen due to it being structurally malformed.
     */
    public AmpelMessage deserialize(byte[] bytes)
            throws InvalidAmpelMessage {
        if (bytes.length == 0) {
            throw new IllegalArgumentException("bytes must not be empty");
        }

        try {
            return AmpelMessage.parseFrom(bytes);
        } catch (InvalidProtocolBufferException e) {
            throw new InvalidAmpelMessage(
                    "cannot deserialize Ampel message due to it being structurally malformed", e);
        }
    }
}
