package eu.ampel_platform.messaging_sdk.inbox.persistence.db;

import eu.ampel_platform.messaging_sdk.inbox.persistence.TransactionManager;
import org.jdbi.v3.core.HandleCallback;
import org.jdbi.v3.core.HandleConsumer;
import org.jdbi.v3.core.Jdbi;
import org.jetbrains.annotations.NotNull;

import java.util.function.Supplier;

import static java.util.Objects.requireNonNull;

/**
 * A {@link TransactionManager} capable of managing transactions backed by <code>JDBI</code>.
 *
 * @since 2.0.0
 */
public final class JdbiTransactionManager implements TransactionManager {

    private final Jdbi jdbi;

    /**
     * Creates a new {@link JdbiTransactionManager} instance backed by the given {@link Jdbi} instance for transaction
     * management.
     *
     * @param jdbi the {@link Jdbi} instance.
     */
    public JdbiTransactionManager(@NotNull Jdbi jdbi) {
        this.jdbi = requireNonNull(jdbi, "JDBI instance must not be null");
    }

    /**
     * Runs the given task in the scope of a single <code>JDBI</code> transaction.
     * <p>
     * Participating components in need of the <code>JDBI</code> transaction (in form of a
     * {@link org.jdbi.v3.core.Handle}) can obtain it by using {@link Jdbi#useHandle(HandleConsumer)} as long as it's
     * being run on the same thread (since <code>JDBI</code> implicitly initiates a thread local registration of the
     * handle).
     * </p>
     * <b>Do NOT use this in concurrent streams as they use different threads which escapes the transaction scope and
     * may have unintended consequences!
     * <pre><code>
     *      // Do not do this!
     *      txManager.inTransaction(() -> {
     *          collection.parallelStream().forEach(...)
     *      });
     * </code></pre>
     * </b>
     *
     * @param task the task to run.
     * @see Jdbi#useHandle(HandleConsumer)
     */
    @Override
    public void inTransaction(@NotNull Runnable task) {
        jdbi.useTransaction(_ -> task.run());
    }

    /**
     * Runs the given task in the scope of a single <code>JDBI</code> transaction and returns its result.
     * <p>
     * Participating components in need of the <code>JDBI</code> transaction (in form of a
     * {@link org.jdbi.v3.core.Handle}) can obtain it by using {@link Jdbi#withHandle(HandleCallback)} as long as it's
     * being run on the same thread (since <code>JDBI</code> implicitly initiates a thread local registration of the
     * handle).
     * </p>
     * <b>Do NOT use this in concurrent streams as they use different threads which escapes the transaction scope and
     * may have unintended consequences!
     * <pre><code>
     *      // Do not do this!
     *      var result = txManager.inTransaction(() -> {
     *          return collection.parallelStream().reduce(...)
     *      });
     * </code></pre>
     * </b>
     *
     * @param task the task to run
     * @param <T>  Type of the task's result.
     * @return The result of running the task in the scope of a <code>JDBI</code> transaction.
     * @see Jdbi#withHandle(HandleCallback)
     */
    @Override
    public <T> T inTransaction(@NotNull Supplier<T> task) {
        return jdbi.inTransaction(_ -> task.get());
    }
}
