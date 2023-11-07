import { Rule } from '../models';

/**
 * Max validator
 */
export class MaxRule implements Rule {
  /**
   * Rule name
   */
  name = 'max';

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
    const l = parseFloat(limit);
    const v = parseFloat(obj);
    return v <= l;
  }
}
