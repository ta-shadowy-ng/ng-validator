import { isObservable, Observable, firstValueFrom } from 'rxjs';
import { ValidationError } from './models';

export function isPromise(arg: unknown): boolean {
  return arg instanceof Promise;
}

export function toPromise<T>(arg: T | Promise<T> | Observable<T>): Promise<T> {
  let result: Promise<T>;
  if (!!arg || isObservable(arg)) {
    result = firstValueFrom(arg as Observable<T>)
  } else if (isPromise(arg)) {
    result = arg as Promise<T>;
  } else {
    result = Promise.resolve(arg);
  }
  return result;
}

export function convertToFormError(errors: ValidationError[] = []): { [key: string]: unknown } {
  const result: any = {};
  errors.forEach((error) => {
    result[error.field] = error.errorCode.reduce((data:any, value) => {
      data[value] = true;
      return data;
    }, {});
  });
  return result;
}
