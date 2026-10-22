package eu.ampel_platform.notification_service.notification.mail.laboratory_score;

import eu.ampel_platform.notification_service.notification.mail.MailNotifier;
import eu.ampel_platform.notification_service.notification.mail.MailRenderer;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import static java.util.Objects.requireNonNull;

@Service
public final class LaboratoryScoreMailNotificationService {

    private final MailNotifier mailNotifier;
    private final MailRenderer<LaboratoryScoreMailModel> mailRenderer;

    public LaboratoryScoreMailNotificationService(
            @Qualifier("DEFAULT") MailNotifier mailNotifier,
            MailRenderer<LaboratoryScoreMailModel> mailRenderer) {
        this.mailNotifier = requireNonNull(mailNotifier, "mail notifier must not be null");
        this.mailRenderer = requireNonNull(mailRenderer, "mail renderer must not be null");
    }

    public void sendMailNotification(LaboratoryScoreMailModel model) {
        mailNotifier.sendNotification(
                mailRenderer.getRenderedSubject(model),
                mailRenderer.getRenderedBody(model));
    }
}
