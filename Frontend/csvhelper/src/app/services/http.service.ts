import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  my = 'http://localhost:57713/api/modeltexts';
  constructor() { }

  async sendModelTextData(data) {
    // async fetching works at post response come in with status
    await fetch(this.my, {
      method: 'POST',
      body: JSON.stringify(data),                           // do data convert to Json
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.status === 200 ? alert('Gespeichert!!!!!') : alert('Nicht Gespeichert!!!!!')).catch((error) => console.log(error));
    // if it fail
  }
}
