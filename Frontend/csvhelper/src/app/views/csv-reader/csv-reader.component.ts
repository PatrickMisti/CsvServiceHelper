import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csv-reader',
  templateUrl: './csv-reader.component.html',
  styleUrls: ['./csv-reader.component.css']
})
export class CsvReaderComponent implements OnInit {

  resultPath = '';
  constructor() { }

  ngOnInit() {
  }

  fileDialogOpen() {
    document.getElementById('fileDialog').click();
  }

  chosenFile(event) {
    console.log(event.target.formAction + '' + event.target.value);
    const path = event.target.formAction.split('///');
    const filename = event.target.value.split('\\');


    const test = document.getElementById('filePicker');

    this.resultPath = joiner(filename[0], path[1], filename[2]);
    console.log(test);
  }

}
function joiner(local, path, filename) {
  const fullCuttedPath = Array.prototype.join.call(arguments).replace(/,/i, '//').replace(/,/g, '');
  console.log(fullCuttedPath);
  return fullCuttedPath;
}
