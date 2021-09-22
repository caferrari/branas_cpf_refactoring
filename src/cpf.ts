const CPF_LENGTH = 11;

enum enDigitPosition {
  FIRST = 11,
  SECOND = 12
}

export const validate = (cpf: any) => {
  cpf = padLeftWithZeros(cpf);
  if (cpf === cpf[0].repeat(CPF_LENGTH)) {
    return false;
  }
  const checksum = generateChecksum(cpf);

  return cpf.endsWith(checksum);
};

const padLeftWithZeros = (cpf: any) => {
  cpf = `00000000000${cpf}`.replace(/\D/gi, '');
  return cpf.substr(cpf.length - CPF_LENGTH, CPF_LENGTH);
};

const generateChecksum = (cpf: string) => {
  const firstDigit = calculateFirstDigit(cpf);
  const firstCheckSum = normalizeDigitValue(firstDigit);
  const secondDigit = calculateSecondDigit(cpf, firstCheckSum);
  const secondCheckSum = normalizeDigitValue(secondDigit);

  return `${firstCheckSum}${secondCheckSum}`;
};

const calculateFirstDigit = (cpf: string) => {
  return calculateDigit(cpf, enDigitPosition.FIRST);
};

const calculateSecondDigit = (cpf: string, firstDigit: number) => {
  return calculateDigit(cpf, enDigitPosition.SECOND) + 2 * firstDigit;
};

const calculateDigit = (cpf: string, digitPosition: enDigitPosition) => {
  return cpf
    .substring(0, 9)
    .split('')
    .map(digit => Number(digit))
    .reduce((acc, digit, index) => {
      const position = index + 1;
      return acc + (digitPosition - position) * digit;
    }, 0);
};

const normalizeDigitValue = (value: number) => {
  const normalizedValue = value % CPF_LENGTH;
  return normalizedValue < 2 ? 0 : CPF_LENGTH - normalizedValue;
};
