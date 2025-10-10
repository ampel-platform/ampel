# Use an official Node.js image as the base
FROM node:20

# Other labels will be set by the CI pipeline
LABEL org.opencontainers.image.title="AMPEL UI"
LABEL org.opencontainers.image.description="Default UI for the AMPEL platform."
LABEL org.opencontainers.image.authors="AMPEL CDSS Team <clemens.malkawi@medizin.uni-leipzig.de>"
LABEL org.opencontainers.image.vendor="AMPEL CDSS"

# Set the working directory to /app
WORKDIR /app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# >>> bake VITE_* into the client bundle
ARG VITE_BASE_API_URL
ENV VITE_BASE_API_URL=$VITE_BASE_API_URL

# Build the application
RUN npm run build

# Expose the port for the application
EXPOSE 3003

ENV HOST=0.0.0.0 PORT=3003

# Run the command to start the production server
CMD ["npm", "run", "start"]
