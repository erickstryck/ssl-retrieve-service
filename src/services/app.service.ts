//const https = require('https');
import * as https from 'https';
import { Injectable } from '@nestjs/common';
import { RequestDto } from '../dtos/app.request.dto';
import { ResponseDto } from '../dtos/app.response.dto';
import { TLSSocket } from 'node:tls';

@Injectable()
export class AppService {
  private readonly valid_protocol = 'https:';

  async getCertificateInfo(responseDto: RequestDto): Promise<ResponseDto> {
    const urlObj = new URL(responseDto.targetUrl);
    var options = {
      hostname: urlObj.hostname,
      agent: false,
      rejectUnauthorized: false,
      ciphers: 'ALL',
      port: 443,
      protocol: this.valid_protocol
    };

    if (urlObj.protocol == this.valid_protocol) {
      await https.get(options);
      var certificate = await new Promise(((resolve, reject) => {
        var req = this.handleRequest(options, true, resolve, reject);

        req.on('error', (e) => {
          reject(e);
        });

        req.end();
      }).bind(this));
      console.log(certificate);
    }
    return new ResponseDto();
  }

  private handleRequest(options, detailed = false, resolve, reject) {
    return https.get(options, (res) => {
      var certificate = ((res.socket) as TLSSocket).getPeerCertificate(detailed);

      if (this.isEmpty(certificate) || certificate === null) {
        reject({ message: 'The website did not provide a certificate' });
      } else {
        resolve(certificate);
      }
    });
  }

  private isEmpty(object): boolean {
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) return false;
    }

    return true;
  }
}
