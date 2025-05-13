import { UserUpdateDTO } from '@/interfaces/user.interface';
import validateEmail from './validateEmail';
import validatePassword from './validatePassword';
import validateBornDate from './validateBornDate';

export default function updateUserValidation(data: UserUpdateDTO) {
  const errors = [];
  if (!data) {
    errors.push('Dados de entrada ausentes');
    return errors;
  }
  if (data.email && !validateEmail(data.email)) errors.push('Email Inválido');

  if (data.password && !validatePassword(data.password))
    errors.push('Senha Inválida');

  if (data.bornDate) {
    const bornDateError = validateBornDate(data.bornDate);
    if (bornDateError) errors.push(bornDateError);
  }

  return errors;
}
