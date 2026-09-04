package eu.ampel_platform.messaging_sdk.inbox.model;

import com.google.protobuf.Message;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.TestOnly;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;

import static java.util.Objects.requireNonNull;

/**
 * Describes a single inbox record. An inbox record is a message that is getting ingested into a system and awaits
 * further processing.
 *
 * @since 1.0.0
 */
public final class InboxRecord {

    private static final Logger LOGGER = LoggerFactory.getLogger(InboxRecord.class);

    private final InboxRecordId id;
    private final InboxRecordPartitionKey partitionKey;
    private final Message payload;
    private final InboxRecordLifecycle lifecycle;

    InboxRecord(
            InboxRecordId id,
            InboxRecordPartitionKey partitionKey,
            Message payload,
            InboxRecordLifecycle lifecycle) {
        this.id = requireNonNull(id, "record ID must not be null");
        this.partitionKey = requireNonNull(partitionKey, "partition key must not be null");
        this.payload = requireNonNull(payload, "payload must not be null");
        this.lifecycle = requireNonNull(lifecycle, "lifecycle must not be null");
    }

    /**
     * Creates a new {@link InboxRecord} that is in {@link InboxRecordLifecycleState#PENDING} state awaiting further
     * processing.
     *
     * @param id           Identifier of the record.
     * @param partitionKey Key used to partition processing of multiple {@link InboxRecord}s. Use the same key for
     *                     different {@link InboxRecord}s if they should be processed in order!
     * @param payload      Actual message payload of the record.
     * @return An {@link InboxRecord} instance waiting for processing.
     */
    public static InboxRecord newlyRegistered(
            @NotNull InboxRecordId id,
            @NotNull InboxRecordPartitionKey partitionKey,
            @NotNull Message payload) {
        return new InboxRecord(
                id,
                partitionKey,
                payload,
                InboxRecordLifecycle.newlyPending());
    }

    /**
     * Creates a new {@link InboxRecord} based on the given information.
     * </p>
     * <b>Note:</b><i>This should never be used by any client. This is an internal function and target for change.</i>
     *
     * @param id           Identifier of the record.
     * @param partitionKey Key used to partition processing of multiple {@link InboxRecord}s. Use the same key for
     *                     different {@link InboxRecord}s if they should be processed in order!
     * @param payload      Actual message payload of the record.
     * @param lifecycle    Processing lifecycle of the record.
     * @return An {@link InboxRecord} instance configured with the given settings.
     */
    @TestOnly
    public static InboxRecord restore(
            @NotNull InboxRecordId id,
            @NotNull InboxRecordPartitionKey partitionKey,
            @NotNull Message payload,
            @NotNull InboxRecordLifecycle lifecycle) {
        return new InboxRecord(
                id,
                partitionKey,
                payload,
                lifecycle);
    }

    // -----------------------------------------------------------------------------------------------------------------
    // Getter (information handed out is REQUIRED to be immutable!!!)
    // -----------------------------------------------------------------------------------------------------------------
    public @NotNull InboxRecordId getId() {
        return id;
    }

    public @NotNull InboxRecordPartitionKey getPartitionKey() {
        return partitionKey;
    }

    public @NotNull Message getPayload() {
        return payload;
    }

