import { CreateStoreDTO, StoreUpdateDTO } from '@/interfaces/store.interface';

class StoreValidation {
  private _validateName(name: string) {
    return name.length === 0 ? false : true;
  }

  storeCreateValidation(data: CreateStoreDTO) {
    const errors = [];
    if (!this._validateName(data.name)) errors.push('Nome Inválido');

    return errors;
  }

  storeUpdateValidation(data: StoreUpdateDTO) {
    const errors = [];
    if (!data) {
      errors.push('Dados de entrada ausentes');
      return errors;
    }

    if (data.name && !this._validateName(data.name))
      errors.push('Nome Inválido');

    return errors;
  }
}
export default new StoreValidation();
