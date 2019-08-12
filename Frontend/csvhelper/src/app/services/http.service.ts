import { Injectable } from '@angular/core';
import * as X2JS from 'x2js';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  urlModelText = 'http://clearingcenter.sport2000.at/putModelTextservice/service.asmx?wsdl';
  private GLN = '9120048150008';
  private Password = '@V5mtKF0j§';

  constructor() { }

  async sendModelTextData(data = []) {

    const x2js = new X2JS();
    await fetch(this.urlModelText, {
      method: 'POST',
      mode: 'no-cors',
      headers: this.getHeader(),
      body: data.map(res => x2js.js2xml(res)).toString()
    }).catch((error) => console.log(error))
        .then(() => console.log('Daten versendet'));
  }

  getHeader() {
    const header = new Headers();
    header.append('Content-Type', 'text/xml');
    header.append('Authorization', 'GLN:' + this.GLN + 'Password:' + this.Password);
    return header;
  }
}
