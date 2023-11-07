import { IntRule } from './int';

describe('int', () => {
  it('should be null true', () => {
    expect(new IntRule().validate(null)).toBeTruthy();
  });

  it('should be undefined true', () => {
    expect(new IntRule().validate(undefined)).toBeTruthy();
  });

  it("should be false for 'aaa'", () => {
    expect(new IntRule().validate('aaa')).toBeFalsy();
  });

  it("should be '' false", () => {
    expect(new IntRule().validate('')).toBeFalsy();
  });

  it('should be 1 true', () => {
    expect(new IntRule().validate(1)).toBeTruthy();
  });

  it('should be 1.1 false', () => {
    expect(new IntRule().validate(1.1)).toBeFalsy();
  });

  it("should be '1' true", () => {
    expect(new IntRule().validate('1')).toBeTruthy();
  });

  it("should be '1.1' false", () => {
    expect(new IntRule().validate('1.1')).toBeFalsy();
  });
});
