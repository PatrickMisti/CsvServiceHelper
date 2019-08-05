import {Component, OnInit} from '@angular/core';
import {ModelText} from '../../entities/model-text';
import {ModelTextEnum} from '../../model-text.enum';
import {HttpService} from '../../http.service';
import {Globals} from '../../globals';
import {CsvOverviewBottomSheetComponent} from './csv-overview-bottom-sheet/csv-overview-bottom-sheet.component';
import {MatBottomSheet} from '@angular/material';

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
  split = '';

  constructor(private client: HttpService, private global: Globals, private bottomSheet: MatBottomSheet) {
    this.split = this.global.splitter;
  }

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

  settingForDropdown() {
    const bottomSheetRef = this.bottomSheet.open(CsvOverviewBottomSheetComponent, {
      data: {linear: false}
    });
    bottomSheetRef.afterDismissed().subscribe();
  }

  safeTable() {
    console.log('hallo');
    if (this.tableData.length !== 0) {
      const dropdownArray = this.rowChooseArrayBuilder();
      if (this.rowChecker(dropdownArray)) {
        const safeToDb = this.arrayModelBuilder(dropdownArray);
        this.sendToService(safeToDb).then();
      } else {
        const bottomSheetRef = this.bottomSheet.open(CsvOverviewBottomSheetComponent, {
          data: {linear: true},
          disableClose: true
        });
        bottomSheetRef.afterDismissed().subscribe();
      }
    } else {
      alert('Keine Daten vorhanden!!!');
    }
  }

  rowChooseArrayBuilder() {
    const btnSelector = [];
    for (let i = 0; i < this.tableData[1].split(this.split).length; i++) {
      const btn = document.getElementById('ddBtn' + i).textContent;
      btnSelector.push(ModelTextEnum[btn]);
    }
    return btnSelector;
  }

  rowChecker(btnSelector) {
    const order = ModelText.getOrder();
    let bool = true;
    btnSelector.map(item => {
      if (order.find(p => p === item) === undefined) {
        bool = false;
      }
    });
    return bool;
  }

  arrayModelBuilder(dropdownOrder) {
    // String zu Entity konvertieren
    const resultList = [];
    // genau einmal die Ganze liste
    this.tableData.map(item => {
      // Entity Reihenfolge
      const order = ModelText.getOrder();
      const colm = item.split(this.split);                      // Aufspaltung des Strings
      resultList.push(new ModelText(                            // Befüllen der Liste
        (dropdownOrder.find(p => p === order[0]) ? colm[dropdownOrder.indexOf(order[0])] : 'AT'),   // schaut ob element überhaupt
        (dropdownOrder.find(p => p === order[1]) ? colm[dropdownOrder.indexOf(order[1])] : ''),     // vorhanden um Exeption zu umgehen
        (dropdownOrder.find(p => p === order[2]) ? colm[dropdownOrder.indexOf(order[2])] : ''),     // dann die Suche nach dem Element
        (dropdownOrder.find(p => p === order[3]) ? colm[dropdownOrder.indexOf(order[3])] : ''),     // im string falls element
        (dropdownOrder.find(p => p === order[4]) ? colm[dropdownOrder.indexOf(order[4])] : ''),     //  nicht vorhanden default value
        (dropdownOrder.find(p => p === order[5]) ? colm[dropdownOrder.indexOf(order[5])] : ''),
      ));
    });
    return resultList;
  }

  async sendToService(result) {
    await HttpService.sendModelTextData(result);
  }
}
