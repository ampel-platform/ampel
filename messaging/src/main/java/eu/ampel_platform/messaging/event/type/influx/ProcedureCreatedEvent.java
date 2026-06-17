package eu.ampel_platform.messaging.event.type.influx;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import eu.ampel_platform.messaging.event.AmpelEvent;
import eu.ampel_platform.messaging.event.AmpelEventSchema;

import java.time.Instant;
import java.util.UUID;

import static java.util.Objects.requireNonNull;

@AmpelEventSchema(name = "procedure.created", version = 1)
@JsonIgnoreProperties(ignoreUnknown = true)
public record ProcedureCreatedEvent(
        UUID procedureId,
        String medicalCaseId,
        String sourceSystemId,
        String procedureCode,
        Instant conductedAt
) implements AmpelEvent {
    public ProcedureCreatedEvent {
        requireNonNull(procedureId, "procedure ID must not be null");

        requireNonNull(medicalCaseId, "medical case ID must not be null");
        if (medicalCaseId.isBlank()) {
            throw new IllegalArgumentException("medical case ID must not be blank");
        }

        requireNonNull(sourceSystemId, "source system ID must not be null");
        if (sourceSystemId.isBlank()) {
            throw new IllegalArgumentException("source system ID must not be blank");
        }

        requireNonNull(procedureCode, "procedure code must not be null");
        if (procedureCode.isBlank()) {
            throw new IllegalArgumentException("procedure code must not be blank");
        }

        requireNonNull(conductedAt, "conducted at timestamp must not be null");
    }
}
