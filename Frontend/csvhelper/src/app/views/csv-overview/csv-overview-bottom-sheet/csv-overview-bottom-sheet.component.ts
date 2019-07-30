import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-csv-overview-bottom-sheet',
  templateUrl: './csv-overview-bottom-sheet.component.html',
  styleUrls: ['./csv-overview-bottom-sheet.component.css']
})
export class CsvOverviewBottomSheetComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private bottomSheetRef: MatBottomSheetRef<CsvOverviewBottomSheetComponent>, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  /*openLink() {
    this.bottomSheetRef.dismiss('hallo');
  }*/
}
