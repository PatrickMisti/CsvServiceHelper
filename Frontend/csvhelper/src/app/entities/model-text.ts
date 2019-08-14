import {ModelTextEnum} from '../model-text.enum';

export class ModelText {
  constructor(public dltCountryCode: string = '', public supplierID: string = '', public brand: string = '',
              public modelNumber: string = '', public description: string = '', public text: string = '') {}


  get DltCountryCode(): string {
    return this.dltCountryCode;
  }

  set DltCountryCode(value: string) {
    this.dltCountryCode = value;
  }

  get SupplierID(): string {
    return this.supplierID;
  }

  set SupplierID(value: string) {
    this.supplierID = value;
  }

  get Brand(): string {
    return this.brand;
  }

  set Brand(value: string) {
    this.brand = value;
  }

  get ModelNumber(): string {
    return this.modelNumber;
  }

  set ModelNumber(value: string) {
    this.modelNumber = value;
  }

  get Description(): string {
    return this.description;
  }

  set Description(value: string) {
    this.description = value;
  }

  get Text(): string {
    return this.text;
  }

  set Text(value: string) {
    this.text = value;
  }

  static getOrder() {
    return [ModelTextEnum.DLTCountryCode, ModelTextEnum.SupplyId, ModelTextEnum.Brand, ModelTextEnum.ModelNumber,
      ModelTextEnum.Description, ModelTextEnum.Text];
  }
}
