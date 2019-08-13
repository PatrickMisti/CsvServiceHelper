import {ModelTextEnum} from '../model-text.enum';

export class ModelText {
  constructor(public DLTCountryCode: string = '', public SupplierID: string = '', public Brand: string = '',
              public ModelNumber: string = '', public Description: string = '', public Text: string = '') {}


  get dltCountryCode(): string {
    return this.DLTCountryCode;
  }

  set dltCountryCode(value: string) {
    this.DLTCountryCode = value;
  }

  get supplierId(): string {
    return this.SupplierID;
  }

  set supplierId(value: string) {
    this.SupplierID = value;
  }

  get brand(): string {
    return this.Brand;
  }

  set brand(value: string) {
    this.Brand = value;
  }

  get modelNumber(): string {
    return this.ModelNumber;
  }

  set modelNumber(value: string) {
    this.ModelNumber = value;
  }

  get description(): string {
    return this.Description;
  }

  set description(value: string) {
    this.Description = value;
  }

  get text(): string {
    return this.Text;
  }

  set text(value: string) {
    this.Text = value;
  }

  static getOrder() {
    return [ModelTextEnum.DLTCountryCode, ModelTextEnum.SupplyId, ModelTextEnum.Brand, ModelTextEnum.ModelNumber,
      ModelTextEnum.Description, ModelTextEnum.Text];
  }
}
