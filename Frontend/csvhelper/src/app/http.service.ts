import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  async sendArtikelData(data) {
    await fetch('');
  }
}
