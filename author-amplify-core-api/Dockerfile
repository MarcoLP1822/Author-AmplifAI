# Dockerfile for Author Amplify Core API (NestJS Backend)

# ---- Builder Stage ----
# This stage builds the TypeScript application into JavaScript.
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install all dependencies, including devDependencies needed for build
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
# This command compiles TypeScript to JavaScript and outputs to the 'dist' folder.
RUN npm run build

# ---- Production Stage ----
# This stage creates the final production image.
FROM node:18-alpine

# Set Node environment to production
ENV NODE_ENV production

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install only production dependencies
# Using npm ci is generally faster and more reliable for CI/CD environments
# --omit=dev ensures devDependencies are not installed in the production image
RUN npm ci --omit=dev

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port the application runs on (should match the PORT in .env or default in main.ts)
EXPOSE 3001

# Command to run the application
# This starts the Node.js server using the compiled JavaScript in the 'dist' folder.
CMD ["node", "dist/main"]