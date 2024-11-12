//Core
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//Modules
import { AppModule } from './app.module';
// Filters
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
// Swagger
import { swaggerModuleSetup } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('v1/api');
  swaggerModuleSetup(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