    public @NotNull InboxRecordLifecycle getLifecycle() {
        return lifecycle;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // State transfers
    // -----------------------------------------------------------------------------------------------------------------

    /**
     * Marks this record as successfully completed so that it's not going to be picked up for any sort of processing
     * again.
     * </p>
     * <b>Note:</b><i>This can only be invoked when the inbox record is currently in
     * {@link InboxRecordLifecycleState#PROCESSING} state. Otherwise, an {@link IllegalStateException} is being
     * thrown.</i>
     *
     * @return A copy of this {@link InboxRecord} instance with its {@link InboxRecordLifecycle} set to
     * {@link InboxRecordLifecycleState#COMPLETED}. Returns the same {@link InboxRecord} instance if its already in
     * {@link InboxRecordLifecycleState#COMPLETED}.
     */
    public InboxRecord markAsSuccessfullyCompleted() {
        if (lifecycle.state().equals(InboxRecordLifecycleState.COMPLETED)) {
            LOGGER.debug("record with ID '{}' is already marked as completed", getId().id());
            return this;
        }

        if (!lifecycle.state().equals(InboxRecordLifecycleState.PROCESSING)) {
            throw new IllegalStateException("can only be marked as completed if it is in processing state");
        }

        var operationTimestamp = Instant.now();
        return new InboxRecord(
                id,
                partitionKey,
                payload,
                new InboxRecordLifecycle(
                        InboxRecordLifecycleState.COMPLETED,
                        lifecycle.createdAt(),
                        operationTimestamp,
                        operationTimestamp,
                        lifecycle.processingError()));
    }


    /**
     * Marks this record as ultimately failed so that it's not going to be picked up for any sort of processing
     * again.
     * </p>
     * <b>Note:</b><i>This can only be invoked when the inbox record is currently in
     * {@link InboxRecordLifecycleState#PROCESSING} state. Otherwise, an {@link IllegalStateException} is being
     * thrown.</i>
     *
     * @return A copy of this {@link InboxRecord} instance with its {@link InboxRecordLifecycle} set to
     * {@link InboxRecordLifecycleState#FAILED}.
     */
    public InboxRecord markAsFailed() {
        if (!lifecycle.state().equals(InboxRecordLifecycleState.PROCESSING)) {
            throw new IllegalStateException("can only be marked as failed if it is in processing state");
        }

        var operationTimestamp = Instant.now();
        return new InboxRecord(
                id,
                partitionKey,
                payload,
                new InboxRecordLifecycle(
                        InboxRecordLifecycleState.FAILED,
                        lifecycle.createdAt(),
                        operationTimestamp,
                        operationTimestamp,
                        lifecycle.processingError()
                                .registerTerminalFailure()));
    }

    /**
     * Marks this record as pending again so that it's going to be picked up for any sort of processing again.
     * </p>
     * <b>Note:</b><i>This can only be invoked when the inbox record is currently in
     * {@link InboxRecordLifecycleState#PROCESSING} state. Otherwise, an {@link IllegalStateException} is being
     * thrown.</i>
     *
     * @return A copy of this {@link InboxRecord} instance with its {@link InboxRecordLifecycle} set to
     * {@link InboxRecordLifecycleState#PENDING}.
     */
    public InboxRecord markForRetryAfterError(@NotNull Instant nextRetryAt) {
        if (!lifecycle.state().equals(InboxRecordLifecycleState.PROCESSING)) {
            throw new IllegalStateException("can only be marked as failed if it is in processing state");
        }
        requireNonNull(nextRetryAt, "next retry instant must not be null");

        var operationTimestamp = Instant.now();
        return new InboxRecord(
                id,
                partitionKey,
                payload,
                new InboxRecordLifecycle(
                        InboxRecordLifecycleState.WAITING_FOR_RETRY,
                        lifecycle.createdAt(),
                        operationTimestamp,
                        operationTimestamp,
                        lifecycle.processingError()
                                .registerFailureWithRetry(nextRetryAt)));
    }

    /**
     * Marks this record as being currently processed so that it's not going to be picked up for other sorts of
     * processing (double processing is prevented).
     * </p>
     * <b>Note:</b><i>This can only be invoked when the inbox record is currently in
     * {@link InboxRecordLifecycleState#PENDING} state. Otherwise, an {@link IllegalStateException} is being
     * thrown. Invoking this method on a record already marked for being processed does not do anything.</i>
     *
     * @return A copy of this {@link InboxRecord} instance with its {@link InboxRecordLifecycle} set to
     * {@link InboxRecordLifecycleState#PROCESSING}. Returns the same {@link InboxRecord} instance if its already in
     * {@link InboxRecordLifecycleState#PROCESSING}.
     */
    public InboxRecord markAsCurrentlyBeingProcessed() {
        if (lifecycle.state().equals(InboxRecordLifecycleState.PROCESSING)) {
            LOGGER.debug("record with ID '{}' is already marked as being currently being processed", getId().id());
            return this;
        }

        if (lifecycle.state().equals(InboxRecordLifecycleState.FAILED)
                || lifecycle.state().equals(InboxRecordLifecycleState.COMPLETED)) {
            throw new IllegalStateException("can only be marked as processed if it has not yet failed or completed");
        }

        return new InboxRecord(
                id,
                partitionKey,
                payload,
                new InboxRecordLifecycle(
                        InboxRecordLifecycleState.PROCESSING,
                        lifecycle.createdAt(),
                        lifecycle.processedAt(),
                        Instant.now(),
                        lifecycle.processingError()));
    }

    /**
     * Marks this record as pending so that it's going to be picked up for any sort of processing.
     * </p>
     * <b>Note:</b><i>This can only be invoked when the inbox record is currently in
     * {@link InboxRecordLifecycleState#PROCESSING} state. Otherwise, an {@link IllegalStateException} is being
     * thrown. Invoking this method on a record already marked for being requeued does not do anything.</i>
     *
     * @return A copy of this {@link InboxRecord} instance with its {@link InboxRecordLifecycle} set to
     * {@link InboxRecordLifecycleState#PENDING}. Returns the same {@link InboxRecord} instance if its already in
     * {@link InboxRecordLifecycleState#PENDING} state.
     */
    public InboxRecord markAsBeingRequeued() {
        if (lifecycle.state().equals(InboxRecordLifecycleState.PENDING)) {
            LOGGER.debug("record with ID '{}' is already marked as pending", getId().id());
            return this;
        }

        if (!lifecycle.state().equals(InboxRecordLifecycleState.PROCESSING)) {
            throw new IllegalArgumentException("can only be marked as being requeued if it is in processing state");
        }

        return new InboxRecord(
                id,
                partitionKey,
                payload,
                new InboxRecordLifecycle(
                        InboxRecordLifecycleState.PENDING,
                        lifecycle.createdAt(),
                        lifecycle.processedAt(),
                        Instant.now(),
                        lifecycle.processingError()));
    }

    /**
     * Checks whether this {@link InboxRecord} instance is in {@link InboxRecordLifecycleState#FAILED} state.
     *
     * @return <code>True</code> if this instance is in {@link InboxRecordLifecycleState#FAILED} state and
     * <code>false</code> otherwise.
     */
    public boolean isMarkedFailed() {
        return lifecycle.state().equals(InboxRecordLifecycleState.FAILED);
    }

    /**
     * Checks whether this {@link InboxRecord} instance is in {@link InboxRecordLifecycleState#WAITING_FOR_RETRY} state.
     *
     * @return <code>True</code> if this instance is in {@link InboxRecordLifecycleState#WAITING_FOR_RETRY} state and
     * <code>false</code> otherwise.
     */
    public boolean isMarkedForRetry() {
        return lifecycle.state().equals(InboxRecordLifecycleState.WAITING_FOR_RETRY);
    }
}
