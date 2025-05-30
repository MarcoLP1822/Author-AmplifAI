/**
 * @description
 * This is the root module (AppModule) for the Author Amplify Core API application.
 * It serves as the central point for organizing and importing other modules
 * that make up the application's functionality.
 *
 * Key features:
 * - Imports and configures the ConfigModule globally, making environment variables
 *   and configuration settings accessible throughout the application.
 * - (Future) Will import feature modules such as UsersModule, BooksModule, AuthModule, etc.
 *
 * @dependencies
 * - Module from @nestjs/common: Base decorator for NestJS modules.
 * - ConfigModule from @nestjs/config: For managing application configuration and environment variables.
 *
 * @notes
 * - The ConfigModule.forRoot({ isGlobal: true }) makes the ConfigService available
 *   application-wide without needing to import ConfigModule in every feature module.
 * - As the application grows, other core modules like DatabaseModule, AuthModule,
 *   and feature-specific modules (UsersModule, BooksModule) will be imported here.
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller'; // Example, can be removed if no root controller
// import { AppService } from './app.service'; // Example, can be removed if no root service

@Module({
  imports: [
    // Configure the ConfigModule to load environment variables from .env files
    // and make them available globally throughout the application.
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available application-wide
      envFilePath: '.env', // Specifies the .env file to load
      // ignoreEnvFile: process.env.NODE_ENV === 'production', // Optionally ignore .env in production
    }),
    // TODO: Add other modules here as they are developed, e.g.:
    // DatabaseModule,
    // UsersModule,
    // AuthModule,
    // BooksModule,
    // MessagingModule,
    // BookAnalysisModule,
    // ContentGenerationModule,
  ],
  controllers: [
    // AppController // Example: remove if not needed for root path
  ],
  providers: [
    // AppService // Example: remove if not needed
  ],
})
export class AppModule {}