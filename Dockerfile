# Use the official Node.js image as the base image
FROM node:latest

# Install PostgreSQL client 
RUN apt-get update && apt-get install -y postgresql-client

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application RUN npm run build
RUN npm run build

# Copy the initialization script 
COPY init_db.sh ./ 

# Make the script executable
RUN chmod +x init_db.sh

# Expose the application port
EXPOSE 3000

