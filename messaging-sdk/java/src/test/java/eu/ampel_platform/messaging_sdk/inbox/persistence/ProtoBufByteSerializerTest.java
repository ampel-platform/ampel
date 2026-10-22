package eu.ampel_platform.messaging_sdk.inbox.persistence;

import com.google.protobuf.Any;
import com.google.protobuf.Message;
import com.google.protobuf.util.JsonFormat;
import eu.ampel_platform.messaging_sdk.inbox.generated.AnyMessage;
import eu.ampel_platform.messaging_sdk.inbox.generated.TestMessage;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;

final class ProtoBufByteSerializerTest {

    @Nested
    class Serialization {

        @Test
        public void shouldFail_TrySerializingMessageWithAnyTypeWithoutProperTypeRegistration() {
            var message = AnyMessage.newBuilder()
                    .setData(Any.pack(
                            TestMessage.newBuilder()
                                    .setFoo("test")
                                    .build()))
                    .build();

            var serializerWithoutTypeRegistry = new ProtoBufByteSerializer();
            assertThrows(Exception.class, () -> serializerWithoutTypeRegistry.serialize(message));
        }

        @Test
        public void shouldSucceed_TrySerializingMessageWithAnyTypeAndProperTypeRegistration() {
            var message = AnyMessage.newBuilder()
                    .setData(Any.pack(
                            TestMessage.newBuilder()
                                    .setFoo("test")
                                    .build()))
                    .build();

            var serializerWithTypeRegistry = new ProtoBufByteSerializer(
                    JsonFormat.TypeRegistry.newBuilder()
                            .add(TestMessage.getDescriptor())
                            .build());

            assertDoesNotThrow(() -> serializerWithTypeRegistry.serialize(message));
        }
    }

    @Nested
    class Deserialization {

        @Test
        public void shouldFail_NonProtoBufMessageCannotGetDeserialized() {
            var serializer = new ProtoBufByteSerializer();

            assertThrows(InboxPayloadSerializationException.class,
                    () -> serializer.deserialize(
                            "definitely-not-a-test-message-representation".getBytes(StandardCharsets.UTF_8),
                            TestMessage.class));
        }

        @Test
        public void shouldFail_NonMessageSubTypeHintCannotBeUsedForDeserialization() {
            var testMessage = AnyMessage.newBuilder()
                    .setData(Any.pack(
                            TestMessage.newBuilder()
                                    .setFoo("test")
                                    .build()))
                    .build();

            var serializer = new ProtoBufByteSerializer(
                    JsonFormat.TypeRegistry.newBuilder()
                            .add(TestMessage.getDescriptor())
                            .build());
            var serializedTestMessage = serializer.serialize(testMessage);

            assertThrows(InboxPayloadSerializationException.class,
                    () -> serializer.deserialize(serializedTestMessage, String.class));
        }

        @Test
        public void shouldFail_TryDeserializingMessageContainingAnyTypeWithoutProperTypeRegistration() {
            var testMessage = AnyMessage.newBuilder()
                    .setData(Any.pack(
                            TestMessage.newBuilder()
                                    .setFoo("test")
                                    .build()))
                    .build();

            var serializer = new ProtoBufByteSerializer(
                    JsonFormat.TypeRegistry.newBuilder()
                            .add(TestMessage.getDescriptor())
                            .build());
            var serializedTestMessage = serializer.serialize(testMessage);

            var serializerWithoutTypeRegistry = new ProtoBufByteSerializer();
            assertThrows(InboxPayloadSerializationException.class,
                    () -> serializerWithoutTypeRegistry.deserialize(serializedTestMessage, TestMessage.class));
        }

        @Test
        public void shouldSucceed_TryDeserializingMessageContainingAnyTypeWithProperTypeRegistration() {
            var testMessage = AnyMessage.newBuilder()
                    .setData(Any.pack(
                            TestMessage.newBuilder()
                                    .setFoo("test")
                                    .build()))
                    .build();

            var serializer = new ProtoBufByteSerializer(
                    JsonFormat.TypeRegistry.newBuilder()
                            .add(TestMessage.getDescriptor())
                            .build());
            var serializedTestMessage = serializer.serialize(testMessage);

            var deserializedMessage = serializer.deserialize(serializedTestMessage, AnyMessage.class);

            assertEquals(testMessage, deserializedMessage);
        }
    }
}
