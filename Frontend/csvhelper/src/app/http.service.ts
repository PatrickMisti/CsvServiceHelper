import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  // http://clearingcenter.sport2000.at/putModelTextservice/service.asmx
  static async sendModelTextData(data) {
    console.log('Daten versendet');
    await fetch('');
  }
}
