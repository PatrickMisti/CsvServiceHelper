import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-table-edit-popup',
  templateUrl: './table-edit-popup.component.html',
  styleUrls: ['./table-edit-popup.component.css']
})
export class TableEditPopupComponent implements OnInit {
  split = '';
  arrayList = [];

  constructor(public dialogRef: MatDialogRef<TableEditPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
              private globalVariables: GlobalService) {
    this.globalVariables.GlobalSplit.subscribe(value => this.split = value);
  }

  ngOnInit() {
    this.data.split(this.split).map(i => this.arrayList.push(i));
  }

  onClick() {
    this.data = this.editRowBuilder();
    this.dialogRef.close(this.data);
  }

  editRowBuilder() {
    let count = 0;
    this.arrayList.map(i => {
      this.arrayList[count] = (document.getElementById('ta' + count)as HTMLTextAreaElement).value;
      count++;
    });
    return this.arrayList.join(this.split);
  }
}
