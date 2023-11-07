import { RequiredRule } from './required';

describe('RequiredRule', () => {
  it('should be false for null', () => {
    expect(new RequiredRule().validate(null)).toBeFalsy();
  });

  it('should be false for empty string', () => {
    expect(new RequiredRule().validate('')).toBeFalsy();
  });

  it('should be false for undefined', () => {
    expect(new RequiredRule().validate(undefined)).toBeFalsy();
  });

  it('should be true for number', () => {
    expect(new RequiredRule().validate(1)).toBeTruthy();
  });

  it('should be true for string', () => {
    expect(new RequiredRule().validate('fff1')).toBeTruthy();
  });

  it('should be true for object', () => {
    expect(new RequiredRule().validate({})).toBeTruthy();
  });
});
