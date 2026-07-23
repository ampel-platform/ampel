package eu.ampel_platform.messaging_sdk;

import com.google.protobuf.Descriptors;
import com.google.protobuf.Timestamp;
import eu.ampel_platform.messaging_sdk.generated.AmpelMessage;
import eu.ampel_platform.messaging_sdk.generated.events.influx.AmpelPatientDiedEvent;
import eu.ampel_platform.messaging_sdk.generated.events.influx.AmpelPatientUpdatedEvent;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public final class AmpelMessageFilterFactoryTest {

    private static AmpelMessageSerde messageSerde;

    @BeforeAll
    public static void setUp() {
        messageSerde = new AmpelMessageSerde("test-app",
                AmpelEventTypeRegistry.withParsersForEventTypeUrls(
                        AmpelEventTypeRegistry.discoverParsersByEventUrl()));
    }

    @Nested
    class EventTypeFilterTests {

        private static List<AmpelMessage> testMessages;

        @BeforeAll
        public static void setUp() {
            var birthDate = Instant.now().minus(Duration.ofDays(20));

            testMessages = List.of(
                    messageSerde.wrapEvent("part-1",
                            AmpelPatientUpdatedEvent.newBuilder()
                                    .setPatientId("pat-1")
                                    .setFirstname("Test")
                                    .setLastname("Patient")
                                    .setDateOfBirth(Timestamp.newBuilder()
                                            .setSeconds(birthDate.getEpochSecond())
                                            .setNanos(birthDate.getNano())
                                            .build())
                                    .build(),
                            Instant.now()),
                    messageSerde.wrapEvent("part-1",
                            AmpelPatientDiedEvent.newBuilder()
                                    .setPatientId("pat-1")
                                    .build(),
                            Instant.now()));
        }

        @Test
        public void shouldThrow_tryingToCreateFilterWithNull() {
            assertThrows(NullPointerException.class,
                    () -> AmpelMessageFilterFactory.createEventTypeFilter(null));
        }

        @Test
        public void shouldThrow_tryingToCreateFilterWithAtLeastOneNullDescriptor() {
            var descriptors = new ArrayList<Descriptors.Descriptor>();
            descriptors.add(null);

            assertThrows(IllegalArgumentException.class,
                    () -> AmpelMessageFilterFactory.createEventTypeFilter(descriptors));
        }

        @Test
        public void shouldSucceed_emptyListFiltersOutEveryMessage() {
            var eventTypeFilter = AmpelMessageFilterFactory.createEventTypeFilter(List.of());

            var filteredMessages = testMessages.stream()
                    .filter(eventTypeFilter)
                    .toList();

            assertTrue(filteredMessages.isEmpty());
        }

        @Test
        public void shouldSucceed_onlyFiltersForMatchingMessages() throws AmpelEventReconstructionException {
            var eventTypeFilter = AmpelMessageFilterFactory.createEventTypeFilter(List.of(
                    AmpelPatientUpdatedEvent.getDescriptor()));

            var filteredMessages = testMessages.stream()
                    .filter(eventTypeFilter)
                    .toList();

            assertFalse(filteredMessages.isEmpty());
            assertEquals(1, filteredMessages.size());

            var event = messageSerde.unwrapEvent(filteredMessages.getFirst());
            assertInstanceOf(AmpelPatientUpdatedEvent.class, event);
        }
    }
}
