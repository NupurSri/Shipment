import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PackageComponent } from './package.component';
import { AppService } from '../service/app.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/testing';
import { AppActions } from '../app.action';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Package } from './package';
const axeCore = require('axe-core');

describe('Package ->', () => {
  let component: PackageComponent;
  let fixture: ComponentFixture<PackageComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let addPackageBtn: HTMLButtonElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        NgReduxTestingModule
      ],
      providers: [AppService, AppActions, { provide: FormBuilder, useValue: formBuilder }],
      declarations: [
        PackageComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(PackageComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    addPackageBtn = fixture.debugElement.query(By.css('.btn-submit')).nativeElement;
  }));
  it('should initialize package component', () => {
    expect(component).toBeTruthy();
  });
  describe('Package Name Validation ->', () => {
    it('validate if package name is valid ->', () => {
      const packName = component.pkgForm.controls['pkgName'];
      packName.setValue('Package #1');
      expect(packName.errors).toBeFalsy();
    });
    it('validate if package name is not empty ->', () => {
      let errors = {};
      const packName = component.pkgForm.controls['pkgName'];
      if (packName.errors) {
        errors = packName.errors;
      }
      expect(errors['required']).toBeTruthy();
      expect(addPackageBtn.disabled).toBe(true);
    });
    it('validate that package name does not accept characters apart from (A-z, 0-9, #)  ->', () => {
      let errors = {};
      const packName = component.pkgForm.controls['pkgName'];
      packName.setValue('Package@@@');
      if (packName.errors) {
        errors = packName.errors;
      }
      expect(errors['pattern']).toBeTruthy();
      expect(addPackageBtn.disabled).toBe(true);
    });
    it('validate that package name does not accept more than 32 characters  ->', () => {
      let errors = {};
      const packName = component.pkgForm.controls['pkgName'];
      packName.setValue('PackagePackagePackagePackagePackagePackagePackagePackage');
      if (packName.errors) {
        errors = packName.errors;
      }
      expect(errors['maxlength']).toBeTruthy();
      expect(addPackageBtn.disabled).toBe(true);
    });
  });
  describe('Package Weight Validation ->', () => {
    it('validate if package weight is correct', () => {
      const packWeight = component.pkgForm.controls['pkgWeight'];
      packWeight.setValue(4.678);
      expect(packWeight.errors).toBeFalsy();
    });
    it('validate if package weight is not empty', () => {
      let errors = {};
      const packWeight = component.pkgForm.controls['pkgWeight'];
      if (packWeight.errors) {
        errors = packWeight.errors;
      }
      expect(errors['required']).toBeTruthy();
      expect(addPackageBtn.disabled).toBe(true);
    });
    it('validate if package weight does not support more than 3 decimal places', () => {
      let errors = {};
      const packWeight = component.pkgForm.controls['pkgWeight'];
      packWeight.setValue(4.6789);
      if (packWeight.errors) {
        errors = packWeight.errors;
      }
      expect(errors['pattern']).toBeTruthy();
      expect(addPackageBtn.disabled).toBe(true);
    });
    it('validate if package weight is not zero or negative', () => {
      let errors = {};
      const packWeight = component.pkgForm.controls['pkgWeight'];
      packWeight.setValue(-1);
      if (packWeight.errors) {
        errors = packWeight.errors;
      }
      expect(errors['min']).toBeTruthy();
      expect(addPackageBtn.disabled).toBe(true);
    });
    it('validate if package weight is not more than 10 kgs', () => {
      let errors = {};
      const packWeight = component.pkgForm.controls['pkgWeight'];
      packWeight.setValue(10.10);
      if (packWeight.errors) {
        errors = packWeight.errors;
      }
      expect(errors['max']).toBeTruthy();
      expect(addPackageBtn.disabled).toBe(true);
    });
  });
  describe('Package Value Validation ->', () => {
    it('Package Value is valid', () => {
      const packValue = component.pkgForm.controls['pkgValue'];
      packValue.setValue(12.56);
      expect(packValue.errors).toBeFalsy();
    });
    it('validate if package value is not zero or negative', () => {
      let errors = {};
      const packValue = component.pkgForm.controls['pkgValue'];
      packValue.setValue(-1);
      if (packValue.errors) {
        errors = packValue.errors;
      }
      expect(errors['min']).toBeTruthy();
      expect(addPackageBtn.disabled).toBe(true);
    });
    it('validate if package value does not support more than 2 decimal places', () => {
      let errors = {};
      const packValue = component.pkgForm.controls['pkgValue'];
      packValue.setValue(12.123456);
      if (packValue.errors) {
        errors = packValue.errors;
      }
      expect(errors['pattern']).toBeTruthy();
      expect(addPackageBtn.disabled).toBe(true);
    });
  });
  it('Check add package button is disabled when form is invalid', () => {
    fixture.detectChanges();
    expect(component.pkgForm.valid).toBeFalsy();
    expect(addPackageBtn.disabled).toBe(true);
  });
  it('Check add package button is enabled when form is valid', () => {
    fixture.detectChanges();
    component.pkgForm.controls.pkgName.setValue('Package#1');
    component.pkgForm.controls.pkgWeight.setValue(9.99);
    component.pkgForm.controls.currency.setValue('EUR');
    component.pkgForm.controls.pkgValue.setValue(12.12);
    expect(component.pkgForm.valid).toBeTruthy();
    expect(addPackageBtn.disabled).toBe(component.pkgForm.valid);
  });
  it('validate if max shipment weight is not greater than 25 kgs', () => {
    fixture.detectChanges();
    let errors = {};
    const packObj1 = new Package('P1', 10, 'EUR', 12.12);
    component.pkgForm.controls.pkgName.setValue(packObj1.getPackageName());
    component.pkgForm.controls.pkgWeight.setValue(packObj1.getPackageWeight());
    component.pkgForm.controls.currency.setValue(packObj1.getCurrency());
    component.pkgForm.controls.pkgValue.setValue(packObj1.getPackageValue());
    component.onSubmit();
    const packObj2 = new Package('P1', 10, 'EUR', 12.12);
    component.pkgForm.controls.pkgName.setValue(packObj2.getPackageName());
    component.pkgForm.controls.pkgWeight.setValue(packObj2.getPackageWeight());
    component.pkgForm.controls.currency.setValue(packObj2.getCurrency());
    component.pkgForm.controls.pkgValue.setValue(packObj2.getPackageValue());
    component.onSubmit();
    const packObj3 = new Package('P1', 10, 'EUR', 12.12);
    component.pkgForm.controls.pkgName.setValue(packObj3.getPackageName());
    component.pkgForm.controls.pkgWeight.setValue(packObj3.getPackageWeight());
    component.pkgForm.controls.currency.setValue(packObj3.getCurrency());
    component.pkgForm.controls.pkgValue.setValue(packObj3.getPackageValue());
    component.onSubmit();
    const packWeight = component.pkgForm.controls['pkgWeight'];
    if (packWeight.errors) {
      errors = packWeight.errors;
    }
    expect(errors['weightLimit']).toBeTruthy();
  });
  it('validate if max shipment weight is less than or equal to 25 kgs', () => {
    fixture.detectChanges();
    let errors = {};
    const packObj1 = new Package('P1', 10, 'EUR', 12.12);
    component.pkgForm.controls.pkgName.setValue(packObj1.getPackageName());
    component.pkgForm.controls.pkgWeight.setValue(packObj1.getPackageWeight());
    component.pkgForm.controls.currency.setValue(packObj1.getCurrency());
    component.pkgForm.controls.pkgValue.setValue(packObj1.getPackageValue());
    component.onSubmit();
    const packObj2 = new Package('P1', 10, 'EUR', 12.12);
    component.pkgForm.controls.pkgName.setValue(packObj2.getPackageName());
    component.pkgForm.controls.pkgWeight.setValue(packObj2.getPackageWeight());
    component.pkgForm.controls.currency.setValue(packObj2.getCurrency());
    component.pkgForm.controls.pkgValue.setValue(packObj2.getPackageValue());
    component.onSubmit();
    const packObj3 = new Package('P1', 3, 'EUR', 12.12);
    component.pkgForm.controls.pkgName.setValue(packObj3.getPackageName());
    component.pkgForm.controls.pkgWeight.setValue(packObj3.getPackageWeight());
    component.pkgForm.controls.currency.setValue(packObj3.getCurrency());
    component.pkgForm.controls.pkgValue.setValue(packObj3.getPackageValue());
    component.onSubmit();
    const packWeight = component.pkgForm.controls['pkgWeight'];
    if (packWeight.errors) {
      errors = packWeight.errors;
    }
    expect(errors['weightLimit']).toBeFalsy();
  });
  it('Validate submitted package', () => {
    fixture.detectChanges();
    const packObj = new Package('Package#1', 9.99, 'EUR', 12.12);
    component.pkgForm.controls.pkgName.setValue(packObj.getPackageName());
    component.pkgForm.controls.pkgWeight.setValue(packObj.getPackageWeight());
    component.pkgForm.controls.currency.setValue(packObj.getCurrency());
    component.pkgForm.controls.pkgValue.setValue(packObj.getPackageValue());
    // Trigger the login function
    component.onSubmit();
    // Subscribe to the Observable and store the user in a local variable.
    component.onPackageAddition.subscribe((submittedPackageObj) => {
      // Now we can check to make sure the emitted value is correct
      expect(submittedPackageObj.getPackageName).toBe(packObj.getPackageName());
      expect(submittedPackageObj.getPackageWeight).toBe(packObj.getPackageWeight());
      expect(submittedPackageObj.getCurrency).toBe(packObj.getCurrency());
      expect(submittedPackageObj.getPackageValue).toBe(packObj.getPackageValue());
    });
  });
  // accessibility testing using axe
  xit('should have no a11y violations', (done: DoneFn) => {
    axeCore.run(fixture.debugElement.nativeElement, (err, results) => {

      if (results.violations.length > 0) {
        console.error(results.violations.length + ' Accessibility violation(s): ');
        console.log(JSON.stringify(results.violations));
      }
      expect(err).toBe(null);
      expect(results.violations.length).toBe(0);
      done();
    });
  });
});
