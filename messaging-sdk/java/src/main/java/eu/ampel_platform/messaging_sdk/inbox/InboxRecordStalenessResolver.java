package eu.ampel_platform.messaging_sdk.inbox;

import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord;
import eu.ampel_platform.messaging_sdk.inbox.persistence.InboxRecordRepository;
import eu.ampel_platform.messaging_sdk.inbox.persistence.TransactionManager;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Range;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;

import static java.util.Objects.requireNonNull;

/**
 * A utility supposed to run as a background task that finds stale records and requeues them for processing.
 * </p>
 * An {@link InboxRecord} is considered stale if it's in
 * {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordLifecycleState#PROCESSING} for an extended period of
 * time. This duration is adjustable.
 *
 * @since 2.0.0
 */
public final class InboxRecordStalenessResolver {

    private static final Logger LOGGER = LoggerFactory.getLogger(InboxRecordStalenessResolver.class);

    private final InboxRecordRepository storage;
    private final TransactionManager txManager;
    private final Duration stalenessThreshold;
    private final int maxItemsPerRun;

    /**
     * Creates a new {@link InboxRecordStalenessResolver} instance backed by the given storage solution.
     *
     * @param storage            storage solution for the resolver in order to obtain {@link InboxRecord}s within the
     *                           system. This should be the same as used for the {@link Inbox} instance.
     * @param txManager          transaction manager for dealing with the storage solution in a transactional fashion.
     * @param stalenessThreshold minimum duration a record needs to be in processing state before being considered
     *                           stale.
     * @param maxItemsPerRun     maximum number of records being resolved per run.
     */
    public InboxRecordStalenessResolver(@NotNull InboxRecordRepository storage,
                                        @NotNull TransactionManager txManager,
                                        @NotNull Duration stalenessThreshold,
                                        @Range(from = 1, to = Integer.MAX_VALUE) int maxItemsPerRun) {
        this.storage = requireNonNull(storage, "storage must not be null");
        this.txManager = requireNonNull(txManager, "transaction manager must not be null");
        this.stalenessThreshold = requireNonNull(stalenessThreshold, "staleness threshold must not be null");

        if (maxItemsPerRun <= 0) {
            throw new IllegalArgumentException("max items per run has to be a positive number");
        }
        this.maxItemsPerRun = maxItemsPerRun;
    }

    /**
     * Runs the actual resolve process.
     */
    public void resolve() {
        txManager.inTransaction(() -> {
            var stalledRecords = storage.findStalledRecords(stalenessThreshold, maxItemsPerRun);
            if (stalledRecords.isEmpty()) {
                LOGGER.debug("no stale inbox records found that need to be resolved");
                return;
            }

            for (InboxRecord stalledRecord : stalledRecords) {
                var tmp = stalledRecord.markAsBeingRequeued();
                storage.update(tmp);
            }
            LOGGER.info("resolved #{} stale inbox record(s)", stalledRecords.size());
        });
    }
}
