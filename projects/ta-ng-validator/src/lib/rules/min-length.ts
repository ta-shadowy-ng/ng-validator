import { Rule } from '../models';

/**
 * Min length validator
 */
export class MinLengthRule implements Rule {
  /**
   * Rule name
   */
  name = 'min-length';

  /**
   * Validate
   * @param obj - value for validation
   * @param parent - object which contains this property
   * @param limit - limit
   */
  validate(obj: string | null | undefined, parent: unknown, limit: string): boolean {
    if (obj === null || obj === undefined) {
      return true;
    }
    return obj.toString().length >= parseInt(limit, 10);
  }
}
