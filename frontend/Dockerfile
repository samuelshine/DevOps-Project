# Use the official Node.js image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use a lightweight Node.js image to serve the built React application
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app/build ./build

# Install serve to serve the application
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build"]