package eu.ampel_platform.messaging.event;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

final class AmpelEventMessageSerdeJsonTest {

    @AmpelEventSchema(name = "serde.test", version = 1)
    public record SerdeTestAmpelEvent(
            String foo,
            BigDecimal bar
    ) implements AmpelEvent {
    }

    @Test
    public void should_deserialize_serialized_message()
            throws AmpelEventMessageSerializationException, AmpelEventMessageDeserializationException {
        var serde = AmpelEventMessageSerdeJson.create();

        var msg = new AmpelEventMessage(
                new AmpelEventMessageHeader(
                        UUID.randomUUID(),
                        Instant.now(),
                        "test-system",
                        UUID.randomUUID()
                ),
                new SerdeTestAmpelEvent(
                        "foo",
                        new BigDecimal("12.45")));

        var msgSerialized = serde.serialize(msg);
        var deserializedMsg = serde.deserialize(msgSerialized);

        assertEquals(msg.header().getEventId(), deserializedMsg.header().getEventId());
        assertEquals(msg.header().getTimestamp(), deserializedMsg.header().getTimestamp());
        assertEquals(msg.header().getSourceSystem(), deserializedMsg.header().getSourceSystem());
        assertEquals(msg.header().getCorrelationId(), deserializedMsg.header().getCorrelationId());
        assertEquals("serde.test", deserializedMsg.header().getEventType());
        assertEquals(1, deserializedMsg.header().getEventVersion());
        assertEquals(((SerdeTestAmpelEvent) msg.payload()).foo, ((SerdeTestAmpelEvent) deserializedMsg.payload()).foo);
        assertEquals(((SerdeTestAmpelEvent) msg.payload()).bar, ((SerdeTestAmpelEvent) deserializedMsg.payload()).bar);
    }

    @Test
    public void should_throw_tryingToDeserializeNonConformantMessage() {
        var serde = AmpelEventMessageSerdeJson.create();
        var emptyJson = "{}".getBytes(StandardCharsets.UTF_8);

        Assertions.assertThrows(
                AmpelEventMessageDeserializationException.class,
                () -> serde.deserialize(emptyJson));
    }

    @Test
    public void should_throw_tryingToDeserializeMessageWithUnknownEventType() {
        record TestMessageWithNotRegisteredEventType(
                AmpelEventMessageHeader header,
                Object payload
        ) {
        }

        record TestEventPayload(
                String foo
        ) implements AmpelEvent {
        }

        var header = new AmpelEventMessageHeader(
                UUID.randomUUID(),
                Instant.now(),
                "test-system",
                UUID.randomUUID());
        header.setEventType("not-registered-type");
        header.setEventVersion(1);

        var json = AmpelEventMessageSerdeJson.createAmpelJsonMapper();
        var serde = new AmpelEventMessageSerdeJson(json,
                new AmpelEventSchemaRegistry());

        var testMessageWithUnknownType = new TestMessageWithNotRegisteredEventType(
                header,
                new TestEventPayload("bar"));

        assertThrows(
                AmpelEventMessageDeserializationException.class,
                () -> serde.deserialize(json.writeValueAsBytes(testMessageWithUnknownType)));
    }

    @Test
    public void should_throw_tryingToDeserializeMessageThatDoesNotMatchEventType()
            throws AmpelEventSchemaAlreadyInUseException, AmpelEventTypeAlreadyInUseException {
        record TestMessageWithUnknownType(
                AmpelEventMessageHeader header,
                Object payload
        ) {
        }

        @AmpelEventSchema(name = "test-event", version = 1)
        record KnownReferenceTestPayload(
                String foo
        ) implements AmpelEvent {
        }

        record UnknownPayload(
                byte[] bar
        ) {
        }

        var header = new AmpelEventMessageHeader(
                UUID.randomUUID(),
                Instant.now(),
                "test-system",
                UUID.randomUUID());
        header.setEventType("test-event");
        header.setEventVersion(1);

        var schemaRegistry = new AmpelEventSchemaRegistry();
        schemaRegistry.registerEventSchema(
                new AmpelEventSchemaInformation(
                        new AmpelEventSchemaInformationMetadata("test-event", 1),
                        KnownReferenceTestPayload.class));

        var json = AmpelEventMessageSerdeJson.createAmpelJsonMapper();
        var serde = new AmpelEventMessageSerdeJson(json, schemaRegistry);

        var testMessageWithUnknownType = new TestMessageWithUnknownType(
                header,
                new UnknownPayload("bar".getBytes(StandardCharsets.UTF_8)));

        assertThrows(
                AmpelEventMessageDeserializationException.class,
                () -> serde.deserialize(json.writeValueAsBytes(testMessageWithUnknownType)));
    }
}
