package eu.ampel_platform.messaging_sdk;

/**
 * Denotes an error stating that a given message is structurally invalid and thus does not resemble an Ampel message.
 *
 * @since 2.0.0
 */
public final class InvalidAmpelMessage extends Exception {
    public InvalidAmpelMessage(String message, Throwable cause) {
        super(message, cause);
    }
}
