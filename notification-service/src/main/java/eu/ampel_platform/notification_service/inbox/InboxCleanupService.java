package eu.ampel_platform.notification_service.inbox;

import eu.ampel_platform.messaging_sdk.inbox.InboxRecordCleaner;
import jakarta.transaction.Transactional;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import static java.util.Objects.requireNonNull;

/**
 * A wrapper around {@link InboxRecordCleaner} for cleaning up inbox records.
 *
 * @since 1.0.0
 */
@Service
public class InboxCleanupService {

    private final InboxRecordCleaner inboxCleaner;

    public InboxCleanupService(@NotNull final InboxRecordCleaner inboxCleaner) {
        this.inboxCleaner = requireNonNull(inboxCleaner, "inbox record cleaner instance must not be null");
    }

    @Transactional
    public void clean() {
        inboxCleaner.runCleanup();
    }
}
