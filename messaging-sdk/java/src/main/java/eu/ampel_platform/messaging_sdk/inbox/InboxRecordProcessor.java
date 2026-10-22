package eu.ampel_platform.messaging_sdk.inbox;

import com.google.protobuf.Descriptors;
import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord;
import eu.ampel_platform.messaging_sdk.inbox.persistence.InboxRecordRepository;
import eu.ampel_platform.messaging_sdk.inbox.persistence.TransactionManager;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Range;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import static java.util.Objects.requireNonNull;

/**
 * A utility supposed to run as a background task that processes {@link InboxRecord}s that have been ingested into the
 * system.
 * </p>
 * <b>Do NOT use multiple instances of this class. Instead, stick to one and share it.</b>
 *
 * @since 1.0.0
 */
public final class InboxRecordProcessor {

    private static final Logger LOGGER = LoggerFactory.getLogger(InboxRecordProcessor.class);

    private final InboxRecordRepository storage;
    private final TransactionManager txManager;
    private final int maxItemsPerRun;
    private final InboxRecordRetryStrategy retryStrategy;
    private final Map<Descriptors.Descriptor, InboxRecordHandler> handlers;
    private final List<BlockingQueue<InboxRecord>> partitions;

    /**
     * Creates a new {@link InboxRecordProcessor} instance backed by the given storage solution.
     *
     * @param storage        storage solution for the processor in order to obtain {@link InboxRecord}s within the
     *                       system. This should be the same as used for the {@link Inbox} instance.
     * @param txManager      transaction manager for dealing with the storage solution in a transactional fashion.
     * @param maxItemsPerRun maximum number of records to process per run.
     * @param retryStrategy  retry strategy solution for deciding on retries in case of processing errors.
     * @param handlers       handlers for specific message types a record can carry.
     */
    public InboxRecordProcessor(@NotNull InboxRecordRepository storage,
                                @NotNull TransactionManager txManager,
                                @Range(from = 1, to = Integer.MAX_VALUE) int maxItemsPerRun,
                                @NotNull InboxRecordRetryStrategy retryStrategy,
                                @NotNull Map<Descriptors.Descriptor, InboxRecordHandler> handlers) {
        this.storage = requireNonNull(storage, "storage must not be null");
        this.txManager = requireNonNull(txManager, "transaction manager must not be null");

        if (maxItemsPerRun <= 0) {
            throw new IllegalArgumentException("max items per run has to be a positive number");
        }
        this.maxItemsPerRun = maxItemsPerRun;
        this.retryStrategy = requireNonNull(retryStrategy, "retry strategy must not be null");
        this.handlers = requireNonNull(handlers, "handlers must not be null");
        partitions = new LinkedList<>();
    }

    /**
     * Runs the actual processing of {@link InboxRecord}s within the system.
     */
    public synchronized void runProcessing() {
        if (!partitions.isEmpty()) {
            // not interfering with other runs (naive solution for the time being)
            return;
        }

        var claimedInboxRecords = txManager.inTransaction(() -> storage.claimPendingRecords(maxItemsPerRun));

        partitions.addAll(partitionClaimedInboxRecords(claimedInboxRecords));

        while (!partitions.isEmpty()) {
            var partitionQueue = partitions.getFirst();

            var record = partitionQueue.poll();
            if (record == null) {
                partitions.removeFirst();
                continue;
            }

            try {
                var inboxRecordHandler = handlers.get(record.getPayload().getDescriptorForType());
                if (inboxRecordHandler == null) {
                    throw new InboxRecordMissingHandlerException("no registered handler for record with payload of " +
                            "type '%s'".formatted(record.getPayload().getClass().getName()));
                }

                inboxRecordHandler.accept(record);
                record = record.markAsSuccessfullyCompleted();
            } catch (Exception e) {
                if (e instanceof RuntimeException) {
                    // Simply assuming that runtime exceptions are usually ones that cannot be retried as they
                    // mostly refer to bugs or other drastic causes.
                    record = record.markAsFailed();
                    LOGGER.error("handling record with ID '{}' resulted in terminal error - record is being marked " +
                            "as failed", record.getId().id(), e);
                } else {
                    var delayMs = retryStrategy.calculateNextRetryDelayMs(
                            record.getLifecycle().processingError().failureCount() + 1);


                    if ((delayMs.isPresent())) {
                        var nextRetryAt = Instant.now().plusMillis(delayMs.get());
                        record = record.markForRetryAfterError(nextRetryAt);
                        LOGGER.warn("handling record with ID '{}' lead to error - handling record will be retried " +
                                "after '{}'", record.getId().id(), nextRetryAt, e);
                    } else {
                        record = record.markAsFailed();
                        LOGGER.error("handling record with ID '{}' lead to repeated error and exceeded maximum retry" +
                                "count - record is being marked as failed", record.getId().id(), e);
                    }
                }
            }

            var processedRecord = record;
            txManager.inTransaction(() -> storage.update(processedRecord));


            if (processedRecord.isMarkedFailed() || processedRecord.isMarkedForRetry()) {
                var requeuedRecords = unclaimRemainingRecordsInPartition(partitionQueue);
                txManager.inTransaction(() -> {
                    for (InboxRecord r : requeuedRecords) {
                        storage.update(r);
                    }
                });
            }

            if (partitionQueue.isEmpty()) {
                partitions.removeFirst();
            }
        }
    }

    private List<BlockingQueue<InboxRecord>> partitionClaimedInboxRecords(
            final List<InboxRecord> records) {
        var partitions = new LinkedHashMap<String, BlockingQueue<InboxRecord>>();

        for (InboxRecord record : records) {
            partitions.merge(
                    record.getPartitionKey().key(),
                    new LinkedBlockingQueue<>(List.of(record)),
                    (existingQueue, singleRecordQueue) -> {
                        var temp = new LinkedBlockingQueue<InboxRecord>();
                        existingQueue.drainTo(temp);
                        singleRecordQueue.drainTo(temp);
                        return temp;
                    }
            );
        }

        return partitions.values()
                .stream()
                .toList();
    }

    private List<InboxRecord> unclaimRemainingRecordsInPartition(
            final BlockingQueue<InboxRecord> queue) {
        var tmp = new LinkedList<InboxRecord>();
        queue.drainTo(tmp);

        return tmp.stream()
                .map(InboxRecord::markAsBeingRequeued)
                .toList();
    }
}
