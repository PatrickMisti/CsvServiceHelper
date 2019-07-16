import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Action} from 'rxjs/internal/scheduler/Action';
import {renderComponent} from '@angular/core/src/render3';

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
    /*const dropdownUl = document.getElementById('dropBtn');
    if (!dropdownUl) {
      dropdownUl.addEventListener('click', () => {
        dropdownUl.classList.toggle('active', true);
      });
    }*/
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
      tableColumn.innerHTML = this.dropDownMenuBuilder();
      tableHeadRow.appendChild(tableColumn);
    }
    tableHeadBuilder.appendChild(tableHeadRow);
    table.appendChild(tableHeadBuilder);
    this.dropDownMenuBuilder();
  }

  dropDownMenuBuilder() {
    const vars =
      '<div class="dropdown">' +
      '   <button id="dropBtn">Dropdown</button>' +
      '   <ul  >' +
      '     <li><a href="#">Item</a> </li>' +
      '     <li><a href="#">Item</a> </li>' +
      '   </ul>' +
      '</div>';
      /*'<div>' +
      ' <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" ' +
      '         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
      '   Dropdown button' +
      ' </button>' +
      ' <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
      '   <a class="dropdown" href="#">Action</a>' +
      '   <a class="dropdown" href="#">Another</a>' +
      ' </div>' +
      '</div>';*/
    console.log(vars);
    return vars;
    /*const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');
    const ddbtn = document.createElement('button');
    ddbtn.classList.add('btn btn-secondary dropdown-toggle');
    ddbtn.type = 'button';
    ddbtn.setAttribute('id', 'dropdownMenuButton');
    dropdown.appendChild(ddbtn);
    const menu = document.createElement('div');
    menu.classList.add('dropdown-menu');
    const test = document.createElement('a');
    test.classList.add('dropdown-item');
    test.innerText = 'Action';
    menu.appendChild(test);
    dropdown.appendChild(menu);
    console.log(dropdown);*/
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
