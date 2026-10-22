package eu.ampel_platform.notification_service.notification.mail;

public interface MailRenderer<T extends MailTemplateModel> {
    String getRenderedSubject(T model);

    String getRenderedBody(T model);
}
