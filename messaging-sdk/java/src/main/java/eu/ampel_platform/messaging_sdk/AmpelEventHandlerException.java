package eu.ampel_platform.messaging_sdk;

/**
 * Denotes an error stating that an event could not be handled.
 *
 * @since 2.0.0
 */
public class AmpelEventHandlerException extends Exception {
    public AmpelEventHandlerException(String message, Throwable cause) {
        super(message, cause);
    }

    public AmpelEventHandlerException(String message) {
        super(message);
    }
}
