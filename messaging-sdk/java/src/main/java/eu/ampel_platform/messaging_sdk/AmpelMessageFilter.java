package eu.ampel_platform.messaging_sdk;

import eu.ampel_platform.messaging_sdk.generated.AmpelMessage;

import java.util.function.Predicate;

/**
 * Describes a simple filter for {@link AmpelMessage}s.
 *
 * @since 1.0.0
 */
public interface AmpelMessageFilter extends Predicate<AmpelMessage> {
}
