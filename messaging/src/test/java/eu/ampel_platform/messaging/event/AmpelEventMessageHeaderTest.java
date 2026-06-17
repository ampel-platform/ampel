package eu.ampel_platform.messaging.event;

import eu.ampel_platform.ResourceUtility;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.exc.ValueInstantiationException;
import tools.jackson.databind.json.JsonMapper;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

class AmpelEventMessageHeaderTest {

    private static ObjectMapper json;

    @BeforeAll
    public static void setUp() {
        json = JsonMapper.builder().build();
    }

    @Nested
    class JsonDeserialization {

        @Test
        public void should_throw_NoEventIdPresent() throws IOException {
            var resourceAsBytes = ResourceUtility
                    .getResourceAsBytes("AmpelEventMessageHeader/no-event-id.json");

            assertThrows(
                    ValueInstantiationException.class,
                    () -> json.readValue(resourceAsBytes, AmpelEventMessageHeader.class));
        }

        @Test
        public void should_throw_TimestampNotPresent() throws IOException {
            var resourceAsBytes = ResourceUtility
                    .getResourceAsBytes("AmpelEventMessageHeader/no-timestamp.json");

            assertThrows(
                    ValueInstantiationException.class,
                    () -> json.readValue(resourceAsBytes, AmpelEventMessageHeader.class));
        }

        @Test
        public void should_throw_TimestampInFuture() throws IOException {
            // The file ensures that the timestamp is "always" in the future (check the file's content).
            // This can be considered a dirty solution. However, call yourself lucky if you're still around when this
            // condition is not truthy anymore and simply come up with a solution (there should be plenty of time until
            // it happens).
            var resourceAsBytes = ResourceUtility
                    .getResourceAsBytes("AmpelEventMessageHeader/timestamp-in-future.json");

            assertThrows(
                    ValueInstantiationException.class,
                    () -> json.readValue(resourceAsBytes, AmpelEventMessageHeader.class));
        }

        @Test
        public void should_throw_SourceSystemNotPresent() throws IOException {
            var resourceAsBytes = ResourceUtility
                    .getResourceAsBytes("AmpelEventMessageHeader/no-source-system.json");

            assertThrows(
                    ValueInstantiationException.class,
                    () -> json.readValue(resourceAsBytes, AmpelEventMessageHeader.class));
        }

        @Test
        public void should_throw_SourceSystemBlank() throws IOException {
            var resourceAsBytes = ResourceUtility
                    .getResourceAsBytes("AmpelEventMessageHeader/blank-source-system.json");

            assertThrows(
                    ValueInstantiationException.class,
                    () -> json.readValue(resourceAsBytes, AmpelEventMessageHeader.class));
        }

        @Test
        public void should_throw_EventTypeNotPresent() throws IOException {
            var resourceAsBytes = ResourceUtility
                    .getResourceAsBytes("AmpelEventMessageHeader/no-event-type.json");

            assertThrows(
                    ValueInstantiationException.class,
                    () -> json.readValue(resourceAsBytes, AmpelEventMessageHeader.class));
        }

        @Test
        public void should_throw_EventTypeBlank() throws IOException {
            var resourceAsBytes = ResourceUtility
                    .getResourceAsBytes("AmpelEventMessageHeader/blank-event-type.json");

            assertThrows(
                    ValueInstantiationException.class,
                    () -> json.readValue(resourceAsBytes, AmpelEventMessageHeader.class));
        }

        @Test
        public void should_throw_EventVersionNegative() throws IOException {
            var resourceAsBytes = ResourceUtility
                    .getResourceAsBytes("AmpelEventMessageHeader/negative-event-version.json");

            assertThrows(
                    ValueInstantiationException.class,
                    () -> json.readValue(resourceAsBytes, AmpelEventMessageHeader.class));
        }

        @Test
        public void should_succeed_NoCorrelationId() throws IOException {
            var resourceAsBytes = ResourceUtility
                    .getResourceAsBytes("AmpelEventMessageHeader/no-correlation-id.json");

            assertDoesNotThrow(
                    () -> json.readValue(resourceAsBytes, AmpelEventMessageHeader.class));
        }
    }
}
