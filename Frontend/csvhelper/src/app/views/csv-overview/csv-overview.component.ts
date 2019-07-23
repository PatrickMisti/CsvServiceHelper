import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-csv-overview',
  templateUrl: './csv-overview.component.html',
  styleUrls: ['./csv-overview.component.css']
})
export class CsvOverviewComponent implements OnInit, OnChanges {

  active = false;
  tableWare: string | ArrayBuffer;
  tableData = [];

  constructor() {}

  ngOnInit(): void {
    this.buttonInit();
    console.log('start');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log('change in overview');
  }

  buttonInit() {
    const toggle = document.querySelector('.toggle');
    const ul = document.querySelector('ul');
    toggle.addEventListener('click', () => {
      if (!this.active) {
        toggle.classList.toggle('active', true);
        ul.classList.toggle('active', true);
        this.active = true;
      } else {
        toggle.classList.toggle('active', false);
        ul.classList.toggle('active', false);
        this.active = false;
      }
    });
  }

  deleteTable() {
    const table = document.querySelector('#table');
    const filePicker = document.querySelector('#filePicker') as HTMLInputElement;
    if (table != null) {
      table.innerHTML = '';
      this.tableWare = null;
      table.parentNode.removeChild(table);
      filePicker.value = '';
      alert('Erfolgreich gelöscht');
    } else {
      alert('Es wurde noch kein File eingelesen');
    }
  }

  deleteSelectedRows() {
    if (this.tableData.length > 0) {
      const table = (document.getElementById('table') as HTMLTableElement);
      const rows = Array.from(table.rows);
      rows.shift();
      if (this.tableWare != null) {
        for (let i = 0; i < rows.length; i++) {
          const check = rows[i].firstElementChild.children[0] as HTMLInputElement;
          if (check.checked === true) {
            rows[i].parentNode.removeChild(rows[i]);
            rows.splice(i, 1);
            this.tableData.splice(i, 1);
            i--;
          }
        }
      }
      if (this.tableData.length === 0) {
        this.deleteTable();
      }
    }
  }

  safeTable() {
    alert('Daten sind gespeichert worden!!!');
  }

  fillTableWare(event: string | ArrayBuffer) {
    this.tableWare = event;
  }

  fillTableData(event) {
    this.tableData = event;
  }
}
