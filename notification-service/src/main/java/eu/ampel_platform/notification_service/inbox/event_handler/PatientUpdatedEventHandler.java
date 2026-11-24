package eu.ampel_platform.notification_service.inbox.event_handler;

import eu.ampel_platform.messaging_sdk.AmpelEventHandler;
import eu.ampel_platform.messaging_sdk.AmpelEventHandlerException;
import eu.ampel_platform.messaging_sdk.generated.events.influx.AmpelPatientUpdatedEvent;
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
 * An auto-discoverable {@link AmpelEventHandler} for handling {@link AmpelPatientUpdatedEvent}s.
 * <p>
 * This handler attempts to update an existing patient record within the system. The record is updated with information
 * that is part of the transmitted event.
 * </p>
 * <p>
 * <b>Note:</b>
 * <i>Usage of this class needs to be wrapped with a method annotated with
 * {@link org.springframework.transaction.annotation.Transactional} or which manages transactional lifecycles.</i>
 * </p>
 *
 * @since 2.0.0
 */
@Component
public final class PatientUpdatedEventHandler implements AmpelEventHandler<AmpelPatientUpdatedEvent> {

    private static final Logger LOGGER = LoggerFactory.getLogger(PatientUpdatedEventHandler.class);

    private final PatientInformationService patientInformationService;

    public PatientUpdatedEventHandler(PatientInformationService patientInformationService) {
        this.patientInformationService = Objects.requireNonNull(patientInformationService,
                "patient information service must not be null");
    }

    @Override
    public Class<AmpelPatientUpdatedEvent> getHandledEventType() {
        return AmpelPatientUpdatedEvent.class;
    }

    @Override
    public void handleEvent(AmpelPatientUpdatedEvent event) throws AmpelEventHandlerException {
        // This does not need to be implemented using the
        // {@link org.springframework.transaction.annotation.Transactional} annotation since the
        // {@link eu.ampel_platform.notification_service.inbox.InboxProcessingService} is taking care of that on a
        // higher level already.
        LOGGER.debug("handling update event for patient with ID '{}'",
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
            throw new AmpelEventHandlerException("failed to update patient information for patient with ID '%s'"
                    .formatted(event.getPatientId()), e);
        }
    }
}
