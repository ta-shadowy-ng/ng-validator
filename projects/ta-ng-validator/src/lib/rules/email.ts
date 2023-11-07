import { PatternRule } from './pattern';

/**
 * Regex for email validation
 */
const emailRegexp =
  "^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+" +
  ')*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$';

/**
 * Email validator
 */
export class EmailRule extends PatternRule {
  /**
   * Rule name
   */
  override name = 'email';

  /**
   * Validate
   * @param obj - value for validation
   */
  override validate(obj: string | null | undefined): boolean {
    return super.validate(obj, null, emailRegexp, undefined);
  }
}
