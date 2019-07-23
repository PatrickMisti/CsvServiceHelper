import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {ArticleEnum} from '../../article.enum';

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
    this.articles = Object.keys(ArticleEnum).filter(k => typeof ArticleEnum[k as any] === 'number');
  }

  ngOnChanges(changes: SimpleChanges) {
    const file = changes.csvFile.currentValue;
    console.log('changes');
    this.tableData = '';
    if (file) {
      this.tableData = file.split('\n');
      this.tableData.pop();
    } else {
      console.log('no change');
    }
    this.csvList.emit(this.tableData);
  }

  setParamsForDataBase(article, btn) {
    document.getElementById(btn).innerText = article;
  }
}
