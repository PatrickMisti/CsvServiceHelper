import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  yours = 'http://clearingcenter.sport2000.at/putModelTextservice/service.asmx?wsdl';
  my = 'http://localhost:57713/api/modeltexts';
  urlModelText = this.my;
  /*private GLN = '9120048150008';
  private Password = '@V5mtKF0j§';*/

  constructor() { }

  async sendModelTextData(data) {
    const i = JSON.stringify(data[0]);
    await fetch('http://localhost:57713/api/modeltexts', {
      method: 'POST',
      mode: 'no-cors',
      body: i,
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch((error) => console.log(error))
        .then(() => console.log('Daten versendet'));
  }
}
