# syntax=docker/dockerfile:1
FROM node:20-alpine

# Set working directory
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci sharp

# Copy the rest of the source files into the image.
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "start"]