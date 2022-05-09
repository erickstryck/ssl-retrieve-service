import { AppService } from "./app.service";
import { Cert } from "../models/cert.schema";
import { Test, TestingModule } from "@nestjs/testing";
import { RequestDto } from "src/dtos/app.request.dto";
import { AppController } from "../controllers/app.controller";
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { CertRepository } from "../repositories/app.repository";

const moduleMocker = new ModuleMocker(global);

describe('AppService', () => {
    let requestObj: RequestDto;
    let appService: AppService;
    let certRepository: CertRepository;

    beforeEach(async () => {
        requestObj = {
            "targetUrl": "https://google.com/"
        }

        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService]
        }).useMocker((token) => {
            if (token === CertRepository) {
                return { create: jest.fn().mockResolvedValue(Cert) };
            }
            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);
                return new Mock();
            }
        })
            .compile();
        appService = app.get<AppService>(AppService);
        certRepository = app.get<CertRepository>(CertRepository);
    });

    describe('root', () => {
        const successCases = [
            {
                "targetUrl": "https://google.com/"
            },
            {
                "targetUrl": "https://github.com/"
            },
            {
                "targetUrl": "https://bing.com/"
            },
            {
                "targetUrl": "https://facebook.com/"
            }
        ];
        test.each(successCases)(
            "should return valid certificate information with the given %p argument",
            async (localRequestObj) => {
                expect(await (await appService.getCertificateInfo(localRequestObj)).isValid).toBe(true);
                expect(certRepository.create).toHaveBeenCalled();
            });

        const errorCases = [
            {
                "targetUrl": "https://expired.badssl.com/"
            },
            {
                "targetUrl": "https://wrong.host.badssl.com/"
            },
            {
                "targetUrl": "https://self-signed.badssl.com/"
            },
            {
                "targetUrl": "https://self-signed.badssl.com/"
            }
        ];
        test.each(errorCases)(
            "should return invalid certificate information with the given %p argument",
            async (localRequestObj) => {
                expect(await (await appService.getCertificateInfo(localRequestObj)).isValid).toBe(false);
                expect(certRepository.create).toHaveBeenCalled();
            });
    });
});