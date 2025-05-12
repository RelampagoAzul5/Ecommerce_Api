function calculateDigit(cpf: string) {
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

export default function validateCPF(cpf: string) {
  const cleanedCPF = cpf.replace(/[./-]/g, '');
  if (cleanedCPF.length !== 11 || isNaN(Number(cleanedCPF))) return false;

  if (/^(\d)\1{10}$/.test(cleanedCPF)) return false;

  const cpfWithoutDigits = cleanedCPF.slice(0, 9);
  const firstDigit = calculateDigit(cpfWithoutDigits);
  const secondDigit = calculateDigit(`${cpfWithoutDigits}${firstDigit}`);

  return cleanedCPF === `${cpfWithoutDigits}${firstDigit}${secondDigit}`
    ? true
    : false;
}
