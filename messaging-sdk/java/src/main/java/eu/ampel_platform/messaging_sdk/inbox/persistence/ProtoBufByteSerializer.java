package eu.ampel_platform.messaging_sdk.inbox.persistence;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Message;
import com.google.protobuf.util.JsonFormat;
import org.jetbrains.annotations.NotNull;

import java.lang.reflect.InvocationTargetException;
import java.nio.charset.StandardCharsets;

/**
 * A serializer for {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord} payloads operating on the JSON
 * format for serialization/deserialization.
 * </p>
 * This class is intended to be used so that messages in the inbox can be introspected by a human. That's also the
 * reason why it's dealing with JSON as a format instead of simply making use of ProtoBuf's default serialization
 * capabilities.
 *
 * @since 1.0.0
 */
public final class ProtoBufByteSerializer implements InboxPayloadSerializer {

    private final JsonFormat.Printer protoBufJsonSerializer;
    private final JsonFormat.Parser protoBufJsonDeserializer;

    /**
     * Creates a new {@link ProtoBufByteSerializer} instance that uses a default ProtoBuf serializer.
     * </p>
     * If a message contains data of type {@link com.google.protobuf.Any} then make sure to use
     * {@link ProtoBufByteSerializer#ProtoBufByteSerializer(JsonFormat.TypeRegistry)} instead as it requires a type
     * registry.
     *
     * @see ProtoBufByteSerializer#ProtoBufByteSerializer(JsonFormat.TypeRegistry)
     */
    public ProtoBufByteSerializer() {
        protoBufJsonSerializer = JsonFormat.printer();
        protoBufJsonDeserializer = JsonFormat.parser();
    }

    /**
     * Creates a new {@link ProtoBufByteSerializer} instance backed by the given type registry.
     * </p>
     * This is only necessary if a message contains data of type {@link com.google.protobuf.Any}. If it does not then
     * stick to {@link ProtoBufByteSerializer#ProtoBufByteSerializer()}.
     *
     * @param typeRegistry type registry to be used.
     * @see ProtoBufByteSerializer#ProtoBufByteSerializer()
     */
    public ProtoBufByteSerializer(@NotNull JsonFormat.TypeRegistry typeRegistry) {
        protoBufJsonSerializer = JsonFormat.printer().usingTypeRegistry(typeRegistry);
        protoBufJsonDeserializer = JsonFormat.parser().usingTypeRegistry(typeRegistry);
    }

    /**
     * Attempts to serialize the given {@link Message} into the byte stream of its JSON format.
     *
     * @param message the payload
     * @return Byte stream of the payload's JSON format.
     * @throws InboxPayloadSerializationException If an error occurs during serialization.
     */
    @Override
    public byte[] serialize(final Message message) {
        try {
            return protoBufJsonSerializer.print(message).getBytes(StandardCharsets.UTF_8);
        } catch (InvalidProtocolBufferException e) {
            throw new InboxPayloadSerializationException("cannot serialize message of type '%s'"
                    .formatted(message.getClass().getName()), e);
        }
    }

    /**
     * Attempts to deserialize the given byte stream into a {@link Message}.
     *
     * @param data the payload as bytes
     * @param type type that the payload represents
     * @param <T>  Payload type.
     * @return The payload in its original format.
     * @throws InboxPayloadSerializationException If an error occurs during deserialization.
     */
    @Override
    public <T> Message deserialize(final byte[] data, Class<T> type) {
        if (!Message.class.isAssignableFrom(type)) {
            throw new InboxPayloadSerializationException(("given type '%s' cannot be deserialized into a ProtoBuf " +
                    "message because it is not of type '%s'").formatted(type.getName(), Message.class.getName()));
        }

        try {
            var builder = (Message.Builder) type.getDeclaredMethod("newBuilder")
                    .invoke(null);

            protoBufJsonDeserializer.merge(new String(data, StandardCharsets.UTF_8), builder);
            return builder.build();
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            throw new InboxPayloadSerializationException("missing 'newBuilder' function on type '%s'"
                    .formatted(type.getName()), e);
        } catch (InvalidProtocolBufferException e) {
            throw new InboxPayloadSerializationException(("cannot deserialize message into ProtoBuf message of type " +
                    "'%s'").formatted(type.getName()), e);
        }
    }
}
