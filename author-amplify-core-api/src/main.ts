/**
 * @description
 * This is the main entry point for the Author Amplify Core API application.
 * It initializes the NestJS application, sets up global configurations such
 * as CORS, validation pipes, and listens for incoming requests on a specified port.
 *
 * Key features:
 * - Initializes the NestJS application using AppModule.
 * - Enables Cross-Origin Resource Sharing (CORS).
 * - Configures a global ValidationPipe for automatic request payload validation.
 * - Reads the port from environment variables, defaulting to 3001.
 *
 * @dependencies
 * - NestFactory from @nestjs/core: Used to create an instance of the NestJS application.
 * - AppModule: The root module of the application.
 * - ValidationPipe from @nestjs/common: For global request validation.
 * - ConfigService from @nestjs/config: To access environment variables (though port is accessed directly here for simplicity at startup).
 *
 * @notes
 * - CORS is enabled with default settings, which might need to be more restrictive for production.
 * - The ValidationPipe uses `whitelist: true` to strip any properties that do not have decorators in the DTO,
 *   and `transform: true` to automatically transform plain JavaScript objects to DTO instances.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Though not used for port here, it's good practice for other configs

async function bootstrap() {
  // Create a NestJS application instance based on the AppModule
  const app = await NestFactory.create(AppModule);

  // Enable Cross-Origin Resource Sharing (CORS)
  // This allows requests from different origins (e.g., your frontend application)
  // For production, you might want to configure specific origins:
  // app.enableCors({ origin: 'https://your-frontend-domain.com' });
  app.enableCors();

  // Apply a global validation pipe
  // This will automatically validate incoming request payloads against DTOs
  // using class-validator decorators.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties that do not have any decorators
      transform: true, // Automatically transforms payloads to DTO instances
      forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are present
      transformOptions: {
        enableImplicitConversion: true, // Allows implicit conversion of types (e.g., string to number for path params)
      },
    }),
  );

  // Set a global prefix for all API routes (e.g., /api/v1)
  // This helps in versioning and organizing your API endpoints.
  app.setGlobalPrefix('api');

  // Retrieve the port from environment variables, defaulting to 3001
  // Note: ConfigService could also be used here if AppModule has already initialized it.
  const port = process.env.PORT || 3001;

  // Start listening for incoming requests on the configured port
  await app.listen(port);

  // Log a message to the console indicating the application is running
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// Execute the bootstrap function to start the application
bootstrap();