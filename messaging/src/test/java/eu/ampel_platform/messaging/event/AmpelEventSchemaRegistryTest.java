package eu.ampel_platform.messaging.event;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

final class AmpelEventSchemaRegistryTest {

    private record TestEvent() implements AmpelEvent {
    }

    private record OtherTestEvent() implements AmpelEvent {
    }

    private AmpelEventSchemaRegistry schemaRegistry;

    @BeforeEach
    public void setUp() {
        schemaRegistry = new AmpelEventSchemaRegistry();
    }

    @Test
    public void should_throw_tryingToRegisterNullSchemaInformation() {
        assertThrows(
                NullPointerException.class,
                () -> schemaRegistry.registerEventSchema(null));
    }

    @Test
    public void should_throw_tryingToRegisterAnAlreadyExistingSchemaInformation()
            throws AmpelEventSchemaAlreadyInUseException, AmpelEventTypeAlreadyInUseException {
        var eventSchemaInformation = new AmpelEventSchemaInformation(
                new AmpelEventSchemaInformationMetadata(
                        "test-eventType",
                        1),
                TestEvent.class);

        schemaRegistry.registerEventSchema(eventSchemaInformation);

        assertThrows(
                AmpelEventSchemaAlreadyInUseException.class,
                () -> schemaRegistry.registerEventSchema(eventSchemaInformation));
    }

    @Test
    public void should_throw_tryingToRegisterExistingSchemaInformationWithDifferentType()
            throws AmpelEventSchemaAlreadyInUseException, AmpelEventTypeAlreadyInUseException {
        var eventSchemaInformation = new AmpelEventSchemaInformation(
                new AmpelEventSchemaInformationMetadata(
                        "test-eventType",
                        1),
                TestEvent.class);

        schemaRegistry.registerEventSchema(eventSchemaInformation);

        var eventSchemaInformationWithDifferentType = new AmpelEventSchemaInformation(
                new AmpelEventSchemaInformationMetadata(
                        "test-eventType",
                        1),
                OtherTestEvent.class);

        assertThrows(
                AmpelEventSchemaAlreadyInUseException.class,
                () -> schemaRegistry.registerEventSchema(eventSchemaInformationWithDifferentType));
    }

    @Test
    public void should_throw_tryingToRegisterDifferentSchemaInformationForExistingType()
            throws AmpelEventSchemaAlreadyInUseException, AmpelEventTypeAlreadyInUseException {
        var eventSchemaInformation = new AmpelEventSchemaInformation(
                new AmpelEventSchemaInformationMetadata(
                        "test-eventType",
                        1),
                TestEvent.class);

        var otherEventSchemaInformationForSameType = new AmpelEventSchemaInformation(
                new AmpelEventSchemaInformationMetadata(
                        "test-eventType-A",
                        1),
                TestEvent.class);

        schemaRegistry.registerEventSchema(eventSchemaInformation);

        assertThrows(
                AmpelEventTypeAlreadyInUseException.class,
                () -> schemaRegistry.registerEventSchema(otherEventSchemaInformationForSameType));
    }

    @Test
    public void should_throw_tryingToLookUpEventTypeWithNullSchemaInformationMetadata() {
        assertThrows(
                NullPointerException.class,
                () -> schemaRegistry.lookupEventType(null));
    }

    @Test
    public void should_be_absent_tryingToLookUpEventTypeForNonExistingSchemaInformation() {
        var nonExistingSchemaInformationInRegistry = new AmpelEventSchemaInformationMetadata("test", 1);

        assertTrue(schemaRegistry.lookupEventType(nonExistingSchemaInformationInRegistry)
                .isEmpty());
    }

    @Test
    public void should_be_present_tryingToLookUpEventTypeForExistingSchemaInformation()
            throws AmpelEventSchemaAlreadyInUseException, AmpelEventTypeAlreadyInUseException {
        var eventSchemaInformationMetadata = new AmpelEventSchemaInformationMetadata("test", 1);
        var eventSchemaInformation = new AmpelEventSchemaInformation(
                eventSchemaInformationMetadata,
                TestEvent.class);

        schemaRegistry.registerEventSchema(eventSchemaInformation);
        var eventType = schemaRegistry.lookupEventType(eventSchemaInformationMetadata);

        assertTrue(eventType.isPresent());
        assertEquals(TestEvent.class, eventType.get());
    }

    @Test
    public void should_throw_tryingToLookUpSchemaInformationMetadataWithNulEventType() {
        assertThrows(
                NullPointerException.class,
                () -> schemaRegistry.lookupEventSchemaMetadata(null));
    }

    @Test
    public void should_be_absent_tryingToLookUpSchemaInformationMetadataForNonExistingEventType() {
        assertTrue(schemaRegistry.lookupEventSchemaMetadata(TestEvent.class)
                .isEmpty());
    }

    @Test
    public void should_be_present_tryingToLookUpSchemaInformationMetadataForExistingEventType()
            throws AmpelEventSchemaAlreadyInUseException, AmpelEventTypeAlreadyInUseException {
        var eventSchemaInformationMetadata = new AmpelEventSchemaInformationMetadata("test", 1);
        var eventSchemaInformation = new AmpelEventSchemaInformation(
                eventSchemaInformationMetadata,
                TestEvent.class);


        schemaRegistry.registerEventSchema(eventSchemaInformation);
        var schemaInformationMetadata = schemaRegistry.lookupEventSchemaMetadata(TestEvent.class);

        assertTrue(schemaInformationMetadata.isPresent());
        assertEquals(eventSchemaInformationMetadata, schemaInformationMetadata.get());
    }
}
