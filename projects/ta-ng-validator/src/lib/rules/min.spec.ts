import { MinRule } from './min';

describe('MinRule', () => {
  it('should be true for null', () => {
    expect(new MinRule().validate(null, null, '10')).toBeTruthy();
  });

  it('should be true for undefined', () => {
    expect(new MinRule().validate(undefined, null, '10')).toBeTruthy();
  });

  it('should be true for 10', () => {
    expect(new MinRule().validate('10', null, '10')).toBeTruthy();
  });

  it('should be true for 11', () => {
    expect(new MinRule().validate('11', null, '10')).toBeTruthy();
  });

  it('should be false for 9.9', () => {
    expect(new MinRule().validate('9.9', null, '10')).toBeFalsy();
  });
});
