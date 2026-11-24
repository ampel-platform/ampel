package eu.ampel_platform.notification_service.notification.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for dealing with persistent storage of patient information.
 *
 * @since 2.0.0
 */
@Repository
public interface PatientInformationRepository extends JpaRepository<PatientInformationDto, String> {
    Optional<PatientInformationDto> findByMedicalCaseId(String value);
}
