/**
 * Validation Error
 */
export interface ValidationError {
  /**
   * Field
   */
  field: string;

  /**
   * Error connected to this field
   */
  errorCode: string[];
}
