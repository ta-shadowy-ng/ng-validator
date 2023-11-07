import { Rule } from '../models';

/**
 * Required validator
 */
export class RequiredRule implements Rule {
  /**
   * Rule name
   */
  name = 'required';

  /**
   * Validate
   * @param obj - value for validation
   */
  validate(obj: unknown): boolean {
    return obj !== null && obj !== undefined && obj !== '';
  }
}
