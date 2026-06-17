package eu.ampel_platform.messaging.event;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

final class AmpelEventSchemaReflectionDiscoveryTest {

    @AmpelEventSchema(name = "testus.maximus", version = 1)
    public record AnnotatedTestEvent() implements AmpelEvent {
    }

    @AmpelEventSchema(name = "no.ampel.event", version = 1)
    public record OtherAnnotatedTestEvent() {
    }

    public record NonAnnotatedTestEvent() implements AmpelEvent {
    }

    @Test
    public void should_be_present_tryingToDiscoverAnnotatedTestEvent() {
        var discovery = new AmpelEventSchemaReflectionDiscovery();
        var discoveredAmpelEventSchemas = discovery.discoverAmpelEventSchemas();

        var annotatedTestEventSchema = discoveredAmpelEventSchemas.stream()
                .filter(s -> s.eventType().equals(AnnotatedTestEvent.class))
                .findFirst();

        assertTrue(annotatedTestEventSchema.isPresent());
    }

    @Test
    public void should_be_absent_tryingToDiscoverAnnotatedOtherTestEventThatIsNotAnAmpelEvent() {
        var discovery = new AmpelEventSchemaReflectionDiscovery();
        var discoveredAmpelEventSchemas = discovery.discoverAmpelEventSchemas();

        var annotatedTestEventSchema = discoveredAmpelEventSchemas.stream()
                .filter(s -> s.metadata().equals(new AmpelEventSchemaInformationMetadata(
                        "no.ampel.event",
                        1)))
                .findFirst();

        assertTrue(annotatedTestEventSchema.isEmpty());
    }

    @Test
    public void should_be_absent_tryingToDiscoverAmpelEventWithoutAnnotation() {
        var discovery = new AmpelEventSchemaReflectionDiscovery();
        var discoveredAmpelEventSchemas = discovery.discoverAmpelEventSchemas();

        var annotatedTestEventSchema = discoveredAmpelEventSchemas.stream()
                .filter(s -> s.eventType().equals(NonAnnotatedTestEvent.class))
                .findFirst();

        assertTrue(annotatedTestEventSchema.isEmpty());
    }
}
