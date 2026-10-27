package eu.ampel_platform.metainformation_service.metainformation.patient.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;
import java.util.Optional;

import static java.util.Objects.requireNonNull;

/**
 * Describes a patient's overall metainformation.
 * <p>
 * <b>Note:</b>
 * <i>
 * Some information are optional since they are not always at hand during emergency admissions. In these cases it's
 * important to simply register a patient within the system and fill out necessary information later on.
 * </i>
 * </p>
 *
 * @since 1.0.0
 */
@Builder
public final class PatientMetainformation {

    @Getter
    @NonNull
    private PatientId id;

    private MedicalCaseId medicalCaseId;
    private PatientName name;
    private LocalDate dateOfBirth;
    private PatientSex sex;


    public static PatientMetainformationBuilder builder(@NotNull PatientId patientId) {
        requireNonNull(patientId, "patient ID must not be null");

        return new PatientMetainformationBuilder()
                .id(patientId);
    }

    public Optional<MedicalCaseId> getMedicalCaseId() {
        return Optional.ofNullable(medicalCaseId);
    }

    public Optional<PatientName> getName() {
        return Optional.ofNullable(name);
    }

    public Optional<LocalDate> getDateOfBirth() {
        return Optional.ofNullable(dateOfBirth);
    }

    public PatientSex getSex() {
        return Optional.of(sex)
                .orElse(PatientSex.UNKNOWN);
    }

    public PatientMetainformation assignMedicalCase(@NotNull MedicalCaseId medicalCaseId) {
        // There is currently no safeguard in place. Our safety net is the uniqueness constraint on the database
        // level. However, this can still get accompanied by a dedicated lookup (using a service) before altering
        // the aggregate.
        return PatientMetainformation.builder(getId())
                .medicalCaseId(medicalCaseId)
                .name(getName().orElse(null))
                .dateOfBirth(getDateOfBirth().orElse(null))
                .sex(getSex())
                .build();
    }
}
