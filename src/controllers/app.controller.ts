import { AppService } from '../services/app.service';
import { RequestDto } from '../dtos/app.request.dto';
import { CertificateDto } from 'src/dtos/app.certificate.dto';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from '../validations/joi.validation.pipe';
import RequestValidateSchema from '../validations/schemas/app.request.schema';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  @UsePipes(new JoiValidationPipe(RequestValidateSchema))
  @ApiOperation({ summary: 'Validate and persist ssl information' })
  @ApiBody({
      type: RequestDto,
      description: 'Request body containing the target URL',
      required: true,
      isArray: false,
  })
  @ApiResponse({
    status: 201,
    description: 'SSL certificate validated and created successfully.',
    type: CertificateDto
  })
  @ApiResponse({
    status: 400,
    description: 'The provided request body does not have a valid format { "targetUrl" : "http(s)://example.com[...])" }.'
  })
  public async processSsl(@Body() requestDto: RequestDto): Promise<CertificateDto> {
    return await this.appService.getCertificateInfo(requestDto);
  }
}
