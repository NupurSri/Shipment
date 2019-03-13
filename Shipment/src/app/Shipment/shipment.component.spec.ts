import {TestBed, async, ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ShipmentComponent } from './shipment.component';
import { AppService } from '../service/app.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/testing';
import { AppActions } from '../app.action';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Package } from '../Package/package';
const axeCore = require('axe-core');

describe('Shipment ->', () => {
  let component: ShipmentComponent;
  let fixture: ComponentFixture<ShipmentComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let sendShipmentBtn: HTMLButtonElement;
  let appService: AppService;
  let dataConversion: any;
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
        ShipmentComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(ShipmentComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    sendShipmentBtn = fixture.debugElement.query(By.css('.shipment-submit')).nativeElement;
    appService = fixture.debugElement.injector.get(AppService);
  }));
  it('should initialize shipment component', () => {
    expect(component).toBeTruthy();
  });
  /*it('expects service to fetch conversion data',
    inject([AppService],
      (service: AppService) => {
        service.convertCurrencyParams().subscribe(data => {
          console.log('Data***', data);
          expect(data.data[0].GBP).toBe(0.85);
          expect(data.data[0].USD).toBe(1.22);
          expect(component.conversionData).toBe(data);
        });
      })
  );*/
/*  it('should fetch conversion data',
  async(inject([AppService],
    (service: AppService) => {
      service.convertCurrencyParams().subscribe((data) => {
            expect(component.conversionData).toEqual(data);
          });
      })));*/
  it('validate disabled send shipment button when no package is present', () => {
    expect(component.shipmentObjArr.length).toBe(0);
    expect(sendShipmentBtn.disabled).toBe(true);
  });
  it('should be able to add 5 or less packages for shipment', () => {
    const pack1 = new Package('P1', 10, 'USD', 12.12);
    component.addPackage(pack1);
    const pack2 = new Package('P2', 1, 'USD', 12.12);
    component.addPackage(pack2);
    const pack3 = new Package('P3', 1, 'USD', 12.12);
    component.addPackage(pack3);
    const pack4 = new Package('P4', 4, 'USD', 12.12);
    component.addPackage(pack4);
    const pack5 = new Package('P5', 4, 'USD', 12.12);
    component.addPackage(pack5);
    expect(component.shipmentObjArr.length).toBeLessThanOrEqual(component.maxPackageCount);
    expect(component.maxPackageLimitReached).toBeFalsy();
  });
  it('should not allow to add more than 5 packages for shipment', () => {
    const pack1 = new Package('P1', 10, 'USD', 12.12);
    component.addPackage(pack1);
    const pack2 = new Package('P2', 1, 'USD', 12.12);
    component.addPackage(pack2);
    const pack3 = new Package('P3', 1, 'USD', 12.12);
    component.addPackage(pack3);
    const pack4 = new Package('P4', 4, 'USD', 12.12);
    component.addPackage(pack4);
    const pack5 = new Package('P5', 4, 'USD', 12.12);
    component.addPackage(pack5);
    const pack6 = new Package('P6', 4, 'USD', 12.12);
    component.addPackage(pack6);
    expect(component.shipmentObjArr.length).toBeLessThanOrEqual(component.maxPackageCount);
    expect(component.maxPackageLimitReached).toBeTruthy();
  });
  it('should calculate total package value in EUR', () => {
    component.conversionData = {
      "GBP": 0.85,
      "USD": 1.22
    };
    const pack1 = new Package('P1', 10, 'USD', 12.12);
    const pack2 = new Package('P2', 10, 'GBP', 12.12);
    component.shipmentObjArr.push(pack1);
    component.shipmentObjArr.push(pack2);
    fixture.detectChanges();
    const totalValue = component.totalShipmentValueinEUR();
    expect(totalValue).toBe('25.09');
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
