package eu.ampel_platform.notification_service.notification.mail;

import org.springframework.mail.MailException;

public interface MailNotifier {
    void sendNotification(String subject, String body) throws MailException;
}
