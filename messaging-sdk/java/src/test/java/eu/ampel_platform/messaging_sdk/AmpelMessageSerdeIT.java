package eu.ampel_platform.messaging_sdk;

import eu.ampel_platform.messaging_sdk.generated.events.influx.AmpelPatientDiedEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;

final class AmpelMessageSerdeIT {

    private AmpelMessageSerde messageSerde;

    @BeforeEach
    public void setUp() {
        messageSerde = new AmpelMessageSerde(
                "test-app",
                AmpelEventTypeRegistry.withParsersForEventTypeUrls(
                        AmpelEventTypeRegistry.discoverParsersByEventUrl()));
    }

    @Test
    public void shouldSucceed_ConsumePreviouslySerializedMessage()
            throws InvalidAmpelMessage, AmpelEventReconstructionException {

        var patientDiedEvent = AmpelPatientDiedEvent.newBuilder()
                .setPatientId("pat-1")
                .build();

        var ampelMessage = messageSerde.wrapEvent("part-1",
                patientDiedEvent,
                Instant.now());
        var serializedAmpelMessage = messageSerde.serialize(
                ampelMessage);

        var deserializedAmpelMessage = messageSerde.deserialize(serializedAmpelMessage);
        var unpackedEvent = messageSerde.unwrapEvent(deserializedAmpelMessage);

        assertEquals(ampelMessage.getEventId(), deserializedAmpelMessage.getEventId());
        assertEquals(ampelMessage.getTimestamp(), deserializedAmpelMessage.getTimestamp());
        assertEquals(ampelMessage.getEmitter(), deserializedAmpelMessage.getEmitter());
        assertEquals(ampelMessage.getEventType(), deserializedAmpelMessage.getEventType());
        assertInstanceOf(AmpelPatientDiedEvent.class, unpackedEvent);

        AmpelPatientDiedEvent castEvent = (AmpelPatientDiedEvent) unpackedEvent;
        assertEquals("pat-1", castEvent.getPatientId());
    }
}
