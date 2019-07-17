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
    if (this.csvFile) {
      this.tableData = this.csvFile.split('\n');
      this.tableData.pop();
      // this.generateCode();
    }
  }

  /*generateCode() {
    const codGen = document.getElementById('table');
    const tableRow = document.createElement('tbody');
    for (const it of this.tableData) {
      const trBuilder = document.createElement('tr');
      const colm = it.split(',');
      colm.map(e => {
        const tdBuilder = document.createElement('td');
        tdBuilder.innerText = e;
        trBuilder.appendChild(tdBuilder);
      });
      tableRow.appendChild(trBuilder);
    }
    codGen.appendChild(tableRow);
  }*/
}
