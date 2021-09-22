import { validate } from './cpf';

test('should fail an cpf with all equal digits', () => {
  const isValid = validate('111.111.111-11');
  expect(isValid).toBe(false);
});

test('should fail an invalid cpf', () => {
  const isValid = validate('123.456.789-99');
  expect(isValid).toBe(false);
});

test('should success with an valid cpf', () => {
  const isValid = validate('935.411.347-80');
  expect(isValid).toBe(true);
});

test('should validate numeric cpf', () => {
  const isValid = validate(11122285);
  expect(isValid).toBe(true);
});

test('should not validate an invalid cpf', () => {
  const isValid = validate('sadasdasdasdsa');
  expect(isValid).toBe(false);
});

test('should not validate an empty cpf', () => {
  const isValid = validate('');
  expect(isValid).toBe(false);
});
