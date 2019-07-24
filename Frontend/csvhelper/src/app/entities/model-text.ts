import {ModelTextEnum} from '../model-text.enum';

export class ModelText {
  constructor(public DLTCountryCode: string, public SupplierId: string, public Brand: string,
              public ModelNumber: string, public Description: string, public Text: string) {}


  static getOrder() {
    return [ModelTextEnum.DLTCountryCode, ModelTextEnum.SupplyId, ModelTextEnum.Brand, ModelTextEnum.ModelNumber,
      ModelTextEnum.Description, ModelTextEnum.Text];
  }
}
