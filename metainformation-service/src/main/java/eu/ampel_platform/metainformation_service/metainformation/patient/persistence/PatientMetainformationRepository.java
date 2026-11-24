package eu.ampel_platform.metainformation_service.metainformation.patient.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for dealing with persistent storage of patient's metainformation.
 *
 * @since 2.0.0
 */
@Repository
public interface PatientMetainformationRepository extends JpaRepository<PatientMetainformationDTO, String> {
    Optional<PatientMetainformationDTO> findByMedicalCaseId(String value);
}
