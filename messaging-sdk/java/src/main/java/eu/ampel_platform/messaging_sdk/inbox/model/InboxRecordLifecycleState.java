package eu.ampel_platform.messaging_sdk.inbox.model;

/**
 * Defines all lifecycle states that an {@link InboxRecord} can be in.
 *
 * @since 2.0.0
 */
public enum InboxRecordLifecycleState {
    PENDING,
    PROCESSING,
    WAITING_FOR_RETRY,
    COMPLETED,
    FAILED
}
