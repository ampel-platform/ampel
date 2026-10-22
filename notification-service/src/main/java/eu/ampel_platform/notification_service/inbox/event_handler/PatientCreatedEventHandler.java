package eu.ampel_platform.notification_service.inbox.event_handler;

import eu.ampel_platform.messaging_sdk.AmpelEventHandler;
import eu.ampel_platform.messaging_sdk.AmpelEventHandlerException;
import eu.ampel_platform.messaging_sdk.generated.events.influx.AmpelPatientCreatedEvent;
import eu.ampel_platform.notification_service.notification.PatientInformationService;
import eu.ampel_platform.notification_service.notification.model.PatientId;
import eu.ampel_platform.notification_service.notification.model.PatientInformation;
import eu.ampel_platform.notification_service.notification.model.PatientName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Objects;

/**
 * An auto-discoverable {@link AmpelEventHandler} for handling {@link AmpelPatientCreatedEvent}s.
 * <p>
 * This handler creates a patient record within the system and populates it with data from the event that it handles.
 * </p>
 * <p>
 * <b>Note:</b>
 * <i>Usage of this class needs to be wrapped with a method annotated with
 * {@link org.springframework.transaction.annotation.Transactional} or which manages transactional lifecycles.</i>
 * </p>
 *
 * @since 1.0.0
 */
@Component
public final class PatientCreatedEventHandler implements AmpelEventHandler<AmpelPatientCreatedEvent> {

    private static final Logger LOGGER = LoggerFactory.getLogger(PatientCreatedEventHandler.class);

    private final PatientInformationService patientInformationService;

    public PatientCreatedEventHandler(PatientInformationService patientInformationService) {
        this.patientInformationService = Objects.requireNonNull(patientInformationService,
                "patient information service must not be null");
    }

    @Override
    public Class<AmpelPatientCreatedEvent> getHandledEventType() {
        return AmpelPatientCreatedEvent.class;
    }

    @Override
    public void handleEvent(AmpelPatientCreatedEvent event) throws AmpelEventHandlerException {
        // This does not need to be implemented using the
        // {@link org.springframework.transaction.annotation.Transactional} annotation since the
        // {@link eu.ampel_platform.notification_service.inbox.InboxProcessingService} is taking care of that on a
        // higher level already.
        LOGGER.debug("handling creation event for patient with ID '{}'",
                event.getPatientId());

        var dateOfBirth = (event.getDateOfBirth() == null)
                ? null
                : LocalDate.ofInstant(Instant.ofEpochSecond(
                        event.getDateOfBirth().getSeconds(),
                        event.getDateOfBirth().getNanos()),
                ZoneOffset.UTC);

        var patientInformation = new PatientInformation(
                new PatientId(event.getPatientId()),
                new PatientName(event.getFirstname(), event.getLastname()),
                dateOfBirth,
                null);

        try {
            patientInformationService.upsertPatientInformation(patientInformation);
        } catch (Exception e) {
            throw new AmpelEventHandlerException("failed to save patient information for patient with ID '%s'"
                    .formatted(event.getPatientId()), e);
        }
    }
}
