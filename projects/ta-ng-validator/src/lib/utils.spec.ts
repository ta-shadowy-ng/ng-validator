import { Observable } from 'rxjs';
import { isPromise, toPromise } from './utils';

describe('Utils', () => {
  it('should be convert value to Promise', () => {
    const result = toPromise(true);
    expect(isPromise(result)).toBe(true);
  });

  it('should be convert Observable to Promise', () => {
    const result = toPromise(new Observable(() => {}));
    expect(isPromise(result)).toBe(true);
  });

  it('should be convert Promise to Promise', () => {
    const result = toPromise(new Promise(() => {}));
    expect(isPromise(result)).toBe(true);
  });
});
