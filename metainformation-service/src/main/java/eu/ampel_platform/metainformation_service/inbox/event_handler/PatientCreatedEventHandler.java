package eu.ampel_platform.metainformation_service.inbox.event_handler;

import eu.ampel_platform.messaging_sdk.AmpelEventHandler;
import eu.ampel_platform.messaging_sdk.AmpelEventHandlerException;
import eu.ampel_platform.messaging_sdk.generated.events.influx.AmpelPatientCreatedEvent;
import eu.ampel_platform.metainformation_service.inbox.event_handler.util.TypeMapper;
import eu.ampel_platform.metainformation_service.metainformation.patient.PatientMetainformationService;
import eu.ampel_platform.metainformation_service.metainformation.patient.model.PatientId;
import eu.ampel_platform.metainformation_service.metainformation.patient.model.PatientMetainformation;
import eu.ampel_platform.metainformation_service.metainformation.patient.model.PatientName;
import org.jetbrains.annotations.NotNull;
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

    private final PatientMetainformationService patientMetainformationService;

    public PatientCreatedEventHandler(@NotNull PatientMetainformationService patientMetainformationService) {
        this.patientMetainformationService = Objects.requireNonNull(patientMetainformationService,
                "patient metainformation service must not be null");
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

        var patientMetainformation = PatientMetainformation.builder(new PatientId(event.getPatientId()))
                .name(new PatientName(event.getFirstname(), event.getLastname()))
                .sex(TypeMapper.mapEventSex(event.getSex()))
                .dateOfBirth(dateOfBirth)
                .build();

        try {
            patientMetainformationService.upsertPatientMetainformation(patientMetainformation);
        } catch (Exception e) {
            throw new AmpelEventHandlerException("failed to save patient metainformation for patient with ID '%s'"
                    .formatted(event.getPatientId()), e);
        }
    }
}
