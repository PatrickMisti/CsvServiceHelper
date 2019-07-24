import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {ModelTextEnum} from '../../model-text.enum';

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
  // splitter = '';

  constructor() { }

  ngOnInit() {
    /*if (window.navigator.platform === 'Linux x86_64') {
      this.splitter = ';';
    } else if (window.navigator.platform === 'Win x64') {
      this.splitter = ';';
    }*/
    // Enum zu einer Liste konvertieren
    this.articles = Object.keys(ModelTextEnum).filter(k => typeof ModelTextEnum[k as any] === 'number');
  }

  ngOnChanges(changes: SimpleChanges) {
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

  setParamsForDataBase(article, btn) {
    document.getElementById(btn).innerText = article;
  }
}
