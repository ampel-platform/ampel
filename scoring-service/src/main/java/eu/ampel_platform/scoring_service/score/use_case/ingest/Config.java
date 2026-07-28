package eu.ampel_platform.scoring_service.score.use_case.ingest;

import eu.ampel_platform.messaging_sdk.AmpelEventTypeRegistry;
import eu.ampel_platform.messaging_sdk.AmpelMessageSerde;
import io.namastack.outbox.kafka.KafkaOutboxRouting;
import io.namastack.outbox.routing.selector.OutboxPayloadSelector;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.listener.BatchAcknowledgingMessageListener;
import org.springframework.kafka.listener.ContainerProperties;
import org.springframework.kafka.listener.KafkaMessageListenerContainer;

@Configuration
public class Config {

    private static final String AMPEL_MESSAGE_KAFKA_TOPIC = "ampel";

    @Value("${application.messages.dlq.topic-name}")
    private String dlqTopicName;

    @Bean
    public AmpelEventTypeRegistry eventTypeRegistry() {
        var discoveredTypes = AmpelEventTypeRegistry.discoverParsersByEventUrl();
        return AmpelEventTypeRegistry.withParsersForEventTypeUrls(discoveredTypes);
    }

    @Bean
    public AmpelMessageSerde eventSerde(AmpelEventTypeRegistry registry) {
        return new AmpelMessageSerde("scoring-service", registry);
    }

    @Bean
    public BatchAcknowledgingMessageListener<String, byte[]> messageConsumer(
            AmpelMessageSerde messageSerde,
            @Qualifier("ingestion") LaboratoryScoreIngestionServiceImpl laboratoryScoreIngestionService) {
        return new AmpelLaboratoryScoreCalculatedEventListener(messageSerde, laboratoryScoreIngestionService);
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

    // OUTBOX
    @Bean
    public KafkaOutboxRouting deadMessageKafkaOutboxRouting() {
        return KafkaOutboxRouting.builder()
                .route(OutboxPayloadSelector.type(DeadMessage.class), route -> {
                    // The key used for the outbox event message will simply be reused for Kafka.
                    route.target(dlqTopicName);
                })
                .build();
    }
}
