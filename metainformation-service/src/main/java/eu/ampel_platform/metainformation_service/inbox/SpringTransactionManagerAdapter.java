package eu.ampel_platform.metainformation_service.inbox;

import eu.ampel_platform.messaging_sdk.inbox.persistence.TransactionManager;
import org.jdbi.v3.core.Jdbi;
import org.jetbrains.annotations.NotNull;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.function.Supplier;

import static java.util.Objects.requireNonNull;

/**
 * An adapter for using Spring's transaction management capabilities in inbox related components.
 * <p>
 * This is a necessary component in order to use {@link Jdbi} used by the inbox as well as Spring's own data abstraction
 * layer and manage both of them using the same transaction manager. This effectively replaces the inbox' own
 * transaction manager and hands management over to Spring.
 * </p>
 *
 * @since 2.0.0
 */
public final class SpringTransactionManagerAdapter implements TransactionManager {

    private final Jdbi jdbi;
    private final TransactionTemplate template;

    public SpringTransactionManagerAdapter(@NotNull Jdbi jdbi,
                                           @NotNull TransactionTemplate template) {
        this.jdbi = requireNonNull(jdbi, "JDBI instance must not be null");
        this.template = requireNonNull(template, "transaction template must not be null");
    }

    @Override
    public void inTransaction(@NotNull Runnable task) {
        inTransaction(() -> {
            task.run();
            return null;
        });
    }

    @Override
    public <T> T inTransaction(@NotNull Supplier<T> task) {
        return template.execute(_ ->
                // This will register a handle owning a transaction or joining an existing one.
                // The library's inner parts will pick it up automatically since it gets registered as a thread local
                // variable.
                jdbi.withHandle(_ -> task.get()));
    }
}
