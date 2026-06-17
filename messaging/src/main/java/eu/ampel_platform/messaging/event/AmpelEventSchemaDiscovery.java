package eu.ampel_platform.messaging.event;

import java.util.List;

/**
 * Allows for discovering {@link AmpelEventSchemaInformation}.
 */
interface AmpelEventSchemaDiscovery {

    /**
     * Discovers all Ampel event schemas within the system and returns them.
     *
     * @return The discovered Ampel event schemas.
     */
    List<AmpelEventSchemaInformation> discoverAmpelEventSchemas();
}
