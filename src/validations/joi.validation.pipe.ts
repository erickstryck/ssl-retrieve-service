import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) { }

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'The given url does not have a valid format "http(s)://example.com[...])"',
      }, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}