import { AppService } from '../services/app.service';
import { RequestDto } from '../dtos/app.request.dto';
import { Body, Controller, HttpStatus, Post, Res, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from '../validations/joi.validation.pipe';
import RequestValidateSchema from '../validations/schemas/app.request.schema';
import { ResponseDto } from 'src/dtos/app.response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  @UsePipes(new JoiValidationPipe(RequestValidateSchema))
  async processSsl(@Body() responseDto: RequestDto): Promise<ResponseDto> {
    return await this.appService.getCertificateInfo(responseDto);
  }
}
