import { AppController } from './app.controller';
import { AppService } from '../services/app.service';
import { RequestDto } from '../dtos/app.request.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { CertificateDto } from '../dtos/app.certificate.dto';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { ArgumentMetadata, HttpException } from '@nestjs/common';
import { JoiValidationPipe } from '../validations/joi.validation.pipe';
import RequestValidateSchema from '../validations/schemas/app.request.schema';

const moduleMocker = new ModuleMocker(global);

describe('AppController', () => {
  let appController: AppController;
  let requestObj: RequestDto;
  let resultObj: CertificateDto;
  const errorMsg = 'The provided request body does not have a valid format { "targetUrl" : "http(s)://example.com[...])" }';

  beforeEach(async () => {
    requestObj = {
      "targetUrl": "https://sample.com/"
    }

    resultObj = new CertificateDto({
      subject: 'none',
      issuer: 'none',
      isValid: true
    })

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController]
    }).useMocker((token) => {
      if (token === AppService) {
        return { getCertificateInfo: jest.fn().mockResolvedValue(resultObj) };
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return as CertificateDto', () => {
      expect(appController.processSsl(requestObj)).resolves.toBe(resultObj);
    });

    const cases = [
      {
        "null": "https://sample.com/"
      },
      {
        "sample": "null"
      },
      {
        "targetUrl": "null"
      }
    ];
    test.each(cases)(
      "should throw an exception with given %p argument",
      (localRequestObj) => {

        let target: JoiValidationPipe = new JoiValidationPipe(RequestValidateSchema);
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RequestDto,
          data: ''
        };
        expect(() => { target.transform(<RequestDto>localRequestObj, metadata) }).toThrow(HttpException)
      })
  });
});
