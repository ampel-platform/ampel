package eu.ampel_platform.messaging.event;

import io.github.classgraph.ClassGraph;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * Utility for discovering Ampel event schemas within the system using reflection.
 * It focuses on classes that implement {@link AmpelEvent} and that are also annotated with {@link AmpelEventSchema}.
 */
final class AmpelEventSchemaReflectionDiscovery implements AmpelEventSchemaDiscovery {

    private static final Logger LOGGER = LoggerFactory.getLogger(AmpelEventSchemaReflectionDiscovery.class);

    private static List<Class<?>> CLASS_INSTANCES;


    @Override
    public List<AmpelEventSchemaInformation> discoverAmpelEventSchemas() {
        var ampelSchemaAnnotatedClasses = listClassesAnnotatedWithAmpelEventSchema();

        var eventSchemaInformation = ampelSchemaAnnotatedClasses.stream()
                .map(this::convertToEventSchemaInformation)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();

        LOGGER.info("successfully discovered #{} Ampel event schemas", eventSchemaInformation.size());
        return eventSchemaInformation;
    }

    /**
     * Scans for and retrieves all classes annotated with {@link AmpelEventSchema}.
     *
     * @return A list of all annotated classes.
     */
    private List<Class<?>> listClassesAnnotatedWithAmpelEventSchema() {
        // Make use of a singleton here in order to skip expensive the expensive class scan.
        // Since classes are resolved during runtime anyway, there's no need to assume additional classes have been
        // added since the last invocation.
        if (CLASS_INSTANCES == null) {
            try (var scan = new ClassGraph()
                    .enableAnnotationInfo()
                    .scan()) {

                CLASS_INSTANCES = scan.getClassesWithAnnotation(AmpelEventSchema.class.getName())
                        .loadClasses();
            }
        }

        return CLASS_INSTANCES;
    }

    /**
     * Attempts to convert a given class to an {@link AmpelEventSchemaInformation} instance.
     *
     * @param clazz The class to convert.
     * @return The conversion result if successful.
     */
    @SuppressWarnings("unchecked")
    private Optional<AmpelEventSchemaInformation> convertToEventSchemaInformation(Class<?> clazz) {
        if (Arrays.stream(clazz.getInterfaces())
                .noneMatch(interfaceName -> interfaceName.equals(AmpelEvent.class))) {
            return Optional.empty();
        }

        var annotation = clazz.getAnnotation(AmpelEventSchema.class);
        return Optional.of(new AmpelEventSchemaInformation(
                new AmpelEventSchemaInformationMetadata(
                        annotation.name(),
                        annotation.version()),
                (Class<? extends AmpelEvent>) clazz));
    }
}
