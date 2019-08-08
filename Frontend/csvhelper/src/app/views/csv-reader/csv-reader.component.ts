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

  chosenFile(event) {
    // um aus der CSV lesen zu könnnen
    this.resultPath = event.target.files[0].path;
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = () => {
      // datenbeschaffung von der Csv-File
      /*const fileData = reader.result;
      const wb = XLSX.read;*/


      console.log(reader.result);
      this.globalVariables.tableDataChange(reader.result.toString());      // Daten an Service liefern
    };
    // muss gemacht werden um files wieder aufzumachen sonst wird onChange nicht aufgerufen
    (document.getElementById('fileDialog')as HTMLInputElement).value = '';
  }
}
