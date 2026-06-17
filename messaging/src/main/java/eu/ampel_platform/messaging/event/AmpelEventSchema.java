package eu.ampel_platform.messaging.event;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation to be used in conjunction with {@link AmpelEvent} on a class.
 * </p>
 * Attaches metadata to the annotated eventType which acts as advanced eventType information used during serialization and
 * deserialization of {@link AmpelEventMessage}s.
 *
 * @since 1.0.0
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface AmpelEventSchema {
    /**
     * Name of this schema.
     *
     * @return Schema name.
     */
    String name();

    /**
     * Version of this schema.
     *
     * @return Schema version.
     */
    int version();
}
