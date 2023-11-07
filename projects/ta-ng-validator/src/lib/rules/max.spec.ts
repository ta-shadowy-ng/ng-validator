import { MaxRule } from './max';

describe('MaxRule', () => {
  it('should be true for null', () => {
    expect(new MaxRule().validate(null, null, '10')).toBeTruthy();
  });

  it('should be true for undefined', () => {
    expect(new MaxRule().validate(undefined, null, '10')).toBeTruthy();
  });

  it('should be true for 10', () => {
    expect(new MaxRule().validate('10', null, '10')).toBeTruthy();
  });

  it('should be false for 11', () => {
    expect(new MaxRule().validate('11', null, '10')).toBeFalsy();
  });

  it('should be true for 9.9', () => {
    expect(new MaxRule().validate('9.9', null, '10')).toBeTruthy();
  });
});
