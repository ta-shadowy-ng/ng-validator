import { PatternRule } from './pattern';

describe('MaxRule', () => {
  it('should be false for null', () => {
    expect(new PatternRule().validate(null, null, '\\w+', undefined)).toBeFalsy();
  });

  it('should be false for undefined', () => {
    expect(new PatternRule().validate(undefined, null, '\\w+', undefined)).toBeFalsy();
  });

  it('should be true for aaa', () => {
    expect(new PatternRule().validate('aaa', null, '\\w+', undefined)).toBeTruthy();
  });

  it('should be false for ---', () => {
    expect(new PatternRule().validate('---', null, '\\w+', undefined)).toBeFalsy();
  });
});
