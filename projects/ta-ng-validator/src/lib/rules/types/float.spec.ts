import { FloatRule } from './float';

describe('float', () => {
  it('should be null true', () => {
    expect(new FloatRule().validate(null)).toBeTruthy();
  });

  it('should be undefined true', () => {
    expect(new FloatRule().validate(undefined)).toBeTruthy();
  });

  it("should be '' false", () => {
    expect(new FloatRule().validate('')).toBeFalsy();
  });

  it('should be 1 true', () => {
    expect(new FloatRule().validate(1)).toBeTruthy();
  });

  it('should be 1.1 true', () => {
    expect(new FloatRule().validate(1.1)).toBeTruthy();
  });

  it("should be '1' true", () => {
    expect(new FloatRule().validate('1')).toBeTruthy();
  });

  it("should be '1.1' true", () => {
    expect(new FloatRule().validate('1.1')).toBeTruthy();
  });

  it("should be '1.1.1' false", () => {
    expect(new FloatRule().validate('1.1.1')).toBeFalsy();
  });
});
