package eu.ampel_platform.messaging_sdk.inbox.persistence;

import org.jetbrains.annotations.NotNull;

import java.util.function.Supplier;

/**
 * Describes an entity capable of managing transaction when interacting with a {@link InboxRecordRepository}.
 * <p>
 * This however, is not limited to {@link InboxRecordRepository} implementations, but can also be used to manage
 * transactions covering other sorts of repositories. In such cases it's necessary to check if different abstractions
 * and implementations can actually be managed by a single manager.
 * </p>
 * Use this when dealing with coherent database operations or application functionality that must behave transactional
 * in conjunction with database operations.
 *
 * @since 1.0.0
 */
public interface TransactionManager {

    /**
     * Runs a specific task in the scope of a single transaction. This task can be made up out of several smaller
     * sub-tasks forming a single unit of work.
     *
     * @param task the task to run.
     */
    void inTransaction(@NotNull Runnable task);

    /**
     * Runs a specific task in the scope of a single transaction returning the outcome of said task. This task can be
     * made up out of several smaller sub-tasks forming a single unit of work.
     *
     * @param task the task to run
     * @param <T>  type of the task outcome
     * @return The outcome of running the task in the scope of a transaction.
     */
    <T> T inTransaction(@NotNull Supplier<T> task);
}
