import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-table-edit-popup',
  templateUrl: './table-edit-popup.component.html',
  styleUrls: ['./table-edit-popup.component.css']
})
export class TableEditPopupComponent implements OnInit {

  arrayList = [];

  constructor(public dialogRef: MatDialogRef<TableEditPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.data.split(';').map(it => this.arrayList.push(it));
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
