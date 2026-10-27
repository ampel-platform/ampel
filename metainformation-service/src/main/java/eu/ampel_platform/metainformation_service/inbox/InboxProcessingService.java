package eu.ampel_platform.metainformation_service.inbox;

import eu.ampel_platform.messaging_sdk.inbox.InboxRecordProcessor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static java.util.Objects.requireNonNull;

/**
 * A wrapper around {@link InboxRecordProcessor} for claiming and processing inbox records.
 *
 * @since 1.0.0
 */
@Service
public class InboxProcessingService {

    private final InboxRecordProcessor inboxRecordProcessor;

    public InboxProcessingService(@NotNull InboxRecordProcessor inboxRecordProcessor) {
        this.inboxRecordProcessor = requireNonNull(inboxRecordProcessor,
                "inbox record processor instance must not be null");
    }

    @Transactional
    public void process() {
        inboxRecordProcessor.runProcessing();
    }
}
