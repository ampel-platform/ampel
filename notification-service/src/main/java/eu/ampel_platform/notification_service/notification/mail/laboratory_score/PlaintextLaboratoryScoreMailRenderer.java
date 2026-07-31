package eu.ampel_platform.notification_service.notification.mail.laboratory_score;

import eu.ampel_platform.notification_service.notification.mail.MailRenderer;

import java.util.Objects;
import java.util.function.Function;
import java.util.function.Supplier;

public final class PlaintextLaboratoryScoreMailRenderer implements MailRenderer<LaboratoryScoreMailModel> {

    private final Supplier<Function<LaboratoryScoreMailModel, String>> subjectMailTemplateSupplier;
    private final Supplier<Function<LaboratoryScoreMailModel, String>> bodyMailTemplateSupplier;

    public PlaintextLaboratoryScoreMailRenderer(
            Supplier<Function<LaboratoryScoreMailModel, String>> subjectMailTemplateSupplier,
            Supplier<Function<LaboratoryScoreMailModel, String>> bodyMailTemplateSupplier) {
        this.subjectMailTemplateSupplier = Objects.requireNonNull(subjectMailTemplateSupplier,
                "subject mail template supplier must not be null");
        this.bodyMailTemplateSupplier = Objects.requireNonNull(bodyMailTemplateSupplier,
                "body mail template supplier must not be null");
    }

    @Override
    public String getRenderedSubject(LaboratoryScoreMailModel model) {
        return subjectMailTemplateSupplier.get()
                .apply(model);
    }

    @Override
    public String getRenderedBody(LaboratoryScoreMailModel model) {
        return bodyMailTemplateSupplier.get()
                .apply(model);
    }
}
