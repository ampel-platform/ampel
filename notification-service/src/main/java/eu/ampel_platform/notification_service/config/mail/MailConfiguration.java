package eu.ampel_platform.notification_service.config.mail;

import eu.ampel_platform.notification_service.notification.mail.MailNotifier;
import eu.ampel_platform.notification_service.notification.mail.MailNotifierImpl;
import eu.ampel_platform.notification_service.notification.mail.MailRenderer;
import eu.ampel_platform.notification_service.notification.mail.laboratory_score.LaboratoryScoreMailModel;
import eu.ampel_platform.notification_service.notification.mail.laboratory_score.PlaintextLaboratoryScoreMailRenderer;
import gg.jte.ContentType;
import gg.jte.TemplateEngine;
import gg.jte.output.StringOutput;
import gg.jte.resolve.DirectoryCodeResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.origin.OriginTrackedValue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.PropertySource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.util.Assert;

import java.nio.file.Path;
import java.util.HashMap;
import java.util.function.Function;
import java.util.function.Supplier;

@Configuration
public class MailConfiguration {

    @Autowired
    private ConfigurableEnvironment env;

    @Value("${application.mail.host}")
    private String mailHost;

    @Value("${application.mail.port}")
    private int mailPort;

    @Value("${application.mail.username}")
    private String mailUsername;

    @Value("${application.mail.password}")
    private String mailPassword;

    @Value("${application.mail.protocol}")
    private String mailProtocol;

    @Value("${application.mail.sender-address}")
    private String mailSenderAddress;

    @Value("${application.mail.recipient-address}")
    private String mailRecipientAddress;

    @Value("${application.templating.teamplte-location-root-dir}")
    private String templateLocationRootDir;

    @Value("${application.laboratory-score.mail-notifier.laboratory-score.subject-template-path}")
    private String laboratoryScoreSubjectMailTemplatePath;

    @Value("${application.laboratory-score.mail-notifier.laboratory-score.body-template-path}")
    private String laboratoryScoreBodyMailTemplatePath;

    @SuppressWarnings("unchecked")
    @Bean
    public JavaMailSender mailSender() {
        // Properties coming from MailEnvironmentVariableEnvironmentPostProcessor
        PropertySource<HashMap<String, OriginTrackedValue>> mailProperties =
                (PropertySource<HashMap<String, OriginTrackedValue>>) env.getPropertySources()
                        .get(MailEnvironmentVariableEnvironmentPostProcessor.MAIL_SETTINGS_PROPERTY_SOURCE_NAME);

        Assert.notNull(mailProperties, "mail properties must not be null");
        Assert.notEmpty(mailProperties.getSource(), "mail properties need to be set");

        var mailSender = new JavaMailSenderImpl();
        mailSender.setHost(mailHost);
        mailSender.setPort(mailPort);
        mailSender.setUsername(mailUsername);
        mailSender.setPassword(mailPassword);
        mailSender.setProtocol(mailProtocol);

        var properties = mailSender.getJavaMailProperties();
        mailProperties.getSource()
                .forEach((key, value) -> properties.put(key, value.getValue()));

        return mailSender;
    }

    @Bean
    public SimpleMailMessage templateMessage() {
        var message = new SimpleMailMessage();
        message.setFrom(mailSenderAddress);
        message.setTo(mailRecipientAddress);
        return message;
    }

    @Qualifier("DEFAULT")
    @Bean
    public MailNotifier mailNotifier(
            JavaMailSender mailSender,
            SimpleMailMessage templateMessage) {
        return new MailNotifierImpl(
                mailSender,
                templateMessage);
    }

    private Supplier<Function<LaboratoryScoreMailModel, String>> getLaboratoryScoreTemplateSupplier(
            TemplateEngine templateEngine,
            String templateName) {
        if (!templateEngine.hasTemplate(templateName)) {
            throw new IllegalArgumentException("template under '%s' does not exist"
                    .formatted(templateName));
        }

        return () -> model -> {
            var output = new StringOutput();
            templateEngine.render(
                    templateName,
                    model,
                    output);

            return output.toString();
        };
    }

    @Qualifier("plaintext")
    @Bean
    public TemplateEngine plaintextTemplateEngine() {
        var dirCodeResolver = new DirectoryCodeResolver(Path.of(templateLocationRootDir));
        return TemplateEngine.create(dirCodeResolver, ContentType.Plain);
    }

    @Qualifier("LABORATORY_SCORE_PLAINTEXT_SUBJECT")
    @Bean
    public Supplier<Function<LaboratoryScoreMailModel, String>> laboratoryScoreSubjectMailTemplateSupplier(
            @Qualifier("plaintext") TemplateEngine templateEngine
    ) {
        return getLaboratoryScoreTemplateSupplier(templateEngine, laboratoryScoreSubjectMailTemplatePath);
    }

    @Qualifier("LABORATORY_SCORE_PLAINTEXT_BODY")
    @Bean
    public Supplier<Function<LaboratoryScoreMailModel, String>> laboratoryScoreBodyMailTemplateSupplier(
            @Qualifier("plaintext") TemplateEngine templateEngine
    ) {
        return getLaboratoryScoreTemplateSupplier(templateEngine, laboratoryScoreBodyMailTemplatePath);
    }

    @Qualifier("LABORATORY_SCORE_PLAINTEXT")
    @Bean
    public MailRenderer<LaboratoryScoreMailModel> laboratoryScorePlaintextMailRenderer(
            @Qualifier("LABORATORY_SCORE_PLAINTEXT_SUBJECT") Supplier<Function<LaboratoryScoreMailModel, String>> subjectTemplateSupplier,
            @Qualifier("LABORATORY_SCORE_PLAINTEXT_BODY") Supplier<Function<LaboratoryScoreMailModel, String>> bodyTemplateSupplier
    ) {
        return new PlaintextLaboratoryScoreMailRenderer(
                subjectTemplateSupplier,
                bodyTemplateSupplier);
    }
}
