const CPF_LENGTH = 11;

enum enDigitPosition {
  FIRST = 11,
  SECOND = 12
}

export const validate = (cpf: any) => {
  const cleanedCpf = cleanData(cpf);

  if (!hasMinimumLength(cleanedCpf)) {
    return false;
  }

  const paddedCpf = padLeftWithZeros(cleanedCpf);

  if (areAllEqualDigits(paddedCpf)) {
    return false;
  }

  const checksum = generateChecksum(paddedCpf);

  return paddedCpf.endsWith(checksum);
};

const areAllEqualDigits = (cpf: string) => cpf === cpf[0].repeat(CPF_LENGTH);

const cleanData = (cpf: any) => `${cpf}`.replace(/[.-]/gi, '');

const hasMinimumLength = (cpf: string) => cpf.length <= CPF_LENGTH;

const padLeftWithZeros = (cpf: string) => '0'.repeat(CPF_LENGTH - cpf.length) + cpf;

const generateChecksum = (cpf: string) => {
  const firstDigit = calculateFirstDigit(cpf);
  const firstChecksum = normalizeDigitValue(firstDigit);
  const secondDigit = calculateSecondDigit(cpf, firstChecksum);
  const secondChecksum = normalizeDigitValue(secondDigit);

  return `${firstChecksum}${secondChecksum}`;
};

const calculateFirstDigit = (cpf: string) => calculateDigit(cpf, enDigitPosition.FIRST);

const calculateSecondDigit = (cpf: string, firstDigit: number) =>
  calculateDigit(cpf, enDigitPosition.SECOND) + 2 * firstDigit;

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
