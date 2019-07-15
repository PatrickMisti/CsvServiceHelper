import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csv-reader',
  templateUrl: './csv-reader.component.html',
  styleUrls: ['./csv-reader.component.css']
})
export class CsvReaderComponent implements OnInit {

  resultPath = '';
  csvData: string | ArrayBuffer;
  constructor() { }

  ngOnInit() {
  }

  fileDialogOpen() {
    document.getElementById('fileDialog').click();
  }

  chosenFile(event) {
    this.resultPath = event.target.files[0].path;

    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = () => {
      this.csvData = reader.result;
    };
  }
}
