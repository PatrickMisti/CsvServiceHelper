import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  private table: string[] = [];
  constructor() {}

  getTable(): Observable<string[]> {
    return of(this.table);
  }

  setTable(sendTable) {
    this.table = sendTable;
  }
}
