import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  yours = 'http://clearingcenter.sport2000.at/putModelTextservice/service.asmx?wsdl';
  my = '';
  urlModelText = this.my;
  /*private GLN = '9120048150008';
  private Password = '@V5mtKF0j§';*/

  constructor() { }

  async sendModelTextData(data = []) {
    await fetch(this.urlModelText, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch((error) => console.log(error))
        .then(() => console.log('Daten versendet'));
  }
}
