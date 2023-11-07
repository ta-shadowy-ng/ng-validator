import { Injectable } from '@angular/core';
import { TypeValidation, Rule, ValidationError, PropertyValidation, ObjectValidation, CodeValidation } from './models';
import { toPromise } from './utils';

/**
 * Validation service
 */
@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  /**
   * List defined types
   */
  private readonly listTypes: any;

  /**
   * List for rules for validate type
   */
  private readonly listRuleForType: any;

  /**
   * List defined rules
   */
  private readonly listRule: any;

  /**
   * Validate object
   */
  validate(obj: unknown, type: string): Promise<ValidationError[]> {
    const rule = this.listTypes[type] as TypeValidation;
    if (!rule) {
      throw new Error(`For ${type} not defined validation rule`);
    }
    return this.validateWithRule(obj, rule);
  }

  /**
   * Validate object using defined rule
   */
  validateWithRule(obj: unknown, rule: TypeValidation): Promise<ValidationError[]> {
    return this.executeValidation(rule, obj, null, undefined);
  }

  /**
   * Rule registration
   */
  ruleRegistration(rule: Rule) {
    this.listRule[rule.name] = rule;
  }

  /**
   * Type rule validation registration
   */
  typeRuleRegistration(type: string, validation: string[]) {
    this.listRuleForType[type] = validation;
  }

  /**
   * Type registration
   */
  typeRegistration(type: TypeValidation) {
    this.listTypes[type.name] = normalizeObjectValidation(type);
  }

  private executeValidation(rule: ObjectValidation, obj: unknown, parent: unknown, objName: string = '') {
    return Promise.all([
      this.validateObjectProperties(rule, obj, objName),
      this.validateObject(rule, obj, parent, objName),
    ]).then((list: ValidationError[][]) => list.reduce((prev, curr) => [...prev, ...curr], []));
  }

  /**
   * Validate value
   */
  private validateValue(rule: string, obj: unknown, parent: unknown): Promise<boolean> {
    const ruleKeys = rule.split('|');
    const firstRule = ruleKeys.length > 1 ? ruleKeys.shift() : undefined;
    if (!firstRule) {
      throw new Error(`The validation rule '${rule}' not defined`);
    }
    const r = this.listRule[firstRule] as Rule;
    if (!r) {
      throw new Error(`The validation rule '${rule}' not defined`);
    }
    return toPromise(r.validate(obj, parent, ...ruleKeys));
  }

  /**
   * Get Validation for type
   */
  private getValidationForType(type?: string): string[] {
    if (!type) {
      return [];
    }
    const value = this.listRuleForType[type] as string[];
    if (!value) {
      return [];
    }
    return value;
  }

  /**
   * Validate property value
   */
  private validateProperty(property: PropertyValidation, obj: unknown, parent: unknown, objName: string): Promise<ValidationError[]> {
    let list = [...this.getValidationForType(property.type)];
    if (!!property.validations) {
      list = list.concat(property.validations)
    }

    return Promise.all(list.map((item) => this.validateValue(item, obj, parent))).then((result: boolean[]) => {
      let res: ValidationError = { field: '', errorCode: []  };
      result.forEach((state: boolean, index: number) => {
        if (state) {
          return;
        }
        res = res || { field: property.name, errorCode: [] };
        res.errorCode.push(list[index]);
      });
      if (!property.type) {
        return [res]
      }
      const typeRule = this.listTypes[property.type];
      if (typeRule) {
        return this.executeValidation(typeRule, obj, parent, objName).then((errors) => [res, ...errors]);
      }
      return [res];
    });
  }

  /**
   * Validate object properties
   */
  private validateObject(validationRule: ObjectValidation, obj: unknown, parent: unknown, objName: string): Promise<ValidationError[]> {
    const validations = validationRule.validations as string[];
    return Promise.all(validations.map((rule) => toPromise(this.validateValue(rule, obj, parent))))
      .then((validationResult: boolean[]) =>
        validationResult.map((item, index) => {
          if (item) {
            return null;  
          }
          if (Array.isArray(validationRule.validations)) {
            return validationRule.validations[index]
          }

          return null;
        }).filter(notEmpty))
      .then((list) => {
        const res: ValidationError[] = [];
        if (list.length > 0) {
          res.push({
            field: objName,
            errorCode: list,
          });
        }
        return res;
      });
  }

  /**
   * Validate object properties
   */
  private validateObjectProperties(valRule: ObjectValidation, obj: unknown, objName = ''): Promise<ValidationError[]> {
    function reducer(result: ValidationError[][]) {
      const res: ValidationError[] = [];
      result
        .reduce((prev, curr) => [...prev, ...curr], [])
        .forEach((item: ValidationError) => {
          if (!item) {
            return;
          }
          item.field = objName + (objName ? '.' : '') + item.field;
          res.push(item);
        });
      return res;
    }

    const properties = valRule.properties as PropertyValidation[];
    return Promise.all(
      properties.map((property) => {
        if (!property.name) {
          return []
        }
        if (!obj) {
          return []
        }
        const propertyValue = obj[property.name as keyof typeof obj] || {}[property.name];
        if (!property.element) {
          return this.validateObjectPropertiesSimple(property, propertyValue, obj, objName);
        }
        if (property.element.value) {
          if (!property.element.id) {
            return [];
          }
          return this.validateObjectPropertiesListItem(
            property,
            propertyValue,
            obj,
            objName,
            property.element.id,
          ).then((data: ValidationError[][]) => reducer(data));
        }
        if (property.element.object) {
          if (!property.element.id) {
            return [];
          }
          return this.validateObjectPropertiesListObject(
            property,
            propertyValue,
            obj,
            objName,
            property.element.id,
          ).then((data: ValidationError[][]) => reducer(data));
        }
        return [];
      }),
    ).then(reducer);
  }

  private validateObjectPropertiesSimple(
    property: PropertyValidation,
    propertyValue: any,
    obj: unknown,
    objName: string,
  ): Promise<ValidationError[]> {
    return this.validateProperty(property, propertyValue, obj, objName + (objName ? '.' : '') + property.name);
  }

  private validateObjectPropertiesListItem(
    property: PropertyValidation,
    propertyValue: any,
    obj: unknown,
    objName: string,
    id: string,
  ): Promise<ValidationError[][]> {
    return Promise.all(
      (propertyValue || []).map((item: any, index: any) =>
        this.validateProperty(
          {
            name: `${objName + (objName ? '.' : '') + property.name}[${!id ? index : `${id}:${item[id]}`}]`,
            ...property.element!.value,
          },
          item,
          obj,
          `${objName + (objName ? '.' : '') + property.name}[${!id ? index : `${id}:${item[id]}`}]`,
        ),
      ),
    );
  }

  private validateObjectPropertiesListObject(
    property: PropertyValidation,
    propertyValue: any,
    obj: unknown,
    objName: string,
    id: string,
  ): Promise<ValidationError[][]> {
    return Promise.all(
      (propertyValue || []).map((item: any, index: any) => {
        const validation = property.element!.object;
        if (typeof validation === 'string') {
          return this.validate(item, validation).then((data) =>
            data
              .filter((element) => !!element)
              .map((error) => {
                error.field = `${objName + (objName ? '.' : '') + property.name}[${!id ? index : `${id}:${item[id]}`}].${error.field}`;
                return error;
              }),
          );
        }
        return this.executeValidation(
          validation!,
          item,
          obj,
          `${objName + (objName ? '.' : '') + property.name}[${!id ? index : `${id}:${item[id]}`}]`,
        );
      }),
    );
  }
}

function normalizeObjectValidation(type: ObjectValidation): ObjectValidation {
  function fixSubElement(property: PropertyValidation) {
    if (!!property.element && !!property.element.value) {
      property.element.value.validations = property.element.value.validations || [];
    }
    if (!!property.element && !!property.element.object) {
      if (typeof property.element.object !== 'string') {
        property.element.object = normalizeObjectValidation(property.element.object);
      }
    }
  }

  type.validations = type.validations || [];
  type.properties = type.properties || [];
  type.properties.forEach((property) => fixSubElement(property));
  type.properties.forEach((property) => {
    property.validations = property.validations || [];
  });
  return type;
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}