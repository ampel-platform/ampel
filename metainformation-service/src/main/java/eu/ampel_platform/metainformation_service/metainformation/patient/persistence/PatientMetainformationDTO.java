package eu.ampel_platform.metainformation_service.metainformation.patient.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

/**
 * Describes a patient's metainformation on a level regarding the persistence layer.
 *
 * @since 2.0.0
 */
@Entity
@Table(name = "patient_metainformation")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class PatientMetainformationDTO {

    @Id
    @Column(name = "patient_id")
    String id;

    @Column(name = "patient_firstname")
    String firstname;

    @Column(name = "patient_lastname")
    String lastname;

    @Column(name = "patient_sex")
    String sex;

    @Column(name = "patient__date_of_birth")
    LocalDate dateOfBirth;

    @Column(name = "patient__medical_case_id")
    String medicalCaseId;
}
