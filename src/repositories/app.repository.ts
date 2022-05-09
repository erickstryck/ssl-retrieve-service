import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cert, CertDocument } from '../models/cert.schema';
import { CertificateDto } from '../dtos/app.certificate.dto';

@Injectable()
export class CertRepository {
  constructor(@InjectModel(Cert.name) private certModel: Model<CertDocument>) {}

  public async create(certificateDto: CertificateDto): Promise<Cert> {
    const createdCat = new this.certModel(certificateDto);
    return createdCat.save();
  }
}
