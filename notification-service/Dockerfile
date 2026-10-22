FROM eclipse-temurin:25-jdk-alpine@sha256:1e20ead9eec7234db293f1913438090d533ed47c0b9e12dc8c7627a802a44ed6
LABEL org.opencontainers.image.title="Ampel Notification Service"
LABEL org.opencontainers.image.description="Score based notification service for the Ampel platform."
LABEL org.opencontainers.image.authors="Ampel CDSS Team <ampel@medizin.uni-leipzig.de>"
LABEL org.opencontainers.image.vendor="Ampel CDSS"

RUN apk add --no-cache curl

WORKDIR /opt/app
COPY ./target/*.jar ./notification-service.jar

RUN addgroup --system ampel && adduser --system ampel --ingroup ampel
RUN chown -R ampel:ampel /opt/app/

USER ampel:ampel


ENV SERVER_PORT=8080
HEALTHCHECK --interval=5s --start-period=10s CMD curl -s -f http://localhost:${SERVER_PORT}/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "/opt/app/notification-service.jar"]
