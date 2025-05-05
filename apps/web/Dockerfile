# Use the official Node.js 20 image as the base image
FROM node:20-slim AS base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm build

# Use the official Node.js 20 image for the production environment
FROM node:20-slim AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["pnpm", "start"]