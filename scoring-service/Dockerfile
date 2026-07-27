FROM eclipse-temurin:25-jre-alpine@sha256:28db6fdf60e38945e43d840c0333aeaec66c15943070104f7586fd3c9d1665b0

LABEL org.opencontainers.image.title="Ampel Scoring Service"
LABEL org.opencontainers.image.description="Scoring ingestion and retrieval service for the Ampel platform."
LABEL org.opencontainers.image.authors="Ampel CDSS Team <ampel@medizin.uni-leipzig.de>"
LABEL org.opencontainers.image.vendor="Ampel CDSS"

WORKDIR /opt/app
COPY ./target/*.jar ./scoring-service.jar

RUN addgroup --system ampel && adduser --system ampel --ingroup ampel
RUN chown -R ampel:ampel /opt/app/

USER ampel:ampel

# TODO: add health check later on
ENTRYPOINT ["java", "-jar", "/opt/app/scoring-service.jar"]
