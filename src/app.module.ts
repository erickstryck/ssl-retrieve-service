import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './services/app.service';
import { Cert, CertSchema } from './models/cert.schema';
import { AppController } from './controllers/app.controller';
import { CertRepository } from './repositories/app.repository';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://guest:sample@mongo:27017/'),
    MongooseModule.forFeature([{ name: Cert.name, schema: CertSchema }])
  ],
  controllers: [AppController],
  providers: [AppService, CertRepository],
})
export class AppModule {}
