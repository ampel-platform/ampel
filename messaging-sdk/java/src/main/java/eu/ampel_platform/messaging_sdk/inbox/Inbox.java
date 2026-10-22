package eu.ampel_platform.messaging_sdk.inbox;

import com.google.protobuf.Message;
import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord;
import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordId;
import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordPartitionKey;
import eu.ampel_platform.messaging_sdk.inbox.persistence.InboxRecordRepository;
import eu.ampel_platform.messaging_sdk.inbox.persistence.TransactionManager;
import org.jetbrains.annotations.NotNull;

import static java.util.Objects.requireNonNull;

/**
 * Entry point for ingesting messages in the form of {@link InboxRecord}s into the system.
 * </p>
 * <b>Do NOT use multiple instances of this class. Instead, stick to one and share it.</b>
 *
 * @since 1.0.0
 */
public final class Inbox {

    private final InboxRecordRepository storage;
    private final TransactionManager txManager;

    /**
     * Creates a new {@link Inbox} instance backed by the given storage solution.
     *
     * @param storage   storage solution for the inbox.
     * @param txManager transaction manager for dealing with the storage solution in a transactional fashion.
     */
    public Inbox(@NotNull InboxRecordRepository storage,
                 @NotNull TransactionManager txManager) {
        this.storage = requireNonNull(storage, "storage must not be null");
        this.txManager = requireNonNull(txManager, "transaction manager must not be null");
    }

    /**
     * Registers a single {@link InboxRecord} in the system.
     * </p>
     * If an {@link InboxRecord} with the given ID already exists then this is a no-op.
     *
     * @param id           identifies the record.
     * @param partitionKey identifies the partition the record is associated with. Use the same partition key for
     *                     records that are supposed to be processed sequentially (if order is important).
     * @param payload      message payload of the record.
     */
    public synchronized void store(@NotNull String id,
                                   @NotNull String partitionKey,
                                   @NotNull Message payload) {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("record ID must neither be null nor blank");
        }
        if (partitionKey == null || partitionKey.isBlank()) {
            throw new IllegalArgumentException("partition key must neither be null nor blank");
        }
        if (payload == null) {
            throw new IllegalArgumentException("payload must not be null");
        }

        txManager.inTransaction(() -> {
            storage.store(InboxRecord.newlyRegistered(
                    new InboxRecordId(id),
                    new InboxRecordPartitionKey(partitionKey),
                    payload));
        });
    }
}
