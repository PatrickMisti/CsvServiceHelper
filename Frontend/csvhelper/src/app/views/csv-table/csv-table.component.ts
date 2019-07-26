import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ModelTextEnum} from '../../model-text.enum';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TableEditPopupComponent} from './table-edit-popup/table-edit-popup.component';
import {Globals} from '../../globals';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.css']
})
export class CsvTableComponent implements OnInit, OnChanges {
  @Input() csvFile: string;
  @Output() csvList = new EventEmitter();
  tableData = null;
  articles = [];
  dV = document;
  split = '';

  constructor(public dialog: MatDialog, private global: Globals) {
    this.split = this.global.splitter;
  }

  ngOnInit() {
    // Enum zu einer Liste konvertieren
    this.articles = Object.keys(ModelTextEnum).filter(k => typeof ModelTextEnum[k as any] === 'number');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.split = this.global.splitter;
    console.log(this.split);
    // wenn ein File reinkommt zur Bearbitung
    // @Input wird verwendet um überhaupt die Chance zu haben ngOnChange aufzurufen
    const file = changes.csvFile.currentValue;
    this.tableData = '';
    if (file) {
      this.tableData = file.split('\n');                // Splittet in Rows
      this.tableData.pop();                                     // löscht letzte Zeile wird unnötig automatisch generiert
    }
    // gesplittete Daten werden an Overview gesendet
    this.csvList.emit(this.tableData);
  }

  editPopUp(item) {
    // index speichern für das updaten des Datensatzes
    const index = this.tableData.indexOf(item);
    // öffnen eines pop-up Fensters TableEditPopupComponent mit item
    const dialogRef = this.dialog.open(TableEditPopupComponent, {
      width: '500px',
      height: '800px',
      data: item
    });
    // beim Schließen des Fensters daten zurückliefern
    dialogRef.afterClosed().subscribe(result => {
      this.tableData[index] = result;                             // Update des Datensatzes am bestimmten index
    });
  }
}
