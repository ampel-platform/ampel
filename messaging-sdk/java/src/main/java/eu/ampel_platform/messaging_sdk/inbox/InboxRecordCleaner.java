package eu.ampel_platform.messaging_sdk.inbox;

import eu.ampel_platform.messaging_sdk.inbox.persistence.InboxRecordRepository;
import eu.ampel_platform.messaging_sdk.inbox.persistence.TransactionManager;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Range;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;

import static java.util.Objects.requireNonNull;

/**
 * A utility supposed to run as a background task that finds and cleans up
 * {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord}s within the system. Only records that have been
 * successfully processed will get cleaned up.
 * This is necessary to keep the size of the inbox storage at a minimum.
 * </p>
 * Tune the invocation of this task in a way so that it does not run too frequently which may compromise the
 * de-duplication feature of the inbox.
 *
 * @since 2.0.0
 */
public final class InboxRecordCleaner {

    private static final Logger LOGGER = LoggerFactory.getLogger(InboxRecordCleaner.class);

    private final InboxRecordRepository storage;
    private final TransactionManager txManager;
    private final Duration ageThreshold;
    private final int maxItemsPerCleanupRun;

    /**
     * Creates a new {@link InboxRecordCleaner} instance backed by the given storage solution.
     *
     * @param storage               storage solution for the cleaner. This should be the same as used for the
     *                              {@link Inbox} instance.
     * @param txManager             transaction manager for dealing with the storage solution in a transactional
     *                              fashion.
     * @param ageThreshold          minimum age of a record in completed state before being considered fully completed.
     *                              This setting is important to not clean up records too fast and allow the inbox
     *                              de-duplication to work longer for a specific record.
     * @param maxItemsPerCleanupRun maximum amount of records being cleaned up per run.
     */
    public InboxRecordCleaner(@NotNull InboxRecordRepository storage,
                              @NotNull TransactionManager txManager,
                              @NotNull Duration ageThreshold,
                              @Range(from = 1, to = Integer.MAX_VALUE) int maxItemsPerCleanupRun) {
        this.storage = requireNonNull(storage, "storage must not be null");
        this.txManager = requireNonNull(txManager, "transaction manager must not be null");
        this.ageThreshold = requireNonNull(ageThreshold, "age threshold must not be null");

        if (maxItemsPerCleanupRun <= 0) {
            throw new IllegalArgumentException("max items per cleanup run has to be a positive number");
        }
        this.maxItemsPerCleanupRun = maxItemsPerCleanupRun;
    }

    /**
     * Runs the actual cleanup task in the scope of a single transaction.
     */
    public void runCleanup() {
        txManager.inTransaction(() -> {
            var completedRecordIds = storage.findCompletedRecordIds(ageThreshold, maxItemsPerCleanupRun);
            if (completedRecordIds.isEmpty()) {
                LOGGER.debug("no completed inbox records found that qualify for cleanup");
                return;
            }

            storage.deleteById(completedRecordIds);
            LOGGER.info("cleaned up #{} inbox record(s)", completedRecordIds.size());
        });
    }
}
