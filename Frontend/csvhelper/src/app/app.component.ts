import {Component, OnInit} from '@angular/core';
import {DataTableService} from './service/data-table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  active = false;

  constructor(private data: DataTableService) {}

  ngOnInit(): void {
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
    // var filePicker = document.querySelector('#filePicker');
    if (table != null) {
      table.innerHTML = '';
      table.parentNode.removeChild(table);
      // filePicker.value = '';
      // filePicker.nodeValue = '';
      alert('Erfolgreich gelöscht');
    } else {
      alert('Es wurde noch kein File eingelesen');
    }
  }

  deleteSelectedRows() {
    const table = document.querySelector('#table');

    let counter = 0;
    let item;
    // let tableData = [];
    if (table != null) {
      // this.data.getTable().subscribe(datas => tableData = datas);
      item = document.querySelector('#row' + counter);
      while (item != null) {
        if (counter !== 0) {
          item = document.querySelector('#row' + counter);
        }
        if (item.checked === true) {
          // tableData.splice(counter, 1);
          item.parentNode.removeChild(item);
        }
        counter++;
      }
      // this.data.setTable(tableData);
    }
    // console.log(tableData);
  }

  safeTable() {
    alert('Daten sind gespeichert worden!!!');
  }
}
