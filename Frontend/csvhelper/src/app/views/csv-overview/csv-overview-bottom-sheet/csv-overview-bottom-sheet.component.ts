import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModelTextEnum} from '../../../model-text.enum';
import {Globals} from '../../../globals';
import {ModelText} from '../../../entities/model-text';

@Component({
  selector: 'app-csv-overview-bottom-sheet',
  templateUrl: './csv-overview-bottom-sheet.component.html',
  styleUrls: ['./csv-overview-bottom-sheet.component.css']
})
export class CsvOverviewBottomSheetComponent implements OnInit {
  myArray: FormArray;
  list = [];
  placeholderList = [];
  linear = false;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private bottomSheetRef: MatBottomSheetRef<CsvOverviewBottomSheetComponent>,
              private formBuilder: FormBuilder, private global: Globals) {}

  ngOnInit() {
    this.list = Object.keys(ModelTextEnum).filter(k => typeof ModelTextEnum[k as any] === 'number');
    this.list.shift();
    this.placeholderList = Object.values(this.global.modelText);
    this.linear = this.data.linear;
    this.myArray = new FormArray(this.placeholderList.map(() => this.formBuilder.group({validators: ['', Validators.required]})));
  }

  safeGlobalModelText() {
    this.bottomSheetRef.dismiss('hallo');
  }
}
