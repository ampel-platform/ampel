package eu.ampel_platform.metainformation_service.inbox.event_handler;

import eu.ampel_platform.messaging_sdk.AmpelEventHandler;
import eu.ampel_platform.messaging_sdk.AmpelEventHandlerException;
import eu.ampel_platform.messaging_sdk.generated.events.influx.AmpelPatientAssignedMedicalCase;
import eu.ampel_platform.metainformation_service.metainformation.patient.PatientMetainformationService;
import eu.ampel_platform.metainformation_service.metainformation.patient.model.MedicalCaseId;
import eu.ampel_platform.metainformation_service.metainformation.patient.model.PatientId;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 * An auto-discoverable {@link AmpelEventHandler} for handling {@link AmpelPatientAssignedMedicalCase} events.
 * <p>
 * This handler attempts to update existing patient information by assigning a medical case to it. The medical case's
 * reference is part of the transmitted event.
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
public final class PatientAssignedMedicalCaseEventHandler implements AmpelEventHandler<AmpelPatientAssignedMedicalCase> {

    private static final Logger LOGGER = LoggerFactory.getLogger(PatientAssignedMedicalCaseEventHandler.class);

    private final PatientMetainformationService patientMetainformationService;

    public PatientAssignedMedicalCaseEventHandler(@NotNull PatientMetainformationService patientMetainformationService) {
        this.patientMetainformationService = Objects.requireNonNull(patientMetainformationService,
                "patient metainformation service must not be null");
    }

    @Override
    public Class<AmpelPatientAssignedMedicalCase> getHandledEventType() {
        return AmpelPatientAssignedMedicalCase.class;
    }

    @Override
    public void handleEvent(AmpelPatientAssignedMedicalCase event) throws AmpelEventHandlerException {
        // This does not need to be implemented using the
        // {@link org.springframework.transaction.annotation.Transactional} annotation since the
        // {@link eu.ampel_platform.notification_service.inbox.InboxProcessingService} is taking care of that on a
        // higher level already.
        LOGGER.debug("handling assignment event of medical case with ID '{}' to patient with ID '{}",
                event.getMedicalCaseId(), event.getPatientId());

        var patientMetainformation = patientMetainformationService.findPatientMetainformationByMedicalCaseId(
                new MedicalCaseId(event.getMedicalCaseId()));

        if (patientMetainformation.isPresent()
                && patientMetainformation.get().getId().id().equals(event.getPatientId())) {
            throw new AmpelEventHandlerException(("cannot assign medical case with ID '%s' to patient with ID '%s'" +
                    "since it's already assigned to patient with ID '%s'")
                    .formatted(
                            event.getMedicalCaseId(),
                            event.getPatientId(),
                            patientMetainformation.get().getId().id()));
        }

        var updatedPatientMetainformation = patientMetainformation.or(() ->
                        patientMetainformationService
                                .findPatientMetainformationById(new PatientId(event.getPatientId())))
                .map(pmi -> pmi.assignMedicalCase(
                        new MedicalCaseId(event.getMedicalCaseId())))
                .orElseThrow(() -> new AmpelEventHandlerException(
                        "failed to lookup existing patient metainformation for patient with ID '%s'"
                                .formatted(event.getPatientId())));

        try {
            patientMetainformationService.upsertPatientMetainformation(updatedPatientMetainformation);
        } catch (Exception e) {
            throw new AmpelEventHandlerException("failed to updated patient metainformation for patient with ID '%s'"
                    .formatted(event.getPatientId()), e);
        }
    }
}
