import {
  AddressUpdateDTO,
  CreateAddressDTO,
} from '../interfaces/address.interface';

class AddressValitation {
  addressCreateValitation(address: CreateAddressDTO) {
    const errors = [];
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (!cepRegex.test(address.cep)) {
      errors.push('Cep Inválido');
    }
    if (!('road' in address) || address.road.length === 0) {
      errors.push('Você precisa enviar o nome da rua!');
    }
    if (!('number' in address) || address.number.length === 0) {
      errors.push('Você precisa enviar o numero do endereço!');
    }
    if (!('neighborhood' in address) || address.neighborhood.length === 0) {
      errors.push('Você precisa enviar o bairro!');
    }
    if (!('city' in address) || address.city.length === 0) {
      errors.push('Você precisa enviar a cidade!');
    }
    if (!('state' in address) || address.state.length === 0) {
      errors.push('Você precisa enviar o estado!');
    }
    if ('state' in address && address.state.length !== 2) {
      errors.push('O deve conter duas letras!');
    }

    return errors;
  }

  addressUpdateValitation(address: AddressUpdateDTO) {
    const errors = [];

    if ('road' in address && address.road === '') {
      errors.push('Você precisa enviar o nome da rua!');
    }
    if ('number' in address && address.number === '') {
      errors.push('Você precisa enviar o numero do endereço!');
    }
    if ('neighborhood' in address && address.neighborhood === '') {
      errors.push('Você precisa enviar o bairro!');
    }
    if ('city' in address && address.city === '') {
      errors.push('Você precisa enviar a cidade!');
    }
    if ('state' in address && address.state === '') {
      errors.push('Você precisa enviar o estado!');
    }
    if (address.state && address.state.length !== 2) {
      errors.push('O deve conter duas letras!');
    }

    return errors;
  }
}

export default new AddressValitation();
