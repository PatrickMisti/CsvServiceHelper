import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModelTextEnum} from '../../../model-text.enum';
import {Globals} from '../../../globals';
import {ModelText} from '../../../entities/model-text';

@Component({
  selector: 'app-csv-overview-bottom-sheet',
  templateUrl: './csv-overview-bottom-sheet.component.html',
  styleUrls: ['./csv-overview-bottom-sheet.component.css']
})
export class CsvOverviewBottomSheetComponent implements OnInit {
  firstFormGroup: FormGroup;
  list = [];
  globalModel: ModelText;
  placeholderList = [];
  dV = document;
  linear = false;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private bottomSheetRef: MatBottomSheetRef<CsvOverviewBottomSheetComponent>,
              private formBuilder: FormBuilder, private global: Globals) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.list = Object.keys(ModelTextEnum).filter(k => typeof ModelTextEnum[k as any] === 'number');
    this.list.shift();
    this.globalModel = this.global.modelText;
    this.placeholderList = Object.values(this.globalModel);
    console.log('hallo');
    this.linear = this.data.linear;
  }

  safeGlobalModelText() {
  }

  setRequired(id, index) {
    if (this.placeholderList[index] !== '') {
      this.dV.getElementById(id).setAttribute('required', '');
    }
  }
}
