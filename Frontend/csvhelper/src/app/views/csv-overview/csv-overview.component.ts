import {Component, OnInit} from '@angular/core';
import {ModelText} from '../../entities/model-text';
import {ModelTextEnum} from '../../model-text.enum';
import {HttpService} from '../../services/http.service';
import {CsvOverviewBottomSheetComponent} from './csv-overview-bottom-sheet/csv-overview-bottom-sheet.component';
import {MatBottomSheet} from '@angular/material';
import {GlobalService} from '../../services/global.service';
import {EnumValue} from '@angular/compiler-cli/src/ngtsc/metadata';
import {Utils} from '../../services/Utils';

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
    /*const test = new ModelText('AT', '123', '456', 'Nike', 'asdf', 'fdsa');
    this.sendToService(test);*/
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
    // Aufruf des bottomSheet
    const bottomSheetRef = this.bottomSheet.open(CsvOverviewBottomSheetComponent, {
      data: {linear: false}
    });
    bottomSheetRef.afterDismissed().subscribe();
  }

  safeTable() {
    console.log('hallo');
    if (this.tableData.length !== 0) {
      const {booleanBtn, dropdownList} = this.dropdownArrayBuilder();
      if (booleanBtn[3] && booleanBtn[4]) {
        const bottomSheetRef = this.bottomSheet.open(CsvOverviewBottomSheetComponent, {
          data: {linear: true, ddMenu: booleanBtn},
          disableClose: true                            // Benuter soll denn bottomSheet nicht zu machen
        });
        // wenn sheet geschlossen wird soll das Array mit dem ModelText entity ersetzt werden und dann alles gleich versenden alles async
        bottomSheetRef.afterDismissed()
            .subscribe(() => this.arrayModelBuilder(dropdownList, booleanBtn)
                .then(res => this.sendToService(res))
                .then(() => this.deleteModelText()));
      } else {
        alert('ModelNumber und Beschreibung fehlen!!!');
      }
    } else {
      alert('Keine Daten vorhanden!!!');
    }
  }

  dropdownArrayBuilder() {
    const r1 = this.tableData[0].split(this.split);
    const r2 = this.tableData[1].split(this.split);
    const table = r1.length > r2.length ? r2 : r1;
    const dropdownList = table.map((res, index) => document.getElementById('ddBtn' + index).innerText);
    let booleanBtn = ModelText.getOrder().map(res => !!(dropdownList.find(p => p === ModelTextEnum[res])));
    booleanBtn = Object.values(this.modelText).map((value, index) => (value !== '' || booleanBtn[index] === true));
    booleanBtn[booleanBtn.length - 1] = true;
    return {booleanBtn, dropdownList};
  }

  async arrayModelBuilder(dropdownOrder, booleanBtn) {
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
        (dropdownOrder.find(p => p === ModelTextEnum[order[0]]) ?
            colm[dropdownOrder.indexOf(ModelTextEnum[order[0]])] : this.modelText.DltCountryCode),
        (dropdownOrder.find(p => p === ModelTextEnum[order[1]]) ?
            colm[dropdownOrder.indexOf(ModelTextEnum[order[1]])] : this.modelText.SupplierID),
        (dropdownOrder.find(p => p === ModelTextEnum[order[2]]) ?
            colm[dropdownOrder.indexOf(ModelTextEnum[order[2]])] : this.modelText.Brand),
        (dropdownOrder.find(p => p === ModelTextEnum[order[3]]) ?
            colm[dropdownOrder.indexOf(ModelTextEnum[order[3]])] : this.modelText.ModelNumber),
        (dropdownOrder.find(p => p === ModelTextEnum[order[4]]) ?
            colm[dropdownOrder.indexOf(ModelTextEnum[order[4]])] : this.modelText.Description),
        (dropdownOrder.find(p => p === ModelTextEnum[order[5]]) ?
            colm[dropdownOrder.indexOf(ModelTextEnum[order[5]])] : this.modelText.Text),
      ));
    });
    return resultList;
  }

  async deleteModelText() {
    this.globalVariables.modelTextChange(new ModelText('AT', '', '', '', '', ''));
    this.deleteTable();
  }

  async sendToService(result) {
    await this.client.sendModelTextData(result);
  }
}
