import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';
import {ArticleEnum} from '../../article.enum';
import {toArray} from 'rxjs/operators';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.css']
})
export class CsvTableComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() csvFile = '';
  tableData = null;
  articles = [];
  counter = 0;
  // splitter = '';



  ngOnInit() {
    /*if (window.navigator.platform === 'Linux x86_64') {
      this.splitter = ';';
    } else if (window.navigator.platform === 'Win x64') {
      this.splitter = ';';
    }*/
    // tslint:disable-next-line:forin
    /*for (const it in ArticleEnum) {
      console.log(it);
      this.article.push(it);
    }*/
    this.articles = Object.keys(ArticleEnum).filter(k => typeof ArticleEnum[k as any] === 'number');
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log('changes');
    this.tableData = '';
    if (this.csvFile) {
      this.tableData = this.csvFile.split('\n');
      this.tableData.pop();
    } else {
      console.log('no change');
    }
    this.csvFile = '';
  }

  setButtonId() {
    this.counter++;
    return this.counter;

  }

  setParamsForDataBase(article) {
    console.log(article);

    /*if (this.article.length < counter) {
      this.counter -= this.article.length;
    } else {
      this.counter++;
    }
    console.log(counter);*/
  }
}
