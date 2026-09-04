package eu.ampel_platform.messaging_sdk.inbox.persistence;

import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecord;
import eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordId;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Range;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

/**
 * Describes an entity for managing the persistence of {@link InboxRecord}s.
 *
 * @since 1.0.0
 */
public interface InboxRecordRepository {

    /**
     * Finds {@link InboxRecord}s that are in
     * {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordLifecycleState#PENDING} state and claims them for
     * processing. Thus, these records are put into a
     * {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordLifecycleState#PROCESSING} state (which is
     * immediately reflected within the repository) before being returned.
     * <p>
     * {@link InboxRecord}s belong to a specific partition (see {@link InboxRecord#getPartitionKey()}). Claiming records
     * takes that into account so that only records can be returned that do not belong to a partition that is either:
     * <ul>
     *      <li>associated with other records currently being processed</li>
     *      <li>associated with failed records</li>
     *      <li>associated with records waiting for retry while the waiting time has not yet elapsed</li>
     * </ul>
     * </p>
     * The amount of {@link InboxRecord}s potentially being claimed is limited by the specified batch size.
     *
     * @param batchSize maximum number of {@link InboxRecordId}s to claim.
     * @return Claimed records.
     */
    List<InboxRecord> claimPendingRecords(@Range(from = 1, to = Integer.MAX_VALUE) int batchSize);

    /**
     * Stores the given {@link InboxRecord}.
     * </p>
     * <b>If a record with the same {@link InboxRecordId} already exists then this is not altering anything within the
     * repository itself!</b> This way the repository achieves deduplication when it comes to dealing with messages
     * delivered more than once.
     *
     * @param record the record to store.
     */
    void store(@NotNull InboxRecord record);

    /**
     * Updates the given {@link InboxRecord}.
     * </p>
     * <b>If this record does not yet exist then this is not altering anything within the repository.</b>
     *
     * @param record the record to update.
     */
    void update(@NotNull InboxRecord record);

    /**
     * Deletes {@link InboxRecord}s in the repository identified by the given {@link InboxRecordId}s.
     *
     * @param recordIds IDs of the records to delete.
     */
    void deleteById(@NotNull List<InboxRecordId> recordIds);

    /**
     * Finds a {@link InboxRecord} identified by the given {@link InboxRecordId}.
     *
     * @param id identifies the record.
     * @return The found {@link InboxRecord} if there is any.
     */
    Optional<InboxRecord> findById(@NotNull InboxRecordId id);

    /**
     * Finds {@link InboxRecordId}s of {@link InboxRecord}s that are considered successfully completed. These are
     * records that are in {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordLifecycleState#COMPLETED}
     * state.
     * </p>
     * The amount of {@link InboxRecordId}s potentially being found is limited by the specified batch size.
     *
     * @param ageThreshold minimum duration of a record being in completed state before being rendered fully completed.
     * @param batchSize    maximum number of {@link InboxRecordId}s to find.
     * @return Found record IDs.
     */
    List<InboxRecordId> findCompletedRecordIds(@NotNull Duration ageThreshold,
                                               @Range(from = 1, to = Integer.MAX_VALUE) int batchSize);

    /**
     * Finds {@link InboxRecord}s that are considered stalled. A stalled record is one that is in
     * {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordLifecycleState#PROCESSING} state for longer than
     * the given threshold.
     * </p>
     * The amount of {@link InboxRecord}s potentially being found is limited by the specified batch size.
     *
     * @param stallThreshold maximum duration of a record being in processing state before being rendered stalled.
     * @param batchSize      maximum number of {@link InboxRecord}s to find.
     * @return Found records.
     */
    List<InboxRecord> findStalledRecords(@NotNull Duration stallThreshold,
                                         @Range(from = 1, to = Integer.MAX_VALUE) int batchSize);

    /**
     * Finds {@link InboxRecord}s that are considered failed. A failed record is one that is in
     * {@link eu.ampel_platform.messaging_sdk.inbox.model.InboxRecordLifecycleState#FAILED} state.
     * </p>
     * The amount of {@link InboxRecord}s potentially being found is limited by the specified batch size.
     *
     * @param batchSize maximum number of {@link InboxRecord}s to find.
     * @return Found records.
     */
    List<InboxRecord> findFailedRecords(@Range(from = 1, to = Integer.MAX_VALUE) int batchSize);
}
