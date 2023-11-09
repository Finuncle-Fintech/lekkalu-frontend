# This is divided into 2 phases
# 1. Build 
# 2. Production

########## Build Stage ##########
# Use an official Node.js runtime as the base image
FROM node:18.16.0-alpine3.18 AS builder

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

########## Porduction Stage ##########
# Use an official nginx as the base image
FROM nginx:1.25.1-alpine3.17 AS runner

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/build .

# Delete default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]