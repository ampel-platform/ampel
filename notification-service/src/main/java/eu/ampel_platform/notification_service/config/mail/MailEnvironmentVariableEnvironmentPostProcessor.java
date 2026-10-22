package eu.ampel_platform.notification_service.config.mail;

import org.jspecify.annotations.NonNull;
import org.springframework.boot.EnvironmentPostProcessor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.OriginTrackedMapPropertySource;
import org.springframework.boot.origin.OriginTrackedValue;
import org.springframework.boot.origin.SystemEnvironmentOrigin;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.ConfigurableEnvironment;

import java.util.AbstractMap;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Utility for reading custom environment variables that are related to configuring the mail notification channel.
 * <p>
 * For a list of properties, see <a href="https://connector.sourceforge.net/doc-files/Properties.html">here</a> and
 * <a href="https://jakarta.ee/specifications/mail/1.6/apidocs/">here</a>.<br><br>
 * <i>Make sure that all dots (.) in these settings are replaced by underscores (_) and everything transformed to
 * uppercase when using them as environment variables compatible with this processor.</i>
 * </p>
 *
 * @since 1.0.0
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
public final class MailEnvironmentVariableEnvironmentPostProcessor implements EnvironmentPostProcessor {

    public static final String MAIL_SETTINGS_PROPERTY_SOURCE_NAME = "mailProperties";

    private final MailRelatedEnvironmentVariables envVars;

    public MailEnvironmentVariableEnvironmentPostProcessor() {
        envVars = MailRelatedEnvironmentVariables.fromSystemEnvVars(System.getenv());
    }

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, @NonNull SpringApplication application) {
        Map<String, OriginTrackedValue> map = new HashMap<>();
        mapMailConfiguration(map);

        environment.getPropertySources()
                .addFirst(new OriginTrackedMapPropertySource(MAIL_SETTINGS_PROPERTY_SOURCE_NAME, map, true));
    }

    private void mapMailConfiguration(Map<String, OriginTrackedValue> map) {
        map.putAll(envVars.getTrackedMailSettings());
    }

    private record MailRelatedEnvironmentVariables(Map<String, String> envVars) {

        private final static String MAIL_ENV_VARS_PREFIX = "MAIL_";

        static MailRelatedEnvironmentVariables fromSystemEnvVars(Map<String, String> systemEnvVars) {
            Map<String, String> mailFilteredSystemEnvVars = systemEnvVars.entrySet().stream()
                    .filter(e -> e.getKey().toUpperCase().startsWith(MAIL_ENV_VARS_PREFIX))
                    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

            return new MailRelatedEnvironmentVariables(mailFilteredSystemEnvVars);
        }

        private Map<String, OriginTrackedValue> getTrackedMailSettings() {
            return envVars.entrySet().stream()
                    .map(entry -> new AbstractMap.SimpleImmutableEntry<>(
                            convertToPropertiesSyntax(entry.getKey()),
                            OriginTrackedValue.of(entry.getValue(), new SystemEnvironmentOrigin(entry.getKey()))))
                    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        }

        private String convertToPropertiesSyntax(String envVar) {
            return envVar.toLowerCase()
                    .replace("_", ".")
                    .replaceAll("(\\.\\.[.]+)", ".");
        }
    }
}
