import { TestBed, inject } from '@angular/core/testing';
import { TypeValidation } from './models';
import { NgValidatorModule } from './ng-validator.module';

import { ValidatorService } from './validator.service';

const typeTest1 = {
  name: 'test1',
};

const typeTest2 = {
  name: 'test2',
  properties: [
    {
      name: 'int',
      type: 'int',
    },
    {
      name: 'int2',
      validations: ['required'],
    },
    {
      name: 'text',
      validations: ['max-length|3'],
    },
  ],
  validations: ['required'],
};

const typeTest3 = {
  name: 'test3',
  properties: [
    {
      name: 'int',
      type: 'int1',
      validations: ['test'],
    },
  ],
};

const typeTest4 = {
  name: 'test4',
  properties: [
    {
      name: 'int',
      type: 'int',
      validations: ['required'],
    },
  ],
};

const complexTypeTest1 = {
  name: 'complexTest1',
  properties: [
    { name: 'int', type: 'int1' },
    { name: 'obj', type: 'test2' },
    { name: 'obj2', type: 'int', validations: ['required'] },
  ],
};

const objectWithArray = {
  name: 'objectWithArray',
  properties: [
    { name: 'int', type: 'int' },
    { name: 'list', element: { value: { type: 'email' } } },
  ],
} as TypeValidation;

const objectWithArrayComplex = {
  name: 'objectWithArrayComplex',
  properties: [
    { name: 'int', type: 'int' },
    { name: 'list', element: { object: 'test4' } },
  ],
} as TypeValidation;

const objectWithArrayComplexFull = {
  name: 'objectWithArrayComplexFull',
  properties: [
    { name: 'int', type: 'int' },
    {
      name: 'list',
      element: {
        object: {
          properties: [
            {
              name: 'int',
              type: 'int',
              validations: ['required'],
            },
          ],
        },
      },
    },
  ],
} as TypeValidation;

const objectWithArrayComplexFullWithId = {
  name: 'objectWithArrayComplexFullWithId',
  properties: [
    { name: 'int', type: 'int' },
    {
      name: 'list',
      element: {
        id: 'id',
        object: {
          properties: [
            {
              name: 'int',
              type: 'int',
              validations: ['required'],
            },
          ],
        },
      },
    },
  ],
} as TypeValidation;

