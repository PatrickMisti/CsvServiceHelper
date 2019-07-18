import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

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

    console.log('changes');
    this.tableData = '';
    if (this.csvFile) {
      this.tableData = this.csvFile.split('\n');
      this.tableData.pop();
    } else {
      console.log('no change');
    }
    this.csvFile = '';
  }
}
