package eu.ampel_platform.messaging.event.type.influx;

import eu.ampel_platform.messaging.event.AmpelEvent;
import eu.ampel_platform.messaging.event.AmpelEventSchema;

@AmpelEventSchema(name = "procedure.deleted", version = 1)
public record ProcedureDeletedEvent() implements AmpelEvent {
}
