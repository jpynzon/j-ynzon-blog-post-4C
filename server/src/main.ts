import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins (you can specify a domain if you want more control)
  app.enableCors({
    origin: 'http://localhost:4200', // Allow your Angular frontend to access the API
    methods: 'GET,POST,PUT,DELETE', // Allow the necessary HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allow these headers
  });

  await app.listen(3000);
}
bootstrap();
