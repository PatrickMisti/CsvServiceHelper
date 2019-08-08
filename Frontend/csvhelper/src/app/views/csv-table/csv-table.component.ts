import {Component, OnInit} from '@angular/core';
import {ModelTextEnum} from '../../model-text.enum';
import {MatDialog} from '@angular/material';
import {TableEditPopupComponent} from './table-edit-popup/table-edit-popup.component';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.css']
})
export class CsvTableComponent implements OnInit {
  /*@Input() csvFile: string;
  @Output() csvList = new EventEmitter();*/
  tableData = [];
  articles = [];
  dV = document;
  split = '';

  constructor(public dialog: MatDialog, private globalVariables: GlobalService) {
    this.globalVariables.GlobalSplit.subscribe(value => this.split = value);
    this.globalVariables.GlobalTableData.subscribe(value => {
      if (value[value.length - 1] === '') {
        value.pop();
      }
      this.tableData = value;
    });
  }

  ngOnInit() {
    // Enum zu einer Liste konvertieren
    this.articles = Object.keys(ModelTextEnum).filter(k => typeof ModelTextEnum[k as any] === 'number');
    this.tableData.pop();
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
      if (result !== undefined) {                                   // muss überprüfen wegen raus klick
        this.tableData[index] = result;                             // Update des Datensatzes am bestimmten index
      }
    });
  }
}
