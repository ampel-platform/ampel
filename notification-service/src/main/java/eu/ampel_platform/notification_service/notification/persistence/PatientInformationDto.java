package eu.ampel_platform.notification_service.notification.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

/**
 * Describes a patient's information necessary for notifications on a level required for persistently storing it.
 *
 * @since 1.0.0
 */
@Entity
@Table(name = "patient_information")
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class PatientInformationDto {

    @Id
    @Column(name = "patient_id")
    String patientId;

    @Column(name = "firstname")
    String firstname;

    @Column(name = "lastname")
    String lastname;

    @Column(name = "date_of_birth")
    LocalDate dateOfBirth;

    @Column(name = "medical_case_id")
    String medicalCaseId;
}
