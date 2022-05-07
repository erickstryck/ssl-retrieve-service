import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  Logger.log(`Server listen connection on port ${PORT}`)
  //await mongoose.connect('mongodb://guest:sample@mongo:27017/');
}
bootstrap();
