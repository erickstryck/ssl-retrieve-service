import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CertDocument = Cert & Document;

@Schema()
export class Cert {
  @Prop({ required: true })
  subject: string;

  @Prop()
  issuer: string;

  @Prop({ required: true })
  isValid: boolean;
}

export const CertSchema = SchemaFactory.createForClass(Cert);