export default function validatePassword(password: string) {
  return password.length < 6 || password.length > 16 ? false : true;
}
