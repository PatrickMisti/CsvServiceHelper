import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ArticleEnum} from '../../article.enum';

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
  chosenArticle = '';
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

  setParamsForDataBase(article, btn) {
    this.chosenArticle = article;
    document.getElementById(btn).innerText = this.chosenArticle;
    console.log(article);

    /*if (this.article.length < counter) {
      this.counter -= this.article.length;
    } else {
      this.counter++;
    }
    console.log(counter);*/
  }

  getButtonArticle(getId) {
    const chosen = document.getElementById(getId.toString());
    if (chosen == null) {
      this.chosenArticle = this.articles[0];
      return this.chosenArticle;
    }
    return this.chosenArticle;
  }
}
