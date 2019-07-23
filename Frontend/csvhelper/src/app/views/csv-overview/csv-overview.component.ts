import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-csv-overview',
  templateUrl: './csv-overview.component.html',
  styleUrls: ['./csv-overview.component.css']
})
export class CsvOverviewComponent implements OnInit {

  active = false;
  tableWare: string | ArrayBuffer;
  tableData = [];

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
    // initzialisiertung von table & filePicker von csv-reader.component um alles zu löschen
    const table = document.querySelector('#table');
    const filePicker = document.querySelector('#filePicker') as HTMLInputElement;
    if (table != null) {
      table.innerHTML = '';                               // löschung der Tabelle
      this.tableWare = null;                              // löschung der Daten
      table.parentNode.removeChild(table);                // entfernen des Tables
      filePicker.value = '';                              // löschen des Pfades
      alert('Erfolgreich gelöscht');
    } else {
      alert('Es wurde noch kein File eingelesen');
    }
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

  safeTable() {
    alert('Daten sind gespeichert worden!!!');
  }

  fillTableWare(event: string | ArrayBuffer) {
    // holt Daten von csv-reader.component
    this.tableWare = event;
  }

  fillTableData(event) {
    // holt aufgesplittet die Daten von csv-table.component
    this.tableData = event;
  }
}
