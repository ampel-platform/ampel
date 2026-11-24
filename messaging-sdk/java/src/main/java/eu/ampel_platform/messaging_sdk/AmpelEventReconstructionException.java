package eu.ampel_platform.messaging_sdk;

/**
 * Denotes an error stating that the payload of an {@link eu.ampel_platform.messaging_sdk.generated.AmpelMessage} does
 * not resemble a known Ampel event or that the latter one could not get reconstructed from it.
 *
 * @since 2.0.0
 */
public final class AmpelEventReconstructionException extends Exception {
    public AmpelEventReconstructionException(String message, Throwable cause) {
        super(message, cause);
    }

    public AmpelEventReconstructionException(String message) {
        super(message);
    }
}
