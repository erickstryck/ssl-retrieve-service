import { AppService } from '../services/app.service';
import { RequestDto } from '../dtos/app.request.dto';
import { CertificateDto } from 'src/dtos/app.certificate.dto';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from '../validations/joi.validation.pipe';
import RequestValidateSchema from '../validations/schemas/app.request.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  @UsePipes(new JoiValidationPipe(RequestValidateSchema))
  public async processSsl(@Body() requestDto: RequestDto): Promise<CertificateDto> {
    return await this.appService.getCertificateInfo(requestDto);
  }
}
