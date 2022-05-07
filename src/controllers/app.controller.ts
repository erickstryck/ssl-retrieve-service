import { AppService } from '../services/app.service';
import { RequestDto } from '../dtos/app.request.dto';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from '../validations/joi.validation.pipe';
import RequestValidateSchema from '../validations/schemas/app.request.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(RequestValidateSchema))
  processSsl(@Body() responseDto: RequestDto): string {
    this.appService.getCertificateInfo(responseDto);
    return 'ok';
  }
}
