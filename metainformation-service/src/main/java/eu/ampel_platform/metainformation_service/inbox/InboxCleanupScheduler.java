package eu.ampel_platform.metainformation_service.inbox;

import org.jetbrains.annotations.NotNull;
import org.springframework.scheduling.TaskScheduler;

import java.time.Duration;
import java.time.Instant;

import static java.util.Objects.requireNonNull;

/**
 * A Spring-specific scheduler for running {@link InboxCleanupService} jobs using a fixed invocation delay.
 *
 * @since 1.0.0
 */
public final class InboxCleanupScheduler {

    private final InboxCleanupService service;

    public InboxCleanupScheduler(@NotNull InboxCleanupService service,
                                 @NotNull TaskScheduler scheduler,
                                 @NotNull Duration executionDelay) {
        this.service = requireNonNull(service, "cleanup service must not be null");
        requireNonNull(scheduler, "scheduler must not be null");
        requireNonNull(executionDelay, "execution delay must not be null");

        scheduler.scheduleWithFixedDelay(
                this::run,
                Instant.now().plus(executionDelay),
                executionDelay);
    }

    public void run() {
        service.clean();
    }
}
