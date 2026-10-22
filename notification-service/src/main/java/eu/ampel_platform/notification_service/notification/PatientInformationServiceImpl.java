package eu.ampel_platform.notification_service.notification;

import eu.ampel_platform.notification_service.notification.model.MedicalCaseId;
import eu.ampel_platform.notification_service.notification.model.PatientId;
import eu.ampel_platform.notification_service.notification.model.PatientInformation;
import eu.ampel_platform.notification_service.notification.model.PatientName;
import eu.ampel_platform.notification_service.notification.persistence.PatientInformationDto;
import eu.ampel_platform.notification_service.notification.persistence.PatientInformationRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static java.util.Objects.requireNonNull;

/**
 * Default {@link PatientInformationService} implementation backed by a Spring datasource.
 *
 * @since 1.0.0
 */
@Service
public final class PatientInformationServiceImpl implements PatientInformationService {

    private final PatientInformationRepository patientInformationRepository;

    public PatientInformationServiceImpl(PatientInformationRepository patientInformationRepository) {
        this.patientInformationRepository = requireNonNull(patientInformationRepository,
                "patient information repository must not be null");
    }

    @Override
    public void upsertPatientInformation(PatientInformation patientInformation) {
        requireNonNull(patientInformation, "patient information must not be null");
        patientInformationRepository.save(mapModelToDto(patientInformation));
    }

    @Override
    public void deletePatientInformation(PatientId patientId) {
        requireNonNull(patientId, "patient ID must not be null");
        patientInformationRepository.deleteById(patientId.id());
    }

    @Override
    public void assignMedicalCaseToPatient(PatientId patientId, MedicalCaseId medicalCaseId) {
        requireNonNull(patientId, "patient ID must not be null");
        requireNonNull(medicalCaseId, "medical case ID must not be null");
        var patient = patientInformationRepository.findById(patientId.id())
                .orElseThrow(() -> new IllegalStateException("patient with ID '%s' does not exist"
                        .formatted(patientId.id())));

        patient.setMedicalCaseId(medicalCaseId.id());
        patientInformationRepository.save(patient);
    }

    @Override
    public Optional<PatientInformation> lookupPatientInformation(MedicalCaseId medicalCaseId) {
        requireNonNull(medicalCaseId, "medical case ID must not be null");
        return patientInformationRepository.findByMedicalCaseId(medicalCaseId.id())
                .map(this::mapDtoToModel);
    }

    private PatientInformationDto mapModelToDto(PatientInformation patientInformation) {
        return PatientInformationDto.builder()
                .patientId(patientInformation.patientId().id())
                .medicalCaseId(patientInformation.getMedicalCaseId()
                        .map(MedicalCaseId::id)
                        .orElse(null))
                .firstname(patientInformation.getName()
                        .map(PatientName::firstname)
                        .orElse(null))
                .lastname(patientInformation.getName()
                        .map(PatientName::lastname)
                        .orElse(null))
                .dateOfBirth(patientInformation.getDateOfBirth()
                        .orElse(null))
                .build();
    }

    private PatientInformation mapDtoToModel(PatientInformationDto dto) {
        return new PatientInformation(
                new PatientId(dto.getPatientId()),
                new PatientName(dto.getFirstname(), dto.getLastname()),
                dto.getDateOfBirth(),
                new MedicalCaseId(dto.getMedicalCaseId()));
    }
}
