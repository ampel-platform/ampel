package eu.ampel_platform.notification_service.notification.mail;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

import static java.util.Objects.requireNonNull;

@Component
public final class MailNotifierImpl implements MailNotifier {

    private static final Logger LOGGER = LoggerFactory.getLogger(MailNotifierImpl.class);

    private final MailSender mailSender;
    private final SimpleMailMessage templateMessage;

    public MailNotifierImpl(MailSender mailSender, SimpleMailMessage templateMessage) {
        this.mailSender = requireNonNull(mailSender, "mail sender must not be null");
        this.templateMessage = requireNonNull(templateMessage, "template message must not be null");
    }

    @Override
    public void sendNotification(String subject, String body) throws MailException {
        var message = new SimpleMailMessage(templateMessage);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
        LOGGER.debug("sent mail with subject '{}' to '{}'",
                message.getSubject(), message.getTo());
    }
}
