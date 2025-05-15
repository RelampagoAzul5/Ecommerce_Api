import { CreateUserDTO, UserUpdateDTO } from '@/interfaces/user.interface';
import isEmail from 'validator/lib/isEmail';

class UserValidation {
  private _validatePassword(password: string) {
    return password.length < 6 || password.length > 16 ? false : true;
  }

  private _validateEmail(email: string) {
    return isEmail(email);
  }

  private _calculateDigit(cpf: string) {
    let multiplyNumber = cpf.length === 9 ? 10 : 11;
    const cpfArray = [];

    for (let i = 0; i < cpf.length; i++) {
      const cpfNumber = Number(cpf[i]);
      cpfArray.push(cpfNumber * multiplyNumber);
      multiplyNumber--;
    }
    const total = cpfArray.reduce((acc, num) => acc + num, 0);
    const cpfDigit = total % 11;

    return cpfDigit < 2 ? 0 : 11 - cpfDigit;
  }

  private _validateCPF(cpf: string) {
    const cleanedCPF = cpf.replace(/[./-]/g, '');
    if (cleanedCPF.length !== 11 || isNaN(Number(cleanedCPF))) return false;

    if (/^(\d)\1{10}$/.test(cleanedCPF)) return false;

    const cpfWithoutDigits = cleanedCPF.slice(0, 9);
    const firstDigit = this._calculateDigit(cpfWithoutDigits);
    const secondDigit = this._calculateDigit(
      `${cpfWithoutDigits}${firstDigit}`,
    );

    return cleanedCPF === `${cpfWithoutDigits}${firstDigit}${secondDigit}`;
  }

  private _validateBornDate(bornDate: Date) {
    const bornDateYear = bornDate.getFullYear();
    const actualYear = new Date().getFullYear();
    const age = actualYear - bornDateYear;
    let error;
    if (age < 16) error = 'Muito novo para cadastro';
    if (age > 110) error = 'Idade inválida';
    return error;
  }

  userCreateValidation(data: CreateUserDTO) {
    const errors = [];
    if (!this._validateCPF(data.cpf)) errors.push('Cpf Inválido');

    if (!this._validateEmail(data.email)) errors.push('Email Inválido');

    if (!this._validatePassword(data.password)) errors.push('Senha Inválida');

    const bornDateError = this._validateBornDate(data.bornDate);

    if (bornDateError) errors.push(bornDateError);

    return errors;
  }

  userUpdateValidation(data: UserUpdateDTO) {
    const errors = [];
    if (!data) {
      errors.push('Dados de entrada ausentes');
      return errors;
    }
    if (data.email && !this._validateEmail(data.email))
      errors.push('Email Inválido');

    if (data.password && !this._validatePassword(data.password))
      errors.push('Senha Inválida');

    if (data.bornDate) {
      const bornDateError = this._validateBornDate(data.bornDate);
      if (bornDateError) errors.push(bornDateError);
    }

    return errors;
  }
}
export default new UserValidation();
