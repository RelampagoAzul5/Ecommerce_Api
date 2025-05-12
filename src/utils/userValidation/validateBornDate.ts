export default function validateBornDate(bornDate: Date) {
  const bornDateYear = bornDate.getFullYear();
  const actualYear = new Date().getFullYear();
  const age = actualYear - bornDateYear;
  let error;
  if (age < 16) error = 'Muito novo para cadastro';
  if (age > 110) error = 'Idade inválida';
  return error;
}
