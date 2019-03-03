import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../service/app.service';
import { Observable } from 'rxjs';
import { AppActions } from '../app.action';
import {INITIAL_STATE, MEASURE_WEIGHT_INITIAL_STATE, MeasureWeightStoreObj, ShipmentAppState} from '../app-store';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
})
export class PackageComponent {
  pkgForm: FormGroup;
  submitted = false;
  totalShipmentWeight = 0;
  totalAcceptableWeight = 0;
  MAX_SHIPMENT_LIMIT = 25;
  @Output() onPackageAddition: EventEmitter<any> = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder, private currencyConversion: AppService,
              private redux: NgRedux<ShipmentAppState>,
              private actions: AppActions) {
    this.pkgForm = this.formBuilder.group({
        pkgName: ['', [ Validators.required, Validators.maxLength(32), Validators.pattern('^[a-zA-Z0-9# ]*$')]],
        pkgWeight: ['', [Validators.required, Validators.min(0.001), Validators.max(10), Validators.pattern('^[0-9]+(.[0-9]{0,3})?$')]],
        currency: ['', [Validators.required]],
        value: ['', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]]
      });
  }
  get f() {
    return this.pkgForm.controls;
  }
  validateWeightLimit = (controlName: string) => {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if (control.errors && !control.errors.weightLimit) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
    };
  }
  onSubmit = () => {
    this.submitted = true;
    if (this.f.pkgWeight.errors && !this.f.pkgWeight.errors.weightLimit) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    if (!this.f.pkgName.errors && !this.f.currency.errors && !this.f.value.errors) {
      this.totalShipmentWeight += this.f.pkgWeight.value;
      if (this.totalShipmentWeight <= this.MAX_SHIPMENT_LIMIT) {
        this.totalAcceptableWeight += this.f.pkgWeight.value;
      }
      const OBJ: MeasureWeightStoreObj = MEASURE_WEIGHT_INITIAL_STATE;
      OBJ.totalWeight = this.totalShipmentWeight;
      OBJ.acceptableWeight = this.totalAcceptableWeight;
      OBJ.lastWeightAdded = this.f.pkgWeight.value;
      this.redux.dispatch(this.actions.setMaxWeightLimit(OBJ));
      if (this.totalShipmentWeight > this.MAX_SHIPMENT_LIMIT) {
        if (this.totalAcceptableWeight + this.f.pkgWeight.value <= this.MAX_SHIPMENT_LIMIT) {
          this.totalAcceptableWeight += this.f.pkgWeight.value;
          OBJ.acceptableWeight = this.totalAcceptableWeight;
          this.redux.dispatch(this.actions.setMaxWeightLimit(OBJ));
          this.f.pkgWeight.setErrors(null);
        } else {
          this.f.pkgWeight.setErrors({ weightLimit: true });
        }
      }
    }

    if (this.pkgForm.invalid) {
     return;
    }
    this.onPackageAddition.emit(this.pkgForm.value);
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.pkgForm.value));
  }
}
