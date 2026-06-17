package eu.ampel_platform.messaging.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import static java.util.Objects.requireNonNull;

/**
 * Container with metadata for an {@link AmpelEventMessage}.
 *
 * @since 1.0.0
 */
public final class AmpelEventMessageHeader {
    private final UUID eventId;
    private final Instant timestamp;
    private final String sourceSystem;
    private final UUID correlationId;
    // TODO: add a map here for additional custom fields (has to be string - string to avoid deserialization issues)
    //       name: misc

    // These are automatically set when serializing and deserializing a {@link AmpelEventMessage} instance.
    private String eventType;
    private int eventVersion;

    /**
     * Creates a new {@link AmpelEventMessageHeader} with the given information.
     *
     * @param eventId       ID of the event that this header is supposed to be associated with.
     * @param timestamp     Creation timestamp of the event that this header is supposed to be associated with.
     * @param sourceSystem  String representation of the system that created the event that this header is supposed to
     *                      be associated with.
     * @param correlationId Optional correlation ID that can be used for tracing event chains within the platform.
     */
    public AmpelEventMessageHeader(UUID eventId, Instant timestamp, String sourceSystem, UUID correlationId) {
        this.eventId = requireNonNull(eventId, "event ID must not be null");
        this.timestamp = requireNonNull(timestamp, "timestamp must not be null");
        if (timestamp.isAfter(Instant.now())) {
            throw new IllegalArgumentException("timestamp must not be in the future");
        }

        this.sourceSystem = requireNonNull(sourceSystem, "source system must not be null");
        if (sourceSystem.isBlank()) {
            throw new IllegalArgumentException("source system must not be blank");
        }

        this.correlationId = correlationId;
    }

    /**
     * This is solely used internally by Jackson in order to deserialize the message header.
     * It aims to hide the eventType and version information from clients of this library while constructing the header.
     * However, it may be important to have these information publicly available on the side of a consumer (e.g. for
     * routing etc.)
     */
    @JsonCreator
    AmpelEventMessageHeader(
            @JsonProperty("event_id") UUID eventId,
            @JsonProperty("timestamp") Instant timestamp,
            @JsonProperty("source_system") String sourceSystem,
            @JsonProperty("correlation_id") UUID correlationId,
            @JsonProperty("event_type") String eventType,
            @JsonProperty("event_version") int eventVersion) {
        // additional validation necessary in order to cope with message headers that have been introduced to the system
        // on a way different from this lib (which should not happen!)
        this.eventId = requireNonNull(eventId, "event ID must not be null");
        this.timestamp = requireNonNull(timestamp, "timestamp must not be null");
        if (timestamp.isAfter(Instant.now())) {
            throw new IllegalArgumentException("timestamp must not be in the future");
        }

        this.sourceSystem = requireNonNull(sourceSystem, "source system must not be null");
        if (sourceSystem.isBlank()) {
            throw new IllegalArgumentException("source system must not be blank");
        }

        this.correlationId = correlationId;

        this.eventType = requireNonNull(eventType, "event type must not be null");
        if (eventType.isBlank()) {
            throw new IllegalArgumentException("event eventType must not be blank");
        }

        this.eventVersion = eventVersion;
        if (eventVersion <= 0) {
            throw new IllegalArgumentException("event version has to be a positive number");
        }
    }

    /**
     * Only used internally for dynamically setting the event eventType during serialization.
     *
     * @param eventType The event eventType.
     */
    void setEventType(String eventType) {
        requireNonNull(eventType, "event eventType must not be null");
        if (eventType.isBlank()) {
            throw new IllegalArgumentException("event eventType must not be blank");
        }

        this.eventType = eventType;
    }

    /**
     * Only used internally for dynamically setting the event version during serialization.
     *
     * @param eventVersion The event version.
     */
    void setEventVersion(int eventVersion) {
        if (eventVersion <= 0) {
            throw new IllegalArgumentException("event version has to be positive");
        }

        this.eventVersion = eventVersion;
    }

    /**
     * Returns the ID of the event that this header is associated with.
     *
     * @return The event ID.
     */
    public UUID getEventId() {
        return eventId;
    }

    /**
     * Returns the creation timestamp of the event that this header is associated with.
     *
     * @return The event creation timestamp.
     */
    public Instant getTimestamp() {
        return timestamp;
    }

    /**
     * Returns information on the source system that created the event that this header is associated with.
     *
     * @return The source system that created the event.
     */
    public String getSourceSystem() {
        return sourceSystem;
    }

    /**
     * Returns the correlation ID of the event that this header is associated with. This information is useful to trace
     * chains of events within the system.
     *
     * @return The correlation ID of the event.
     */
    public Optional<UUID> getCorrelationId() {
        return Optional.ofNullable(correlationId);
    }

    /**
     * Returns the eventType in string representation of the event that this header is associated with.
     * </p>
     * <b>Do not use this on the producer side as it won't be set. This information is only accessible to message
     * consumers after deserializing a message.</b>
     *
     * @return The event eventType.
     */
    public String getEventType() {
        return eventType;
    }

    /**
     * Returns the version of the event that this header is associated with.
     * </p>
     * <b>Do not use this on the producer side as it won't be set. This information is only accessible to message
     * consumers after deserializing a message.</b>
     *
     * @return The event version.
     */
    public int getEventVersion() {
        return eventVersion;
    }
}
