import { RequiredTrueRule } from './required-true';

describe('RequiredTrueRule', () => {
  it('should be false for null', () => {
    expect(new RequiredTrueRule().validate(null)).toBeFalsy();
  });

  it('should be false for empty string', () => {
    expect(new RequiredTrueRule().validate('')).toBeFalsy();
  });

  it('should be false for undefined', () => {
    expect(new RequiredTrueRule().validate(undefined)).toBeFalsy();
  });

  it('should be false for number', () => {
    expect(new RequiredTrueRule().validate(1)).toBeFalsy();
  });

  it('should be false for string', () => {
    expect(new RequiredTrueRule().validate('fff1')).toBeFalsy();
  });

  it('should be false for false', () => {
    expect(new RequiredTrueRule().validate(false)).toBeFalsy();
  });

  it('should be true for true', () => {
    expect(new RequiredTrueRule().validate(true)).toBeTruthy();
  });
});
