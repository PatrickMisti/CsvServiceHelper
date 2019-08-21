import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModelTextEnum} from '../../../model-text.enum';
import {ModelText} from '../../../entities/model-text';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-csv-overview-bottom-sheet',
  templateUrl: './csv-overview-bottom-sheet.component.html',
  styleUrls: ['./csv-overview-bottom-sheet.component.css']
})
export class CsvOverviewBottomSheetComponent implements OnInit, AfterViewInit {
  myArray: FormArray;
  list = [];
  dropdownArray = [];
  placeholderList = [];
  linear = false;
  modelText: ModelText;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private bottomSheetRef: MatBottomSheetRef<CsvOverviewBottomSheetComponent>,
              private formBuilder: FormBuilder, private globalVariables: GlobalService) {
    this.globalVariables.GlobalModelText.subscribe(value => this.modelText = value);
  }

  static btnCheckForForm(inputFields, dd) {
    let bool = false;
    for (let i = 0; i < inputFields.length; i++) {
        if ((dd[i]  === 0  || dd[i] === undefined) && inputFields[i] === '')  {
          bool = true;
        }
      }
    return bool;
  }

  ngOnInit() {
    console.log('hallo');
    // übergibt ob stepper frei oder gesperrt ist
    this.linear = this.data.linear;
    // übergibt dropdownMenu von overview
    this.dropdownArray = this.data.ddMenu;

    // umwandlung von der Entity zu einer Liste
    this.placeholderList = Object.values(this.modelText);
    // nur die ersten drei sind wichtig
    this.placeholderList.splice(this.placeholderList.length / 2, this.placeholderList.length);

    // liste von ModelTextEnum Elementen
    this.list = (Object.keys(ModelTextEnum).filter(k => typeof ModelTextEnum[k as any] === 'number')).splice(1);
    if (this.linear) {
      this.list = this.list.map((res, index) => !this.dropdownArray[index] ? res : undefined)
          .filter(p => p !== undefined);
    } else {
      this.list = this.list.filter(p => p !== ModelTextEnum[4].toString() && p !== ModelTextEnum[5] && p !== ModelTextEnum[6]);
    }
    this.myArray = new FormArray(this.list.map((res) => this.formBuilder.group({validators: ['', Validators.required]})));
  }

  safeGlobalModelText() {
    // füllt global ModelText
    this.fillGlobalModelText();
    if (this.linear === true) {
      this.spinnerMethode();
    } else {
      this.bottomSheetRef.dismiss();
    }
  }

  fillGlobalModelText() {
    const modelText = this.modelText;              // füllt modelText global
    const orderList = ModelText.getOrder();
    try {
      modelText.dltCountryCode = (document.getElementById(ModelTextEnum[orderList[0]]) as HTMLInputElement).value;
      modelText.supplierID = (document.getElementById(ModelTextEnum[orderList[1]]) as HTMLInputElement).value;
      modelText.brand = (document.getElementById(ModelTextEnum[orderList[2]]) as HTMLInputElement).value;
    } catch (e) {}
    this.globalVariables.modelTextChange(this.modelText);
  }

  ngAfterViewInit(): void {
    // nur wenn stepper sperrt
    if (this.linear === true) {
      const inputs = document.querySelectorAll('[type="text"]');                                // hollt sich alle input felder
      const knapp = document.querySelector('#submitBtn') as HTMLButtonElement;                  // hollt sich submit Button
      const dd = [];
      const all = [];
      inputs.forEach(v => {
        dd.push(this.dropdownArray.find(p => p === ModelTextEnum[v.id]));
        all.push((v as HTMLInputElement).value);
      });
      knapp.disabled = CsvOverviewBottomSheetComponent.btnCheckForForm(all, dd);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', () => {
          const valu = [];
          const dds = dd;
          inputs.forEach(v => {
            valu.push((v as HTMLInputElement).value);                       // hollt sich alle Ergebnisse von denn Inputs
          });
          // disabled Speicher Btn nur wenn nicht im Input steht
          knapp.disabled = CsvOverviewBottomSheetComponent.btnCheckForForm(valu, dds);
        });
      }
      if (this.dropdownArray.filter(p => p === true).length === 6) {
        this.spinnerMethode();
      }
    } else {
      const knapp = document.querySelector('#submitBtn') as HTMLButtonElement;
      knapp.disabled = false;
    }
  }

  async spinnerMethode() {
    document.getElementById('spinner-form').classList.remove('spinner-style-toggle');
    document.getElementById('input-form').classList.add('spinner-style-toggle');
    sleep(2000).then(() => this.bottomSheetRef.dismiss());       // falls alles schon gesetzt ist bottomSheet close
  }
}
async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
