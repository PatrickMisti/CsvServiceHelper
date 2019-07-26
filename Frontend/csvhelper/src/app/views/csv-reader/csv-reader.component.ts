import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Globals} from '../../globals';

@Component({
  selector: 'app-csv-reader',
  templateUrl: './csv-reader.component.html',
  styleUrls: ['./csv-reader.component.css']
})
export class CsvReaderComponent implements OnInit {

  resultPath = '';
  csvData: string | ArrayBuffer;
  @Output() tableWares = new EventEmitter<string | ArrayBuffer>();

  constructor(private global: Globals) { }

  ngOnInit() {
  }

  fileDialogOpen() {
    // Wenn Button geklickt wurde soll das input type file aufgerufen werden input ist hidden
    document.getElementById('fileDialog').click();
  }

  switchSplitter(split) {
    this.global.splitter = split;
  }

  chosenFile(event) {
    // um aus der CSV lesen zu könnnen
    this.resultPath = event.target.files[0].path;
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = () => {
      // datenbeschafung von der Csv-File
      this.csvData = reader.result;
      this.tableWares.emit(this.csvData);       // Daten an Overview liefern
    };
    // muss gemacht werden um files wieder aufzumachen sonst wird onChange nicht aufgerufen
    (document.getElementById('fileDialog')as HTMLInputElement).value = '';
  }
}
