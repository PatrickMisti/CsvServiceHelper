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
      this.generateHeadCode();
      this.generateCode();
    }


  }

  generateHeadCode() {
    const tableHead = this.tableData[1];
    const colm = tableHead.split(',').length;
    const table = document.getElementById('table');
    const tableHeadBuilder = document.createElement('thead');
    const tableHeadRow = document.createElement('tr');

    console.log(colm);
    for (let i = 0; i < colm; i++) {
      const tableColumn = document.createElement('td');
      tableHeadRow.appendChild(tableColumn);
    }
    tableHeadBuilder.appendChild(tableHeadRow);
    table.appendChild(tableHeadBuilder);
  }

  generateCode() {
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
    console.log(tableRow);
    // codGen.innerHTML = '';
    codGen.appendChild(tableRow);
  }
}
