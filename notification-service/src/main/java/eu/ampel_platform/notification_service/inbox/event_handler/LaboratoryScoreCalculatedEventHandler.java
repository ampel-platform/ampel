package eu.ampel_platform.notification_service.inbox.event_handler;

import eu.ampel_platform.messaging_sdk.AmpelEventHandler;
import eu.ampel_platform.messaging_sdk.generated.AmpelLaboratoryScoreCalculatedEvent;
import eu.ampel_platform.messaging_sdk.generated.AmpelScore;
import eu.ampel_platform.notification_service.notification.PatientInformationService;
import eu.ampel_platform.notification_service.notification.mail.laboratory_score.LaboratoryScoreMailModel;
import eu.ampel_platform.notification_service.notification.mail.laboratory_score.LaboratoryScoreMailNotificationService;
import eu.ampel_platform.notification_service.notification.model.MedicalCaseId;
import eu.ampel_platform.notification_service.notification.model.PatientInformation;
import eu.ampel_platform.notification_service.notification.model.PatientName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Optional;

import static java.util.Objects.requireNonNull;

/**
 * An auto-discoverable {@link AmpelEventHandler} for handling {@link AmpelLaboratoryScoreCalculatedEvent}s.
 * <p>
 * This will take a calculated score and reports it using the e-mail notification channel. Notifications are simply
 * triggered by this handler and handed over to an outbox implementation deferred processing.
 * </p>
 * <p>
 * <b>Note:</b>
 * <i>Usage of this class needs to be wrapped with a method annotated with
 * {@link org.springframework.transaction.annotation.Transactional} or which manages transactional lifecycles.</i>
 * </p>
 * TODO: reference / mention the outbox handler being responsible for this!
 * TODO: introduce a dedicated outbox handler
 *
 * @since 2.0.0
 */
@Component
public final class LaboratoryScoreCalculatedEventHandler
        implements AmpelEventHandler<AmpelLaboratoryScoreCalculatedEvent> {

    private static final Logger LOGGER = LoggerFactory.getLogger(LaboratoryScoreCalculatedEventHandler.class);

    private final PatientInformationService patientInformationService;
    private final LaboratoryScoreMailNotificationService laboratoryScoreMailNotificationService;

    public LaboratoryScoreCalculatedEventHandler(
            PatientInformationService patientInformationService,
            LaboratoryScoreMailNotificationService laboratoryScoreMailNotificationService) {
        this.patientInformationService = requireNonNull(patientInformationService,
                "patient information service must not be null");
        this.laboratoryScoreMailNotificationService = requireNonNull(laboratoryScoreMailNotificationService,
                "mail notification service for laboratory scores must not be null");
    }

    @Override
    public Class<AmpelLaboratoryScoreCalculatedEvent> getHandledEventType() {
        return AmpelLaboratoryScoreCalculatedEvent.class;
    }

    @Override
    public void handleEvent(AmpelLaboratoryScoreCalculatedEvent event) {
        // This does not need to be implemented using the
        // {@link org.springframework.transaction.annotation.Transactional} annotation since the
        // {@link eu.ampel_platform.notification_service.inbox.InboxProcessingService} is taking care of that on a
        // higher level already.
        LOGGER.debug("handling creation event for laboratory score with ID '{}'",
                event.getScoreId());

        if (!event.getScore().equals(AmpelScore.AMPEL_YELLOW) && !event.getScore().equals(AmpelScore.AMPEL_RED)) {
            LOGGER.debug("laboratory score with ID '{}' with score being '{}' is not worth a notification",
                    event.getScoreId(), event.getScore());
            return;
        }

        var patientInformation = patientInformationService
                .lookupPatientInformation(new MedicalCaseId(event.getMedicalCaseId()));

        // TODO: send this information to an outbox!!!
        //       use a dedicated handler to deal with it there!
        var mailRenderingModel = prepareMailRenderingModel(patientInformation.get(), event);
        laboratoryScoreMailNotificationService.sendMailNotification(mailRenderingModel);
    }

    private LaboratoryScoreMailModel prepareMailRenderingModel(
            PatientInformation patientInformation, // this can be null
            AmpelLaboratoryScoreCalculatedEvent event
    ) {
        var optionalPatientInformation = Optional.ofNullable(patientInformation);

        return LaboratoryScoreMailModel.builder()
                .patientId(optionalPatientInformation
                        .map(pi -> pi.patientId().id())
                        .orElse(null))
                .medicalCaseId(event.getMedicalCaseId())
                .patientFirstname(optionalPatientInformation
                        .flatMap(pi -> pi.getName()
                                .map(PatientName::firstname))
                        .orElse(null))
                .patientLastname(optionalPatientInformation
                        .flatMap(pi -> pi.getName()
                                .map(PatientName::lastname))
                        .orElse(null))
                .patientDateOfBirth(optionalPatientInformation
                        .flatMap(PatientInformation::getDateOfBirth)
                        .orElse(null))
                .scoringSystemName(event.getScoringSystemName())
                .scoringSystemVersion(event.getScoringSystemVersion())
                .laboratoryOrderId(event.getLaboratoryOrderId())
                .laboratoryMeasuringSystem(event.getMeasuringSystem())
                .ampelScore(event.getScore().name())
                .scoringSystemScoreRepresentation(event.getScoringSystemSeverityCode())
                .scoringSystemComment(event.getScoringSystemComment())
                .analyte(event.getAnalyteName())
                .analyteValue(event.getAnalyteValue())
                .analyteUnit(event.getAnalyteUnit())
                .analyteMeasuringTime(Instant.ofEpochSecond(
                        event.getAnalyteMeasuredAt().getSeconds(),
                        event.getAnalyteMeasuredAt().getNanos()))
                .scoreCalculationTime(Instant.ofEpochSecond(
                        event.getCalculatedAt().getSeconds(),
                        event.getCalculatedAt().getNanos()))
                .build();
    }
}
