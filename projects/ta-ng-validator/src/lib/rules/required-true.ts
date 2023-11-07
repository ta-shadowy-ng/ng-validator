import { Rule } from '../models';

/**
 * Required true validator
 */
export class RequiredTrueRule implements Rule {
  /**
   * Rule name
   */
  name = 'required-true';

  /**
   * Validation
   * @param obj - value for validation
   */
  validate(obj: unknown): boolean {
    return typeof obj === 'boolean' && obj;
  }
}
