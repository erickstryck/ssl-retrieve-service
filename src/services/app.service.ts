import * as https from 'https';
import { TLSSocket } from 'node:tls';
import { Injectable } from '@nestjs/common';
import { RequestDto } from '../dtos/app.request.dto';
import { CertificateDto } from '../dtos/app.certificate.dto';
import { CertRepository } from '../repositories/app.repository';

@Injectable()
export class AppService {
  constructor(private certRepository: CertRepository) { }

  private certificate: TLSSocket;

  async getCertificateInfo(requestDto: RequestDto): Promise<CertificateDto> {
    let certificateDto: CertificateDto;
    const urlObj = new URL(requestDto.targetUrl);
    let options = {
      hostname: urlObj.hostname
    };

    try {
      this.certificate = await new Promise(((resolve, reject) => {
        let req = this.handleRequest(options, resolve, reject);

        req.on('error', (e) => {
          reject(e);
        });

        req.end();
      }).bind(this));
    } catch (e) {
      if (e.cert) {
        certificateDto = new CertificateDto({
          subject: e.cert.subject.CN,
          issuer: e.cert.issuer.CN,
          isValid: false
        });
      } else {
        certificateDto = new CertificateDto({
          subject: requestDto.targetUrl,
          issuer: "",
          isValid: false
        });
      }

      await this.certRepository.create(certificateDto);
      return certificateDto;
    }

    certificateDto = new CertificateDto({
      subject: this.certificate['subject'].CN,
      issuer: this.certificate['issuer'].CN,
      isValid: this.certificate['authorized']
    });

    await this.certRepository.create(certificateDto);
    return certificateDto;
  }

  private handleRequest(options, resolve, reject) {
    return https.get(options, (res) => {
      let certificate = ((res.socket) as TLSSocket).getPeerCertificate(true);

      if (this.isEmpty(certificate) || certificate === null) {
        reject({ message: 'The website did not provide a certificate or the certificate was expired' });
      } else {
        certificate['authorized'] = res.socket['authorized'];
        resolve(certificate);
      }
    });
  }

  private isEmpty(object): boolean {
    for (let prop in object) {
      if (object.hasOwnProperty(prop)) return false;
    }

    return true;
  }
}
