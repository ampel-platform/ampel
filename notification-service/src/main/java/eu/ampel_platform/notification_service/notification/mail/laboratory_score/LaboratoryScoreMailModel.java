package eu.ampel_platform.notification_service.notification.mail.laboratory_score;

import eu.ampel_platform.notification_service.notification.mail.MailTemplateModel;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Optional;

@Builder
@Getter
public final class LaboratoryScoreMailModel implements MailTemplateModel {
    private String patientId;
    private String medicalCaseId;
    private String patientFirstname;
    private String patientLastname;
    private LocalDate patientDateOfBirth;
    private String laboratoryOrderId;
    private String laboratoryMeasuringSystem;
    private String scoringSystemName;
    private String scoringSystemVersion;
    private String ampelScore;
    private String scoringSystemScoreRepresentation;
    private String scoringSystemComment;
    private String analyte;
    private double analyteValue;
    private String analyteUnit;
    private Instant analyteMeasuringTime;
    private Instant scoreCalculationTime;

    public Optional<String> getPatientFirstname() {
        return Optional.ofNullable(patientFirstname);
    }

    public Optional<String> getPatientLastname() {
        return Optional.ofNullable(patientLastname);
    }

    public Optional<LocalDate> getPatientDateOfBirth() {
        return Optional.ofNullable(patientDateOfBirth);
    }


}
