import {Component} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-csv-reader',
  templateUrl: './csv-reader.component.html',
  styleUrls: ['./csv-reader.component.css']
})
export class CsvReaderComponent {
  resultPath = '';
  split = '';
  tables = [];

  constructor(private globalVariables: GlobalService) {
    this.globalVariables.GlobalSplit.subscribe(value => this.split = value);
    this.globalVariables.GlobalTableData.subscribe(value => this.tables = value);
  }

  fileDialogOpen() {
    // Wenn Button geklickt wurde soll das input type file aufgerufen werden input ist hidden
    document.getElementById('fileDialog').click();
  }

  switchSplitter(split) {
    this.globalVariables.splitChange(split);
  }

  chooseFile(event) {
    const target: DataTransfer = (event.target) as DataTransfer;
    this.resultPath = (window.navigator.userAgent.search('Electron') !== -1) ? event.target.files[0].path : event.target.files[0].name;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, {
        type: 'binary'
      });
      let jsonObject;
      workbook.SheetNames.forEach((sheetName) => {
        jsonObject =  XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        this.globalVariables.tableDataChangeArray(this.jsonImprove(jsonObject));
      });
    };
    reader.readAsBinaryString(target.files[0]);
    (document.getElementById('fileDialog') as HTMLInputElement).value = '';
  }

  jsonImprove(json) {
    const endResult = [];
    json.map(e => {
      let stringly = '';
      const result = [];
      for (const item in e) {
        const check = e[item];
        if (Number.isInteger(check)) {
          result.push(check.toString());
        } else {
          stringly = check.replace(/(?:\r\n|\n|\r)/g, ' ');
          result.push('' + stringly);
        }
      }
      endResult.push(result.join(this.split));
    });
    return endResult;
  }
}
