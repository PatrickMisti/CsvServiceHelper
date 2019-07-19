import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ArticleEnum} from '../../article.enum';
import {DataTableService} from '../../service/data-table.service';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.css']
})
export class CsvTableComponent implements OnInit, OnChanges {
  @Input() csvFile = '';
  tableData = null;
  articles = [];
  dV = document;
  // splitter = '';

  constructor(private data: DataTableService) { }

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
      // this.data.setTable(this.tableData);
    } else {
      console.log('no change');
    }
    this.csvFile = '';
  }

  setParamsForDataBase(article, btn) {
    document.getElementById(btn).innerText = article;
  }
}
