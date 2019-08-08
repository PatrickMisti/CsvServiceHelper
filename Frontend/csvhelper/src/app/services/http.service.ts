import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  urlModelText = 'http://clearingcenter.sport2000.at/putModelTextservice/service.asmx';

  constructor() { }

  async sendModelTextData(data = []) {
    console.log('Daten versendet');
    /*await fetch(this.urlModelText, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json());*/
  }
}