describe('ValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgValidatorModule],
    });
  });

  it('should be created', inject([ValidatorService], (service: ValidatorService) => {
    expect(service).toBeTruthy();
  }));

  it('should registration type', inject([ValidatorService], (service: ValidatorService) => {
    expect(service.typeRegistration(typeTest1)).toBeUndefined();
  }));

  it('should validate object', inject([ValidatorService], (service: ValidatorService) => {
    let result;
    try {
      result = service.validate({}, 'test1');
    } catch (e) {
      expect(e).toBeDefined();
    }
    expect(result).toBeUndefined();
    expect(service.typeRegistration(typeTest1)).toBeUndefined();
    try {
      result = service.validate({}, 'test1');
    } catch (e) {
      expect(e).toBeUndefined();
    }
    expect(result).toBeDefined();
  }));

  it('should validate object 2 true', inject([ValidatorService], (service: ValidatorService) => {
    expect(service.typeRegistration(typeTest2)).toBeUndefined();
    service.validate({ int: 1, int2: 1, text: '123' }, 'test2').then((result) => {
      expect(result.length).toBe(0);
    });
  }));

  it('should validate object 2 false', inject([ValidatorService], (service: ValidatorService) => {
    expect(service.typeRegistration(typeTest2)).toBeUndefined();
    service.validate({ int: 1, int2: 1, text: '1234' }, 'test2').then((result) => {
      expect(result.length).toBe(1);
    });
  }));

  it('should validate object 2 (null) false', inject([ValidatorService], (service: ValidatorService) => {
    expect(service.typeRegistration(typeTest2)).toBeUndefined();
    service.validate(null, 'test2').then((result) => {
      expect(result.length).toBe(2);
    });
  }));

  it('should validate object 2 false', inject([ValidatorService], (service: ValidatorService) => {
    expect(service.typeRegistration(typeTest2)).toBeUndefined();
    service.validate({ int: 'a1' }, 'test2').then((result) => {
      expect(result.length).toBeGreaterThan(0);
    });
  }));

  it('should validate object 3 false', inject([ValidatorService], (service: ValidatorService) => {
    try {
      expect(service.typeRegistration(typeTest3)).toBeUndefined();
      service.validate({ int: 'a1' }, 'test3').then(() => {});
    } catch (e: any) {
      expect(e.toString()).toBe("Error: The validation rule 'test' not defined");
    }
  }));

  it('should validate complex object 1 false', inject([ValidatorService], (service: ValidatorService) => {
    expect(service.typeRegistration(typeTest2)).toBeUndefined();
    expect(service.typeRegistration(complexTypeTest1)).toBeUndefined();
    service.validate(null, 'complexTest1').then((result) => {
      expect(result.length).toBeGreaterThan(0);
    });
    service.validate({ obj2: 2, obj: { int2: 10 } }, 'complexTest1').then((result) => {
      expect(result.length).toBe(0);
    });
  }));

  it('should validate object with Array simple type', inject([ValidatorService], (service: ValidatorService) => {
    expect(service.typeRegistration(objectWithArray)).toBeUndefined();
    service.validate(null, 'objectWithArray').then((result) => expect(result.length).toBe(0));
    service.validate({ int: 2 }, 'objectWithArray').then((result) => expect(result.length).toBe(0));
    service.validate({ int: 2, list: ['test@email.com', 'test', 'rrr@rrrr.com', 'dcsdcsd'] }, 'objectWithArray').then((result) => {
      expect(result.length).toBe(2);
    });
  }));

  it('should validate object with Array complex type', inject([ValidatorService], (service: ValidatorService) => {
    expect(service.typeRegistration(typeTest4)).toBeUndefined();
    expect(service.typeRegistration(objectWithArrayComplex)).toBeUndefined();
    service.validate(null, 'objectWithArrayComplex').then((result) => expect(result.length).toBe(0));
    service.validate({ int: 2 }, 'objectWithArrayComplex').then((result) => expect(result.length).toBe(0));
    service.validate({ int: 2, list: [{}, { int: '111ddd' }, { int: 10 }] }, 'objectWithArrayComplex').then((result) => {
      expect(result.length).toBe(2);
    });
  }));

  it('should validate object with Array complex type2', inject([ValidatorService], (service: ValidatorService) => {
    expect(service.typeRegistration(objectWithArrayComplexFull)).toBeUndefined();
    service.validate(null, 'objectWithArrayComplexFull').then((result) => expect(result.length).toBe(0));
    service.validate({ int: 2 }, 'objectWithArrayComplexFull').then((result) => expect(result.length).toBe(0));
    service.validate({ int: 2, list: [{}, { int: '111ddd' }, { int: 10 }] }, 'objectWithArrayComplexFull').then((result) => {
      expect(result.length).toBe(2);
    });
  }));

  it('should validate object with Array complex type2 with Id', inject([ValidatorService], (service: ValidatorService) => {
    expect(service.typeRegistration(objectWithArrayComplexFullWithId)).toBeUndefined();
    service.validate(null, 'objectWithArrayComplexFullWithId').then((result) => expect(result.length).toBe(0));
    service.validate({ int: 2 }, 'objectWithArrayComplexFullWithId').then((result) => expect(result.length).toBe(0));
    service
      .validate({ int: 2, list: [{ id: 1 }, { id: 2, int: '111ddd' }, { id: 3, int: 10 }] }, 'objectWithArrayComplexFullWithId')
      .then((result) => {
        expect(result.length).toBe(2);
        expect(result[0].field).toBe('list[id:1].int');
        expect(result[1].field).toBe('list[id:2].int');
      });
  }));
});
