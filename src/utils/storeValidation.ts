import { CreateStoreDTO, StoreUpdateDTO } from '@/interfaces/store.interface';

class StoreValidation {
  private _validateName(name: string) {
    return !name ? false : true;
  }

  private _validateCredentialType(credentialType: string) {
    return credentialType !== 'CNPJ' && credentialType !== 'CPF' ? false : true;
  }

  private _calculateDigit(cnpj: number[]) {
    const digitCalculatorsDefault = [
      [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
      [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
    ];
    const digitCaculators = digitCalculatorsDefault[cnpj.length - 12];
    let soma = 0;
    for (let i = 0; i < cnpj.length; i++) {
      soma += digitCaculators[i] * cnpj[i];
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  }

  private _validateCNPJ(cnpj: string) {
    const cleaned = cnpj.replace(/[^\d]+/g, '');

    if (cleaned.length !== 14 || /^(\d)\1+$/.test(cleaned)) return false;
    const cnpjArray: number[] = cleaned.split('').map((d) => parseInt(d, 10));

    const corpo = cnpjArray.slice(0, 12);
    const dig1 = this._calculateDigit(corpo);
    const dig2 = this._calculateDigit([...corpo, dig1]);
    return cleaned === `${corpo.join('')}${dig1}${dig2}`;
  }

  storeCreateValidation(data: CreateStoreDTO) {
    const errors = [];
    if (!this._validateName(data.name)) errors.push('Nome Inválido');
    if (!this._validateCredentialType(data.credentialType))
      errors.push('Tipo de credencial inválida');
    if (data.credentialType === 'CNPJ') {
      if (!this._validateCNPJ(data.credential)) {
        errors.push('Cnpj Inválido!');
      }
    }
    if (data.credentialType === 'CPF' && data.credential) {
      errors.push(
        'O CPF do registro de loja não pode ser diferente do CPF do usuário!',
      );
    }
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
