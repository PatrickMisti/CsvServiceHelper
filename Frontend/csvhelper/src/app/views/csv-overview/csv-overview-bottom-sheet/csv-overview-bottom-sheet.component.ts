import {AfterViewInit, Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class CsvOverviewBottomSheetComponent implements OnInit, AfterViewInit {
  myArray: FormArray;
  list = [];
  placeholderList = [];
  linear = false;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private bottomSheetRef: MatBottomSheetRef<CsvOverviewBottomSheetComponent>,
              private formBuilder: FormBuilder, private global: Globals) {
  }

  ngOnInit() {
    // liste von ModelTextEnum Elementen
    this.list = (Object.keys(ModelTextEnum).filter(k => typeof ModelTextEnum[k as any] === 'number')).splice(1);
    // nur die ersten drei sind wichtig
    this.list.splice(this.list.length / 2, this.list.length);
    // umwandlung von der Entity zu einer Liste
    this.placeholderList = Object.values(this.global.modelText);
    // nur die ersten drei sind wichtig
    this.placeholderList.splice(this.placeholderList.length / 2, this.placeholderList.length);
    // übergibt ob stepper frei oder gesperrt ist
    this.linear = this.data.linear;
    let counter = -1;
    // FormArray für jedes Element im Placeholder
    this.myArray = new FormArray(this.placeholderList.map(() => {
      counter++;
      if (this.placeholderList[counter] === '') {                                                 // falls nicht im placeholder ist
        return this.formBuilder.group({validators: ['', Validators.required]});      // required setzten
      } else {
        return this.formBuilder.group({validators: ['.', !Validators.required]});    // sonst nicht
      }
    }));
  }

  safeGlobalModelText() {
    // füllt global ModelText
    this.fillGlobalModelText();
    this.bottomSheetRef.dismiss();
  }

  fillGlobalModelText() {
    const modelText = this.global.modelText;              // füllt modelText global
    const orderList = ModelText.getOrder();
    modelText.DltCountryCode = (document.getElementById(ModelTextEnum[orderList[0]]) as HTMLInputElement).value;
    modelText.SupplierId = (document.getElementById(ModelTextEnum[orderList[1]]) as HTMLInputElement).value;
    modelText.Brand = (document.getElementById(ModelTextEnum[orderList[2]]) as HTMLInputElement).value;
  }

  ngAfterViewInit(): void {
    // nur wenn stepper sperrt
    if (this.linear === true) {
      const inputs = document.querySelectorAll('[type="text"]');                                // hollt sich alle input felder
      const knapp = document.querySelector('#submitBtn') as HTMLButtonElement;                  // hollt sich submit Button
      knapp.disabled = false;

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', () => {
          const valu = [];
          inputs.forEach(v => {
            valu.push((v as HTMLInputElement).value);

          });    // hollt sich alle Ergebnisse von denn Inputs
          knapp.disabled = valu.includes('');                                         // disabled Speicher Btn nur wenn nicht im Input steht
        });
      }
    }
    if (this.data.btnDisable === 1) {
      document.getElementById('spinner-form').classList.remove('spinner-style-toggle');
      document.getElementById('input-form').classList.add('spinner-style-toggle');
      sleep(3000).then(() => this.bottomSheetRef.dismiss());       // falls alles schon gesetzt ist bottomSheet close
    }
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
