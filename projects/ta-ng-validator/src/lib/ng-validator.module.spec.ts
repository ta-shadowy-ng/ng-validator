import { async, TestBed } from '@angular/core/testing';
import { NgValidatorModule } from './ng-validator.module';

describe('NgValidatorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgValidatorModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgValidatorModule).toBeDefined();
  });
});
