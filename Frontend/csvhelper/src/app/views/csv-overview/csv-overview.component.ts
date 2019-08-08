import {Component, OnInit} from '@angular/core';
import {ModelText} from '../../entities/model-text';
import {ModelTextEnum} from '../../model-text.enum';
import {HttpService} from '../../services/http.service';
import {CsvOverviewBottomSheetComponent} from './csv-overview-bottom-sheet/csv-overview-bottom-sheet.component';
import {MatBottomSheet} from '@angular/material';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-csv-overview',
  templateUrl: './csv-overview.component.html',
  styleUrls: ['./csv-overview.component.css']
})
export class CsvOverviewComponent implements OnInit {

  active = false;
  tableData = [];
  loading = false;
  split: string;
  modelText: ModelText;

  constructor(private client: HttpService, private globalVariables: GlobalService, private bottomSheet: MatBottomSheet) {
    this.globalVariables.GlobalSplit.subscribe(value => this.split = value);
    this.globalVariables.GlobalModelText.subscribe(value => this.modelText = value);
    this.globalVariables.GlobalTableData.subscribe(value => this.tableData = value);
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
      this.tableData = [];
      this.globalVariables.tableChange(this.tableData);
      table.parentNode.removeChild(table);                // entfernen des Tables
      filePicker.value = '';                              // löschen des Pfades
      // alert('Erfolgreich gelöscht');
    } else {
      alert('Es wurde noch kein File eingelesen');
    }
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
      if (this.tableData != null) {
        for (let i = 0; i < rows.length; i++) {
          const check = rows[i].firstElementChild.children[0] as HTMLInputElement;
          if (check.checked === true) {                     // ob input type checkbox true ist
            rows[i].parentNode.removeChild(rows[i]);        // löscht Eintrag von der Tabelle
            rows.splice(i, 1);                   // löscht Eintrag vom Array
            this.tableData.splice(i, 1);         // löscht Datensatz
            i--;                                            // da keine Löcher beim löschen entstehen muss eins zurück gesetzt werden
          }
        }
        this.globalVariables.tableChange(this.tableData);
      }
      if (this.tableData.length === 0) {
        this.deleteTable();                                 // falls kein Datensatz mehr vorhanden ist löscht auch thead
      }
    }
  }

  settingForDropdown() {
    console.log('hallo');
    // Aufruf des bottomSheet
    const bottomSheetRef = this.bottomSheet.open(CsvOverviewBottomSheetComponent, {
      data: {linear: false}
    });
    bottomSheetRef.afterDismissed().subscribe();
  }

  safeTable() {
    let results;                  // wir gebraucht für den rowChecker
    try {
      const dropdownArray = this.rowChooseArrayBuilder();                       // holt sich alles
      results = this.rowChecker(dropdownArray);
      if (this.tableData.length !== 0 && results > 0) {
        const bottomSheetRef = this.bottomSheet.open(CsvOverviewBottomSheetComponent, {
          data: {linear: true, btnDisable: results, ddMenu: dropdownArray},
          disableClose: true                            // Benuter soll denn bottomSheet nicht zu machen
        });
        // wenn sheet geschlossen wird soll das Array mit dem ModelText entity ersetzt werden und dann alles gleich versenden alles async
        bottomSheetRef.afterDismissed().subscribe(() => this.arrayModelBuilder(dropdownArray).then(res => this.sendToService(res)));
      } else {
        alert('Bitte Dropdowns richtig füllen mit Modelnumber und Text!!!');
      }
    } catch (e) {
      alert('Keine Daten vorhanden!!!');
    }
  }

  rowChooseArrayBuilder() {
    const btnSelector = [];
    for (let i = 0; i < this.tableData[1].split(this.split).length; i++) {
      const btn = document.getElementById('ddBtn' + i).textContent;             // holt sich alle Elemente von der dd Menu
      btnSelector.push(ModelTextEnum[btn]);                                              // Speicher alles
    }
    return btnSelector;
  }

  rowChecker(btnSelector) {
    const order = ModelText.getOrder();         // hold sich die Reihenfolge vom Object
    let bool = 1;                               // wichtig für bottomSheet
    btnSelector.map(item => {
      if (order.find(p => p === item) === undefined && bool) {        // untersucht ob von der dd Auswahl das Element vorhanden ist
        bool = -1;                                                             // -1 eines oder mehrere Elemente nicht gefunden
      }
    });
    // wenn bool = -1 ist gibt es noch die Chance das die Wichtigen Sachen vorhanden sind
    if (btnSelector.find(p => p === ModelTextEnum.ModelNumber) && btnSelector.find(p => p === ModelTextEnum.Text) && bool !== 1) {
      bool = 2;                         // wichtig für bottomSheet
    }
    return bool;
  }

  async arrayModelBuilder(dropdownOrder) {
    // String zu Entity konvertieren
    const resultList = [];
    // genau einmal die Ganze liste
    this.tableData.map(item => {
      // Entity Reihenfolge
      const order = ModelText.getOrder();
      const colm = item.split(this.split);                      // Aufspaltung des Strings
      resultList.push(new ModelText(                            // Befüllen der Liste
        // schaut ob element überhaupt vorhanden um Exeption zu umgehen dann
        // die Suche nach dem Element im string falls element nicht vorhanden default value
        (dropdownOrder.find(p => p === order[0]) ? colm[dropdownOrder.indexOf(order[0])] : this.modelText.DltCountryCode),
        (dropdownOrder.find(p => p === order[1]) ? colm[dropdownOrder.indexOf(order[1])] : this.modelText.SupplierId),
        (dropdownOrder.find(p => p === order[2]) ? colm[dropdownOrder.indexOf(order[2])] : this.modelText.Brand),
        (dropdownOrder.find(p => p === order[3]) ? colm[dropdownOrder.indexOf(order[3])] : this.modelText.ModelNumber),
        (dropdownOrder.find(p => p === order[4]) ? colm[dropdownOrder.indexOf(order[4])] : this.modelText.Description),
        (dropdownOrder.find(p => p === order[5]) ? colm[dropdownOrder.indexOf(order[5])] : this.modelText.Text),
      ));
    });
    return resultList;
  }

  async sendToService(result) {
    console.log(result);
    await HttpService.sendModelTextData(result);
  }
}
