FROM eclipse-temurin:25-jre-alpine@sha256:b7528962e65d43064d8a8b67ba175367896bc948363ea2d3fcd7f10d34e1f048
LABEL org.opencontainers.image.title="Ampel Metainformation Service"
LABEL org.opencontainers.image.description="Service providing queryable metainformation for the Ampel platform."
LABEL org.opencontainers.image.authors="Ampel CDSS Team <ampel@medizin.uni-leipzig.de>"
LABEL org.opencontainers.image.vendor="Ampel CDSS"

RUN apk add --no-cache curl

WORKDIR /opt/app
COPY ./target/*.jar ./metainformation-service.jar

RUN addgroup --system ampel && adduser --system ampel --ingroup ampel
RUN chown -R ampel:ampel /opt/app/

USER ampel:ampel

ENV SERVER_PORT=8080
HEALTHCHECK --interval=5s --start-period=10s CMD curl -s -f http://localhost:${SERVER_PORT}/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "/opt/app/metainformation-service.jar"]
