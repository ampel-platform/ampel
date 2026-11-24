package eu.ampel_platform.messaging_sdk;

import com.google.protobuf.Descriptors;

import java.util.List;
import java.util.Objects;

import static java.util.Objects.requireNonNull;

/**
 * Factory for creating common filters on {@link eu.ampel_platform.messaging_sdk.generated.AmpelMessage}s within the
 * platform.
 *
 * @since 2.0.0
 */
public final class AmpelMessageFilterFactory {

    private AmpelMessageFilterFactory() {
    }

    /**
     * Creates a simple filter for filtering {@link eu.ampel_platform.messaging_sdk.generated.AmpelMessage}s based on
     * their event type. An event type is given by a {@link com.google.protobuf.Descriptors.Descriptor} associated with
     * a specific message type.
     *
     * @param eventDescriptors List of descriptors carrying an event type.
     * @return A filter that keeps messages whose event type is equal to any of the specified ones.
     */
    public static AmpelMessageFilter createEventTypeFilter(List<Descriptors.Descriptor> eventDescriptors) {
        requireNonNull(eventDescriptors, "event descriptors must not be null");
        if (eventDescriptors.stream()
                .anyMatch(Objects::isNull)) {
            throw new IllegalArgumentException("no event descriptor within the list must be null");
        }

        var eventTypes = eventDescriptors.stream()
                .map(Descriptors.Descriptor::getFullName)
                .toList();

        return ampelMessage -> eventTypes.contains(ampelMessage.getEventType());
    }
}
