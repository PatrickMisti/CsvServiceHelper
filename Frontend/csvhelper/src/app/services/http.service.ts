import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  my = 'https://clearingcenter.sport2000.at/PutModelTextApi/api/modelText';
  first = 'http://localhost:55416/api/modeltext';
  ex = 'https://ccservertest.sp2.at/PutModelTextApi/api/modeltext';
  constructor() { }

  async sendModelTextData(data) {
    // async fetching works at post response come in with status
    await fetch(this.ex, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(data),                           // do data convert to Json
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.status === 200 ? alert('Gespeichert!!!!!') : null)
        .catch((error) => alert(error));
    // if it fail
  }
}
