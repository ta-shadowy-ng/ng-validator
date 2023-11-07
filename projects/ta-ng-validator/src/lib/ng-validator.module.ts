// eslint-disable-next-line max-classes-per-file
import { CommonModule } from '@angular/common';
import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { TypeValidation } from './models';
import {
  EmailRule,
  FloatRule,
  IntRule,
  MaxLengthRule,
  MaxRule,
  MinLengthRule,
  MinRule,
  PatternRule,
  RequiredRule,
  RequiredTrueRule,
  NotEmptyListRule,
} from './rules';
import { ValidatorService } from './validator.service';

export const NG_VALIDATION_TYPE = new InjectionToken('NG_VALIDATION_TYPE');
export const NG_VALIDATION_RULE = new InjectionToken('NG_VALIDATION_RULES');
export const NG_VALIDATION_TYPE_RULES = new InjectionToken('NG_VALIDATION_TYPE_RULES');

@NgModule({})
export class NgValidatorRegistrationModule {
  constructor(
    validator: ValidatorService,
    @Optional() @Inject(NG_VALIDATION_TYPE) types: TypeValidation[],
    @Optional() @Inject(NG_VALIDATION_RULE) rules: any[],
    @Optional() @Inject(NG_VALIDATION_TYPE_RULES) typeRules: { name: string; validations: string[] }[],
  ) {
    if (types) {
      types.forEach((rule) => validator.typeRegistration(rule));
    }
    if (rules) {
      // eslint-disable-next-line new-cap
      rules.forEach((rule) => validator.ruleRegistration(new rule()));
    }
    if (typeRules) {
      typeRules.forEach((type) => validator.typeRuleRegistration(type.name, type.validations));
    }
  }
}

@NgModule({})
export class ValidatorRegistrationModule {
  constructor(
    validator: ValidatorService,
    @Optional() @Inject(NG_VALIDATION_TYPE) types: TypeValidation[],
    @Optional() @Inject(NG_VALIDATION_RULE) rules: any[],
    @Optional() @Inject(NG_VALIDATION_TYPE_RULES) typeRules: { name: string; validations: string[] }[],
  ) {
    if (types) {
      types.forEach((rule) => validator.typeRegistration(rule));
    }
    if (rules) {
      // eslint-disable-next-line new-cap
      rules.forEach((rule) => validator.ruleRegistration(new rule()));
    }
    if (typeRules) {
      typeRules.forEach((type) => validator.typeRuleRegistration(type.name, type.validations));
    }
  }
}

@NgModule({
  imports: [CommonModule],
})
export class NgValidatorModule {
  constructor(readonly validator: ValidatorService) {
    validator.ruleRegistration(new RequiredRule());
    validator.ruleRegistration(new RequiredTrueRule());
    validator.ruleRegistration(new MaxLengthRule());
    validator.ruleRegistration(new MinLengthRule());
    validator.ruleRegistration(new MaxRule());
    validator.ruleRegistration(new MinRule());
    validator.ruleRegistration(new PatternRule());
    validator.ruleRegistration(new EmailRule());
    validator.ruleRegistration(new IntRule());
    validator.ruleRegistration(new FloatRule());
    validator.ruleRegistration(new NotEmptyListRule());
    validator.typeRuleRegistration('email', ['email']);
    validator.typeRuleRegistration('int', ['int']);
    validator.typeRuleRegistration('float', ['float']);
  }

  static registration(
    types: TypeValidation[] = [],
    rules: unknown[] = [],
    typeRules: { name: string; validations: string[] }[] = [],
  ): ModuleWithProviders<ValidatorRegistrationModule> {
    return {
      ngModule: ValidatorRegistrationModule,
      providers: [
        {
          provide: NG_VALIDATION_TYPE,
          useValue: types,
        },
        {
          provide: NG_VALIDATION_RULE,
          useValue: rules,
        },
        {
          provide: NG_VALIDATION_TYPE_RULES,
          useValue: typeRules,
        },
      ],
    };
  }
}
