import { MinLengthRule } from './min-length';

describe('MinLengthRule', () => {
  it('should be true for null', () => {
    expect(new MinLengthRule().validate(null, null, '10')).toBeTruthy();
  });

  it("should be false for ''", () => {
    expect(new MinLengthRule().validate('', null, '10')).toBeFalsy();
  });

  it("should be true for '1234567890'", () => {
    expect(new MinLengthRule().validate('1234567890', null, '10')).toBeTruthy();
  });

  it("should be false for '12345'", () => {
    expect(new MinLengthRule().validate('12345', null, '10')).toBeFalsy();
  });

  it("should be true for '12345678901'", () => {
    expect(new MinLengthRule().validate('12345678901', null, '10')).toBeTruthy();
  });
});
