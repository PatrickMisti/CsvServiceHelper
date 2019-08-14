import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ModelText} from '../entities/model-text';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  splitter = ';';
  modelText: ModelText = new ModelText('AT', '0', '0', '0', '0', '0');
  globalSplit: BehaviorSubject<string>;
  globalModelText: BehaviorSubject<ModelText>;
  globalTableData: BehaviorSubject<string[]>;

  constructor() {
    this.globalSplit = new BehaviorSubject<string>(this.splitter);
    this.globalModelText = new BehaviorSubject<ModelText>(this.modelText);
    this.globalTableData = new BehaviorSubject<string[]>([]);
  }

  get GlobalTableData(): BehaviorSubject<string[]> {
    return this.globalTableData;
  }
  tableDataChange(data: string) {
    const dataSplit = data.split('\n');
    this.globalTableData.next(dataSplit);
  }

  tableDataChangeArray(data: string[]) {
    this.globalTableData.next(data);
  }

  tableChange(data: string[]) {
    this.globalTableData.next(data);
  }

  get GlobalModelText(): BehaviorSubject<ModelText> {
    return this.globalModelText;
  }
  modelTextChange(model: ModelText) {
    this.globalModelText.next(model);
  }

  get GlobalSplit(): BehaviorSubject<string> {
    return this.globalSplit;
  }
  splitChange(split: string) {
    this.globalSplit.next(split);
  }
}
