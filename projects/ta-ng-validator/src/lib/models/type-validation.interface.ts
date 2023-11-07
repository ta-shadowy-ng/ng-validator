import { ObjectValidation } from './object-validation.interface';

/**
 * Interface for type validation rule
 */
export interface TypeValidation extends ObjectValidation {
  /**
   * Type name
   */
  name: string;
}
