package eu.ampel_platform.messaging_sdk;

/**
 * Denotes an error stating that a given type URL (ProtoBuf specific) is invalid.
 *
 * @since 2.0.0
 */
public final class InvalidTypeUrlException extends Exception {
    public InvalidTypeUrlException(String message) {
        super(message);
    }
}
