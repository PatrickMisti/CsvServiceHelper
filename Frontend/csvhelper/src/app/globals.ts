import {Injectable} from '@angular/core';
import {ModelText} from './entities/model-text';


@Injectable()
export class Globals {
  splitter = ';';
  modelText: ModelText = new ModelText('AT', '', '', '', '', '');

  setModelState() {
    this.modelText = new ModelText('AT', '', '', '', '', '');
  }
}
