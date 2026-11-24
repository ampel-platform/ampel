package eu.ampel_platform.notification_service.inbox;

import org.jetbrains.annotations.NotNull;
import org.springframework.scheduling.TaskScheduler;

import java.time.Duration;
import java.time.Instant;

import static java.util.Objects.requireNonNull;

/**
 * A Spring-specific scheduler for running {@link InboxProcessingService} jobs using a fixed invocation delay.
 *
 * @since 2.0.0
 */
public final class InboxProcessingScheduler {

    private final InboxProcessingService service;

    public InboxProcessingScheduler(@NotNull InboxProcessingService service,
                                    @NotNull TaskScheduler scheduler,
                                    @NotNull Duration executionDelay) {
        this.service = requireNonNull(service, "inbox processing service must not be null");
        requireNonNull(scheduler, "scheduler must not be null");
        requireNonNull(executionDelay, "execution delay must not be null");

        scheduler.scheduleWithFixedDelay(
                this::process,
                Instant.now().plus(executionDelay),
                executionDelay);
    }

    public void process() {
        service.process();
    }
}
