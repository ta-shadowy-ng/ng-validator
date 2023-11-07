import { EmailRule } from './email';

describe('MaxRule', () => {
  it('should be false for null', () => {
    expect(new EmailRule().validate(null)).toBeFalsy();
  });

  it('should be false for undefined', () => {
    expect(new EmailRule().validate(undefined)).toBeFalsy();
  });

  it('should be true for aaa@aaa.com', () => {
    expect(new EmailRule().validate('aaa@aaa.com')).toBeTruthy();
  });

  it('should be false for 11', () => {
    expect(new EmailRule().validate('11')).toBeTruthy();
  });
});
