import { Rule } from '../models';

/**
 * Pattern validator
 */
export class PatternRule implements Rule {
  /**
   * Rule name
   */
  name = 'pattern';

  /**
   * Validate
   * @param obj - value for validation
   * @param parent - object which contains this property
   * @param pattern - regex pattern
   * @param flags - regex flags
   */
  validate(obj: string | null | undefined, parent: unknown, pattern: string, flags: string | undefined): boolean {
    if (obj === null || obj === undefined) {
      obj = '';
    } else {
      obj = obj.toString();
    }
    const regex = new RegExp(pattern, flags);
    return regex.test(obj);
  }
}
