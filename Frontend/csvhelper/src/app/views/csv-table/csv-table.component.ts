import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.css']
})
export class CsvTableComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() csvFile = '';
  tableData = null;



  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.csvFile);
    console.log('changes');
    if (this.csvFile) {
      this.tableData = this.csvFile.split('\n').pop();
      console.log(this.tableData);

    }


  }

  generateCode() {
    const codGen = document.getElementById('codeGen');
    var gen = document.createElement('div');
    for (const it of this.tableData) {
      var snipper;
      for (const item of it.split(',')) {
        snipper = document.createElement('td');
        snipper.appendText(item);
        
      }
    }
  }

}
