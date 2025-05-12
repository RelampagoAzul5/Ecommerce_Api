import { CreateUserDTO } from '@/interfaces/user.interface';
import validateCPF from './validateCPF';
import validateEmail from './validateEmail';
import validatePassword from './validatePassword';
import validateBornDate from './validateBornDate';

export default function userValidation(data: CreateUserDTO) {
  const errors = [];
  if (!validateCPF(data.cpf)) errors.push('Cpf Inválido');

  if (!validateEmail(data.email)) errors.push('Email Inválido');

  if (!validatePassword(data.password)) errors.push('Senha Inválida');

  const bornDateError = validateBornDate(data.bornDate);

  if (bornDateError) errors.push(bornDateError);

  return errors;
}
