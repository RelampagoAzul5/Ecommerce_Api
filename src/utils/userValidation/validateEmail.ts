import isEmail from 'validator/lib/isEmail';

export default function validateEmail(email: string) {
  return isEmail(email);
}
