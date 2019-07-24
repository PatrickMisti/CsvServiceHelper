import {Component, OnInit} from '@angular/core';
import index from '@angular/cli/lib/cli';
import {ModelText} from '../../entities/model-text';
import {ModelTextEnum} from '../../model-text.enum';
import {async} from '@angular/core/testing';

@Component({
  selector: 'app-csv-overview',
  templateUrl: './csv-overview.component.html',
  styleUrls: ['./csv-overview.component.css']
})
export class CsvOverviewComponent implements OnInit {

  active = false;
  tableWare: string | ArrayBuffer;
  tableData = [];
  loading = false;

  constructor() {}

  ngOnInit(): void {
    this.buttonInit();
  }

  buttonInit() {
    // rechter unterer Button wird initialisiert um sich zu bewegen
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
    this.loading = true;
    // initzialisiertung von table & filePicker von csv-reader.component um alles zu löschen
    const table = document.querySelector('#table');
    const filePicker = document.querySelector('#filePicker') as HTMLInputElement;
    if (table != null) {
      table.innerHTML = '';                               // löschung der Tabelle
      this.tableWare = null;                              // löschung der Daten
      table.parentNode.removeChild(table);                // entfernen des Tables
      filePicker.value = '';                              // löschen des Pfades
      // alert('Erfolgreich gelöscht');
    } else {
      alert('Es wurde noch kein File eingelesen');
    }
    /*(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    })();*/
    this.loading = false;
  }

  deleteSelectedRows() {
    // Ausgewählte Reihen werden gelöscht
    // Überprüfen ob überhaupt was im Table ist
    if (this.tableData.length > 0) {
      // as HTMLTableElement konvertiert das Element um auf die HTML Methoden zugreifen zu können
      const table = (document.getElementById('table') as HTMLTableElement);
      // Konvertiert HTMLTableElement wieder zurück
      const rows = Array.from(table.rows);
      // schmeißt die erste Reihe weg
      rows.shift();
      if (this.tableWare != null) {
        for (let i = 0; i < rows.length; i++) {
          const check = rows[i].firstElementChild.children[0] as HTMLInputElement;
          if (check.checked === true) {                     // ob input type checkbox true ist
            rows[i].parentNode.removeChild(rows[i]);        // löscht Eintrag von der Tabelle
            rows.splice(i, 1);                   // löscht Eintrag vom Array
            this.tableData.splice(i, 1);         // löscht Datensatz
            i--;                                            // da keine Löcher beim löschen entstehen muss eins zurück gesetzt werden
          }
        }
      }
      if (this.tableData.length === 0) {
        this.deleteTable();                                 // falls kein Datensatz mehr vorhanden ist löscht auch thead
      }
    }
  }

  fillTableWare(event: string | ArrayBuffer) {
    // holt Daten von csv-reader.component
    this.tableWare = event;
  }

  fillTableData(event) {
    // holt aufgesplittet die Daten von csv-table.component
    this.tableData = event;
  }

  safeTable() {
    this.loading = true;
    const dropdownArray = this.rowChooseArrayBuilder();
    // const model = new ModelText('At', '879546', 'Adidas', '987', 'hose', 'aölskdjfalksnd');
    const safeToDb = this.arrayModelBuilder(dropdownArray);
    console.log(safeToDb);
    this.loading = false;
  }

  rowChooseArrayBuilder() {
    const btnSelector = [];
    for (let i = 0; i < this.tableData[1].split(';').length; i++) {
      const btn = document.getElementById('ddBtn' + i).textContent;
      console.log(btn + ' = ' + ModelTextEnum[btn]);
      btnSelector.push(ModelTextEnum[btn]);
    }
    return btnSelector;
  }

  arrayModelBuilder(dropdownOrder) {
    const resultList = [];
    const result = [];
    for (const item of this.tableData) {
      for (const order of ModelText.getOrder()) {
        for (const arrayList of dropdownOrder) {
          if (order === arrayList) {
            const itemSplit = item.split(';');
            result.push(itemSplit[dropdownOrder.indexOf(arrayList)]);
          }
        }
      }
      resultList.push(new ModelText(result[0], result[1], result[2], result[3], result[4], result[5]));
    }
    return resultList;
  }
}
