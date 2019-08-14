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
    await fetch(this.my, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => alert(res.status)).catch((error) => console.log(error));
  }
}
