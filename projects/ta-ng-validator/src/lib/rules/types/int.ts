import { Rule } from '../../models';

export class IntRule implements Rule {
  name = 'int';

  validate(obj: unknown): boolean {
    if (obj === null || obj === undefined) {
      return true;
    }
    if (typeof obj === 'number') {
      return obj.toString().indexOf('.') < 0;
    }
    if (obj === '') {
      return false;
    }
    const temp = +obj;
    if (Number.isNaN(temp)) {
      return false;
    }
    return temp.toString().indexOf('.') < 0;
  }
}
