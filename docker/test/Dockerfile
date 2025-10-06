# 1. Node-Image für CI (verwende die gleiche Node-Version wie in deinem Workflow!)
FROM node:20-alpine
WORKDIR /app

# NPM Konfig und Dependencies kopieren & installieren
COPY package*.json ./
COPY .npmrc* ./
RUN npm ci

# Source rein (das meiste, was für tests gebraucht wird)
COPY . .

# Setze Zeitzone
ENV TZ=Europe/Berlin

# Setze Locale explizit auf de_DE
ENV LANG=de_DE.UTF-8
ENV LC_ALL=de_DE.UTF-8

# Default-Command: Tests ausführen
CMD ["npm", "run", "coverage"]
