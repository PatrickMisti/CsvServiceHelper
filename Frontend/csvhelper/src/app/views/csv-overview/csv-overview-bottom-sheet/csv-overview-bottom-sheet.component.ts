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
    this.list = (Object.keys(ModelTextEnum).filter(k => typeof ModelTextEnum[k as any] === 'number')).splice(1);
    this.list.splice(this.list.length / 2, this.list.length);
    this.placeholderList = Object.values(this.global.modelText);
    this.placeholderList.splice(this.placeholderList.length / 2, this.placeholderList.length);
    this.linear = this.data.linear;
    let counter = -1;
    this.myArray = new FormArray(this.placeholderList.map(() => {
        counter++;
        if (this.placeholderList[counter] === '') {
          return this.formBuilder.group({validators: ['', Validators.required]});
        } else {
          return this.formBuilder.group({validators: ['.', !Validators.required]});
        }
      }));
  }

  safeGlobalModelText() {
    this.fillGlobalModelText();
    this.bottomSheetRef.dismiss();
  }

  fillGlobalModelText() {
    const modelText = this.global.modelText;
    const orderList = ModelText.getOrder();
    modelText.DltCountryCode = (document.getElementById(ModelTextEnum[orderList[0]]) as HTMLInputElement).value;
    modelText.SupplierId = (document.getElementById(ModelTextEnum[orderList[1]]) as HTMLInputElement).value;
    modelText.Brand = (document.getElementById(ModelTextEnum[orderList[2]]) as HTMLInputElement).value;
  }
}
