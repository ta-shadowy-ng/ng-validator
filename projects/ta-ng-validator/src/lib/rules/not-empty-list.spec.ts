import { NotEmptyListRule } from './not-empty-list';

describe('MinRule', () => {
  it('should be true for null', () => {
    expect(new NotEmptyListRule().validate(null, null, 'true')).toBeTruthy();
  });

  it('should be true for undefined', () => {
    expect(new NotEmptyListRule().validate(undefined, null, 'true')).toBeTruthy();
  });

  it('should be true for [10]', () => {
    expect(new NotEmptyListRule().validate(['10'], null, 'true')).toBeTruthy();
  });

  it('should be false for []', () => {
    expect(new NotEmptyListRule().validate([], null, 'true')).toBeFalsy();
  });

  it('should be false for [null]', () => {
    expect(new NotEmptyListRule().validate([null], null, 'true')).toBeFalsy();
  });

  it('should be false for [null]', () => {
    expect(new NotEmptyListRule().validate([null], null, '')).toBeTruthy();
  });
});
