# Use an official Node.js image as the base
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Install Remix and other dependencies
RUN npm install remix react react-dom vite tailwindcss

# Expose the port for the application
EXPOSE 5173

# Run the command to start the development server
CMD ["npm", "run", "dev"]

