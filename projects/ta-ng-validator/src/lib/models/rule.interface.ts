import { Observable } from 'rxjs';

/**
 * Validation rule
 */
export interface Rule {
  /**
   * Rule name
   */
  name: string;

  /**
   * Validation
   */
  validate(obj: unknown, parent: unknown, ...params: string[]): boolean | Promise<boolean> | Observable<boolean>;
}
