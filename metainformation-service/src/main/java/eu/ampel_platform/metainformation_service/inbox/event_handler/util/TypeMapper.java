package eu.ampel_platform.metainformation_service.inbox.event_handler.util;

import eu.ampel_platform.messaging_sdk.generated.common.AmpelSex;
import eu.ampel_platform.metainformation_service.metainformation.patient.model.PatientSex;
import org.jetbrains.annotations.NotNull;

/**
 * Bundler for utility functions required for handling incoming events.
 *
 * @since 1.0.0
 */
public final class TypeMapper {
    private TypeMapper() {
    }

    public static PatientSex mapEventSex(@NotNull AmpelSex sex) {
        return switch (sex) {
            case FEMALE -> PatientSex.FEMALE;
            case MALE -> PatientSex.MALE;
            case UNKNOWN, UNRECOGNIZED -> PatientSex.UNKNOWN;
        };
    }
}
