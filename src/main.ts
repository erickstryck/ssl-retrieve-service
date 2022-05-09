import * as Dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
Dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('SSL verify')
  .setDescription('API to check the validity of SSL certificates')
  .setVersion('1.0')
  .addTag('ssl')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT);
  Logger.log(`Server listen connection on port ${process.env.PORT}`);
}
bootstrap();
