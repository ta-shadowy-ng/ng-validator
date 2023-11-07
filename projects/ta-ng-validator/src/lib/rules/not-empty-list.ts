import { Rule } from '../models';

/**
 * Not empty list validator
 */
export class NotEmptyListRule implements Rule {
  /**
   * Rule name
   */
  name = 'not-empty-list';

  /**
   * Validate
   * @param obj - value for validation
   * @param parent - object which contains this property
   * @param skipNull - true - counts only not null elements
   */
  validate(obj: unknown[] | null | undefined, parent: unknown, skipNull: string): boolean {
    if (obj === null || obj === undefined) {
      return true;
    }
    let list = obj;
    if (skipNull === 'true') {
      list = list.filter((item) => item !== null && item !== undefined);
    }
    return list.length > 0;
  }
}
