import {ModelTextEnum} from '../model-text.enum';

export class ModelText {
  constructor(public DltCountryCode: string = '', public SupplierId: string = '', public Brand: string = '',
              public ModelNumber: string = '', public Description: string = '', public Text: string = '') {}


  get dltCountryCode(): string {
    return this.DltCountryCode;
  }

  set dltCountryCode(value: string) {
    this.DltCountryCode = value;
  }

  get supplierId(): string {
    return this.SupplierId;
  }

  set supplierId(value: string) {
    this.SupplierId = value;
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
