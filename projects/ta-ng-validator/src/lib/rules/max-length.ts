import { Rule } from '../models';

/**
 * Max length validator
 */
export class MaxLengthRule implements Rule {
  /**
   * Rule name
   */
  name = 'max-length';

  /**
   * Validate
   * @param obj - value for validation
   * @param parent - object which contains this property
   * @param limit - limit
   */
  validate(obj: string | null, parent: unknown, limit: string): boolean {
    if (obj === null || obj === undefined) {
      return true;
    }
    return obj.toString().length <= parseInt(limit, 10);
  }
}
