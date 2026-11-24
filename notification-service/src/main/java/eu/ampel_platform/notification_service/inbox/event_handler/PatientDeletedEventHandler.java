package eu.ampel_platform.notification_service.inbox.event_handler;

import eu.ampel_platform.messaging_sdk.AmpelEventHandler;
import eu.ampel_platform.messaging_sdk.AmpelEventHandlerException;
import eu.ampel_platform.messaging_sdk.generated.events.influx.AmpelPatientDeletedEvent;
import eu.ampel_platform.notification_service.notification.PatientInformationService;
import eu.ampel_platform.notification_service.notification.model.PatientId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 * An auto-discoverable {@link AmpelEventHandler} for handling {@link AmpelPatientDeletedEvent}s.
 * <p>
 * This handler attempts to delete a patient record within the system based on the transmitted patient ID in the
 * event.
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
public final class PatientDeletedEventHandler implements AmpelEventHandler<AmpelPatientDeletedEvent> {

    private static final Logger LOGGER = LoggerFactory.getLogger(PatientDeletedEventHandler.class);

    private final PatientInformationService patientInformationService;

    public PatientDeletedEventHandler(PatientInformationService patientInformationService) {
        this.patientInformationService = Objects.requireNonNull(patientInformationService,
                "patient information service must not be null");
    }

    @Override
    public Class<AmpelPatientDeletedEvent> getHandledEventType() {
        return AmpelPatientDeletedEvent.class;
    }

    @Override
    public void handleEvent(AmpelPatientDeletedEvent event) throws AmpelEventHandlerException {
        // This does not need to be implemented using the
        // {@link org.springframework.transaction.annotation.Transactional} annotation since the
        // {@link eu.ampel_platform.notification_service.inbox.InboxProcessingService} is taking care of that on a
        // higher level already.
        LOGGER.debug("handling deletion event for patient with ID '{}'",
                event.getPatientId());

        try {
            patientInformationService.deletePatientInformation(
                    new PatientId(event.getPatientId()));
        } catch (Exception e) {
            throw new AmpelEventHandlerException("failed to delete existing patient information of patient with ID '%s'"
                    .formatted(event.getPatientId()), e);
        }
    }
}
