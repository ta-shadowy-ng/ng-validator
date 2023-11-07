import { Rule } from '../../models';

export class FloatRule implements Rule {
  name = 'float';

  validate(obj: unknown): boolean {
    if (obj === null || obj === undefined) {
      return true;
    }
    if (typeof obj === 'number') {
      return true;
    }
    if (obj === '') {
      return false;
    }
    const temp = +obj;
    return !Number.isNaN(temp);
  }
}
