package eu.ampel_platform.metainformation_service.metainformation.patient;

import eu.ampel_platform.metainformation_service.metainformation.patient.model.*;
import eu.ampel_platform.metainformation_service.metainformation.patient.persistence.PatientMetainformationDTO;
import eu.ampel_platform.metainformation_service.metainformation.patient.persistence.PatientMetainformationRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static java.util.Objects.requireNonNull;

/**
 * Default {@link PatientMetainformationService} implementation backed by a Spring datasource.
 *
 * @since 2.0.0
 */
@Service
public final class PatientMetainformationServiceImpl implements PatientMetainformationService {

    private final PatientMetainformationRepository patientMetainformationRepository;

    public PatientMetainformationServiceImpl(
            @NotNull PatientMetainformationRepository patientMetainformationRepository) {
        this.patientMetainformationRepository = requireNonNull(patientMetainformationRepository,
                "patient metainformation repository must not be null");
    }

    @Override
    public void upsertPatientMetainformation(@NotNull PatientMetainformation patientMetainformation) {
        requireNonNull(patientMetainformation, "patient metainformation must not be null");
        patientMetainformationRepository.save(mapModelToDto(patientMetainformation));
    }

    @Override
    public void deletePatientMetainformation(@NotNull PatientId patientId) {
        requireNonNull(patientId, "patient ID must not be null");
        patientMetainformationRepository.deleteById(patientId.id());
    }

    @Override
    public Optional<PatientMetainformation> findPatientMetainformationByMedicalCaseId(
            @NotNull MedicalCaseId medicalCaseId) {
        requireNonNull(medicalCaseId, "medical case ID must not be null");
        return patientMetainformationRepository.findByMedicalCaseId(medicalCaseId.id())
                .map(this::mapDtoToModel);
    }

    @Override
    public Optional<PatientMetainformation> findPatientMetainformationById(@NotNull PatientId patientId) {
        requireNonNull(patientId, "patient ID must not be null");
        return patientMetainformationRepository.findById(patientId.id())
                .map(this::mapDtoToModel);
    }

    private PatientMetainformationDTO mapModelToDto(@NotNull PatientMetainformation patientMetainformation) {
        return PatientMetainformationDTO.builder()
                .id(patientMetainformation.getId().id())
                .medicalCaseId(patientMetainformation.getMedicalCaseId()
                        .map(MedicalCaseId::id)
                        .orElse(null))
                .firstname(patientMetainformation.getName()
                        .map(PatientName::firstname)
                        .orElse(null))
                .lastname(patientMetainformation.getName()
                        .map(PatientName::lastname)
                        .orElse(null))
                .dateOfBirth(patientMetainformation.getDateOfBirth()
                        .orElse(null))
                .sex(patientMetainformation.getSex().name())
                .build();
    }

    private PatientMetainformation mapDtoToModel(@NotNull PatientMetainformationDTO dto) {
        return PatientMetainformation.builder(new PatientId(dto.getId()))
                .medicalCaseId(Optional.ofNullable(dto.getMedicalCaseId())
                        .map(MedicalCaseId::new)
                        .orElse(null))
                .name(new PatientName(
                        dto.getFirstname(),
                        dto.getLastname()))
                .dateOfBirth(dto.getDateOfBirth())
                .sex(PatientSex.valueOf(dto.getSex()))
                .build();
    }
}
