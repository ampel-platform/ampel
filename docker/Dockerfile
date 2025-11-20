FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package*.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:20-alpine

# Other labels will be set by the CI pipeline
LABEL org.opencontainers.image.title="AMPEL UI"
LABEL org.opencontainers.image.description="Default UI for the AMPEL platform."
LABEL org.opencontainers.image.authors="AMPEL CDSS Team <clemens.malkawi@medizin.uni-leipzig.de>"
LABEL org.opencontainers.image.vendor="AMPEL CDSS"

RUN apk --no-cache add tzdata

RUN addgroup -g 1001 -S nodejs \
    && adduser -S ampelui -u 1001

WORKDIR /app

COPY ./package.json package-lock.json ./
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build

RUN chown -R ampelui:nodejs .
USER ampelui

ENV LANG=de_DE.UTF-8
ENV LC_ALL=de_DE.UTF-8
ENV TZ=Europe/Berlin
ENV HOST=0.0.0.0
ENV PORT=3003

CMD ["npm", "run", "start"]
