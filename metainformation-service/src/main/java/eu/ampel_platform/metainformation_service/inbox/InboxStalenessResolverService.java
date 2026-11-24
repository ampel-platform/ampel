package eu.ampel_platform.metainformation_service.inbox;

import eu.ampel_platform.messaging_sdk.inbox.InboxRecordStalenessResolver;
import jakarta.transaction.Transactional;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import static java.util.Objects.requireNonNull;

/**
 * A wrapper around {@link InboxRecordStalenessResolver} for resolving stalled inbox records.
 *
 * @since 2.0.0
 */
@Service
public class InboxStalenessResolverService {

    private final InboxRecordStalenessResolver inboxStalenessResolver;

    public InboxStalenessResolverService(@NotNull InboxRecordStalenessResolver inboxStalenessResolver) {
        this.inboxStalenessResolver = requireNonNull(
                inboxStalenessResolver, "inbox record staleness resolver instance must not be null");
    }

    @Transactional
    public void resolve() {
        inboxStalenessResolver.resolve();
    }
}
