function calculateDigit(cnpj) {
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
console.log(calculateDigit('12345678901230'));
