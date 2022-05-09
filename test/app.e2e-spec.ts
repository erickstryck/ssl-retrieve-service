import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AppService } from '../src/services/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const resultObj = {
    subject: 'none',
    issuer: 'none',
    isValid: true
  };

  let appService = { getCertificateInfo: () => resultObj };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST with right request body`, () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        "targetUrl": "https://sample.com/"
      })
      .expect(201)
      .expect(appService.getCertificateInfo());
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
    },
    {}
  ];
  test.each(cases)(
    "/POST with wrong request body %p ",
    (localRequestObj) => {
      return request(app.getHttpServer())
      .post('/')
      .send(localRequestObj)
      .expect(400)
    }
  );

  afterAll(async () => {
    await app.close();
  });
});

//https://badssl.com/
