import { MaxLengthRule } from './max-length';

describe('MaxLengthRule', () => {
  it('should be true for null', () => {
    expect(new MaxLengthRule().validate(null, null, '10')).toBeTruthy();
  });

  it("should be true for ''", () => {
    expect(new MaxLengthRule().validate('', null, '10')).toBeTruthy();
  });

  it("should be true for '1234567890'", () => {
    expect(new MaxLengthRule().validate('1234567890', null, '10')).toBeTruthy();
  });

  it("should be true for '12345'", () => {
    expect(new MaxLengthRule().validate('12345', null, '10')).toBeTruthy();
  });

  it("should be false for '12345678901'", () => {
    expect(new MaxLengthRule().validate('12345678901', null, '10')).toBeFalsy();
  });
});
