import * as https from 'https';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestDto } from '../dtos/app.request.dto';
import { ResponseDto } from '../dtos/app.response.dto';
import { TLSSocket } from 'node:tls';

@Injectable()
export class AppService {
  private certificate: TLSSocket;

  async getCertificateInfo(responseDto: RequestDto): Promise<ResponseDto> {
    const urlObj = new URL(responseDto.targetUrl);
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
        return new ResponseDto({
          subject: e.cert.subject.CN,
          issuer: e.cert.issuer.CN,
          isValid: false
        });
      } else {
        return new ResponseDto({
          subject: responseDto.targetUrl,
          issuer: "",
          isValid: false
        });
      }
    }

    const response = new ResponseDto({
      subject: this.certificate['subject'].CN,
      issuer: this.certificate['issuer'].CN,
      isValid: this.certificate['authorized']
    });
    return response;
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
