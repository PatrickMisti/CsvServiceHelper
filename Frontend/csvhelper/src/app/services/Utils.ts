import {ModelTextEnum} from '../model-text.enum';

export class Utils {
    static existValueInEnum(value: string) {
        const list = (Object.keys(ModelTextEnum).filter(k => typeof ModelTextEnum[k as any] === 'number'));
        return list.find(p => ModelTextEnum[p] === value);
    }
}
