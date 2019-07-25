import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  static async sendModelTextData(data) {
    console.log('Daten versendet');
    await fetch('');
  }
}
