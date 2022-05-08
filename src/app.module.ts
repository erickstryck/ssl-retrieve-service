import * as Dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './services/app.service';
import { Cert, CertSchema } from './models/cert.schema';
import { AppController } from './controllers/app.controller';
import { CertRepository } from './repositories/app.repository';
Dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    MongooseModule.forFeature([{ name: Cert.name, schema: CertSchema }])
  ],
  controllers: [AppController],
  providers: [AppService, CertRepository],
})
export class AppModule {}
