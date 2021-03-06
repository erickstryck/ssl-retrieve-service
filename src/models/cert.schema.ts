import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CertDocument = Cert & Document;

@Schema()
export class Cert {
  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  issuer: string;

  @Prop({ required: true })
  isValid: boolean;
}

export const CertSchema = SchemaFactory.createForClass(Cert);