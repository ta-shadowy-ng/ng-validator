export interface ObjectValidation {
  /**
   * Type properties
   */
  properties?: PropertyValidation[];

  /**
   * Type validation
   */
  validations?: string[] | CodeValidation;
}

export interface CodeValidation {
  /**
   * Code validation
   */
  code: string; 

  /**
   * validation
   */
  validation: string
}

/**
 * Validation rule for property
 */
export interface PropertyValidation {
  /**
   * Property name
   */
  name?: string;

  /**
   * Property type
   */
  type?: string;

  /**
   * SubItem
   */
  element?: {
    id?: string;
    value?: PropertyValidation;
    object?: string | ObjectValidation;
  };

  /**
   * Validation rule for property
   */
  validations?: string[];
}
