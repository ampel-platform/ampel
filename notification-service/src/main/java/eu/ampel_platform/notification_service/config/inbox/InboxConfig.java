package eu.ampel_platform.notification_service.config.inbox;

import com.google.protobuf.Descriptors;
import com.google.protobuf.util.JsonFormat;
import eu.ampel_platform.messaging_sdk.*;
import eu.ampel_platform.messaging_sdk.generated.AmpelLaboratoryScoreCalculatedEvent;
import eu.ampel_platform.messaging_sdk.generated.events.influx.*;
import eu.ampel_platform.messaging_sdk.inbox.*;
import eu.ampel_platform.messaging_sdk.inbox.persistence.InboxPayloadSerializer;
import eu.ampel_platform.messaging_sdk.inbox.persistence.InboxRecordRepository;
import eu.ampel_platform.messaging_sdk.inbox.persistence.ProtoBufByteSerializer;
import eu.ampel_platform.messaging_sdk.inbox.persistence.TransactionManager;
import eu.ampel_platform.messaging_sdk.inbox.persistence.db.JdbiPostgresInboxRecordRepository;
import eu.ampel_platform.notification_service.inbox.*;
import eu.ampel_platform.notification_service.inbox.event_handler.FallbackEventHandler;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.transaction.NoOpTransactionHandler;
import org.jdbi.v3.postgres.PostgresPlugin;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.listener.BatchAcknowledgingMessageListener;
import org.springframework.kafka.listener.ContainerProperties;
import org.springframework.kafka.listener.KafkaMessageListenerContainer;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.SimpleAsyncTaskScheduler;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import javax.sql.DataSource;
import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class InboxConfig {

    private static final String AMPEL_MESSAGE_KAFKA_TOPIC = "ampel";
    private static final String APPLICATION_IDENTIFIER = "notification-service";

    @Value("${application.inbox.cleanup.cleanup-rate-ms}")
    private int inboxCleanupRateMs;

    @Value("${application.inbox.cleanup.cleanup-max-items}")
    private int inboxCleanupMaxItems;

    @Value("${application.inbox.cleanup.cleanup-item-age-threshold-ms}")
    private int inboxCleanupItemAgeThresholdMs;

    @Value("${application.inbox.staleness-resolver.staleness-resolver-rate-ms}")
    private int inboxStalenessResolverRateMs;

    @Value("${application.inbox.staleness-resolver.staleness-resolver-max-items}")
    private int inboxStalenessResolverMaxItems;

    @Value("${application.inbox.staleness-resolver.staleness-resolver-item-processing-age-threshold-ms}")
    private int inboxStalenessResolverItemProcessingAgeThreshold;

    @Value("${application.inbox.processing.processing-rate-ms}")
    private int inboxProcessingRateMs;

    @Value("${application.inbox.processing.processing-max-items}")
    private int inboxProcessingMaxItems;

    @Value("${application.inbox.processing.processing-retry-base-interval-ms}")
    private int inboxProcessingRetryBaseIntervalMs;

    @Value("${application.inbox.processing.processing-max-retries}")
    private int inboxProcessingMaxRetries;

    @Qualifier("APP_RECOGNIZED_EVENTS")
    @Bean
    public List<Descriptors.Descriptor> recognizedEventDescriptors() {
        return List.of(AmpelLaboratoryScoreCalculatedEvent.getDescriptor(),
                AmpelPatientCreatedEvent.getDescriptor(),
                AmpelPatientUpdatedEvent.getDescriptor(),
                AmpelPatientDiedEvent.getDescriptor(),
                AmpelPatientDeletedEvent.getDescriptor(),
                AmpelPatientAssignedMedicalCase.getDescriptor());
    }

    @Bean
    public AmpelMessageFilter ampelMessageTypeFilter(
            @Qualifier("APP_RECOGNIZED_EVENTS") List<Descriptors.Descriptor> recognizedEventDescriptors) {
        return AmpelMessageFilterFactory.createEventTypeFilter(recognizedEventDescriptors);
    }

    @Bean
    public AmpelEventTypeRegistry eventTypeRegistry() {
        var discoveredTypes = AmpelEventTypeRegistry.discoverParsersByEventUrl();
        return AmpelEventTypeRegistry.withParsersForEventTypeUrls(discoveredTypes);
    }

    @Bean
    public AmpelMessageSerde eventSerde(AmpelEventTypeRegistry registry) {
        return new AmpelMessageSerde(APPLICATION_IDENTIFIER, registry);
    }

    @Bean
    public AmpelEventHandlerRouter ampelEventHandlerRouter(
            // these are getting auto-injected since they are implemented as @Component annotated classes and thus known
            // to Spring. There's no explicit bean declaration in any config!
            List<AmpelEventHandler<?>> ampelEventHandlers) {
        return AmpelEventHandlerRouter.newBuilder(new FallbackEventHandler())
                .withEventHandlers(ampelEventHandlers)
                .build();
    }

    @Bean
    public Jdbi jdbi(DataSource dataSource) {
        var jdbi = Jdbi.create(new TransactionAwareDataSourceProxy(dataSource));
        jdbi.setTransactionHandler(new NoOpTransactionHandler());
        jdbi.installPlugin(new PostgresPlugin());

        return jdbi;
    }

    @Bean
    public InboxPayloadSerializer inboxSerializer() {
        var typeRegistry = JsonFormat.TypeRegistry.newBuilder()
                .add(AmpelPatientCreatedEvent.getDescriptor())
                .add(AmpelPatientAssignedMedicalCase.getDescriptor())
                .add(AmpelLaboratoryScoreCalculatedEvent.getDescriptor())
                .build();

        return new ProtoBufByteSerializer(typeRegistry);
    }

    @Bean
    public InboxRecordRepository inboxRepo(Jdbi jdbi,
                                           InboxPayloadSerializer serializer) {
        return new JdbiPostgresInboxRecordRepository(jdbi, serializer);
    }

    @Qualifier("SPRING_TX_MANAGER")
    @Bean
    public TransactionManager transactionmanager(Jdbi jdbi, PlatformTransactionManager ptm) {
        return new SpringTransactionManagerAdapter(jdbi, new TransactionTemplate(ptm));
    }

    @Bean
    public Inbox inbox(InboxRecordRepository repo,
                       @Qualifier("SPRING_TX_MANAGER") TransactionManager springTransactionManager) {
        return new Inbox(repo, springTransactionManager);
    }


    // -----------------------------------------------------------------------------------------------------------------
    // INBOX - BACKGROUND JOBS
    // -----------------------------------------------------------------------------------------------------------------
    @Qualifier("INBOX_SCHEDULER")
    @Bean
    public TaskScheduler inboxProcessingTaskScheduler() {
        var scheduler = new SimpleAsyncTaskScheduler();
        scheduler.setVirtualThreads(true);
        scheduler.setThreadNamePrefix("inbox-scheduler");
        return scheduler;
    }

    // CLEANER
    @Bean
    public InboxRecordCleaner inboxRecordCleaner(
            InboxRecordRepository repo,
            @Qualifier("SPRING_TX_MANAGER") TransactionManager springTransactionManager) {
        return new InboxRecordCleaner(
                repo,
                springTransactionManager,
                Duration.ofMillis(inboxCleanupRateMs),
                inboxCleanupMaxItems);
    }

    @Bean
    public InboxCleanupScheduler inboxCleanupScheduler(InboxCleanupService cleanupService,
                                                       @Qualifier("INBOX_SCHEDULER") TaskScheduler inboxScheduler) {
        return new InboxCleanupScheduler(
                cleanupService,
                inboxScheduler,
                Duration.ofMillis(inboxCleanupItemAgeThresholdMs));
    }

    // STALENESS RESOLVER
    @Bean
    public InboxRecordStalenessResolver inboxRecordStalenessResolver(
            InboxRecordRepository repo,
            @Qualifier("SPRING_TX_MANAGER") TransactionManager springTransactionManager) {
        return new InboxRecordStalenessResolver(
                repo,
                springTransactionManager,
                Duration.ofMillis(inboxStalenessResolverItemProcessingAgeThreshold),
                inboxStalenessResolverMaxItems);
    }

    @Bean
    public InboxStalenessResolverScheduler inboxStalenessResolver(
            InboxStalenessResolverService stalenessResolverService,
            @Qualifier("INBOX_SCHEDULER") TaskScheduler inboxScheduler) {
        return new InboxStalenessResolverScheduler(
                stalenessResolverService,
                inboxScheduler,
                Duration.ofMillis(inboxStalenessResolverRateMs));
    }

    @Bean
    public InboxRecordHandler ampelMessageInboxHandler(
            AmpelEventHandlerRouter eventHandlerRouter) {
        return new AmpelMessageInboxRecordHandler(eventHandlerRouter);
    }

    // PROCESSOR
    @Bean
    public InboxRecordProcessor inboxRecordProcessor(
            InboxRecordRepository repo,
            @Qualifier("SPRING_TX_MANAGER") TransactionManager springTransactionManager,
            @Qualifier("APP_RECOGNIZED_EVENTS") List<Descriptors.Descriptor> recognizedEventDescriptors,
            InboxRecordHandler ampelMessageInboxHandler) {
        var eventHandlerMapping = recognizedEventDescriptors.stream()
                .collect(Collectors.toMap(d -> d, _ -> ampelMessageInboxHandler));

        return new InboxRecordProcessor(
                repo,
                springTransactionManager,
                inboxProcessingMaxItems,
                new InboxRecordExponentialBackoffRetryStrategy(
                        inboxProcessingRetryBaseIntervalMs,
                        inboxProcessingMaxRetries),
                eventHandlerMapping);
    }

    @Bean
    public InboxProcessingScheduler inboxProcessorScheduler(
            InboxProcessingService inboxProcessingService,
            @Qualifier("INBOX_SCHEDULER") TaskScheduler inboxScheduler) {
        return new InboxProcessingScheduler(
                inboxProcessingService,
                inboxScheduler,
                Duration.ofMillis(inboxProcessingRateMs));
    }

    @Bean
    public BatchAcknowledgingMessageListener<String, byte[]> messageConsumer(
            AmpelMessageSerde messageSerde,
            AmpelMessageFilter messageTypeFilter,
            Inbox inbox) {
        return new AmpelMessageInboxIngester(messageSerde, messageTypeFilter, inbox);
    }

    @Bean
    public KafkaMessageListenerContainer<String, byte[]> listenerContainer(
            ConsumerFactory<String, byte[]> cf,
            BatchAcknowledgingMessageListener<String, byte[]> messageListener) {
        var props = new ContainerProperties(AMPEL_MESSAGE_KAFKA_TOPIC);
        props.setMessageListener(messageListener);

        // This is an immensely important setting! (Do not alter without knowing the consequences)
        // This allows to process a batch of messages from Kafka to manually commit associated offsets, enabling
        // higher message processing throughput by using batching approaches.
        props.setAckMode(ContainerProperties.AckMode.MANUAL_IMMEDIATE);

        return new KafkaMessageListenerContainer<>(cf, props);
    }
}
