import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppService } from '../service/app.service';
import { AppActions } from '../app.action';
import { INITIAL_STATE, ShipmentAppState } from '../app-store';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
})
export class PackageComponent implements OnInit {
  pkgForm: FormGroup;
  currentShipmentWeight = 0;
  MAX_SHIPMENT_LIMIT = 25;
  @Output() onPackageAddition: EventEmitter<any> = new EventEmitter<any>();
  @Input() set  resetForm(data) {
    if (data) {
      this.pkgForm.reset();
    }
  }
  constructor(private formBuilder: FormBuilder, private currencyConversion: AppService,
              private redux: NgRedux<ShipmentAppState>,
              private actions: AppActions) {}

  ngOnInit() {
    // Initalizing form.
     this.pkgForm = this.formBuilder.group({
     pkgName: ['', [ Validators.required, Validators.maxLength(32), Validators.pattern('^[a-zA-Z0-9# ]*$')]],
     pkgWeight: ['', [Validators.required, Validators.min(0.001), Validators.max(10), Validators.pattern('^[0-9]+(.[0-9]{0,3})?$')]],
     currency: ['EUR', [Validators.required]],
     pkgValue: ['', [Validators.required, Validators.min(0.01), Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]]
     });
  }
  // Method to return form Obj.
  get form() {
    return this.pkgForm.controls;
  }
  // Method to validate if shipment weight more than 25kgs
  validateShipmentWeight = () => {
    if (this.form.pkgWeight.errors && !this.form.pkgWeight.errors.weightLimit) {
      return;
    }
    if (this.pkgForm && this.form.pkgWeight.value) {
      this.currentShipmentWeight += parseFloat(this.form.pkgWeight.value);
      if (this.currentShipmentWeight <= this.MAX_SHIPMENT_LIMIT) {
        const stateObj: ShipmentAppState = INITIAL_STATE;
        stateObj.shipmentWeight = this.currentShipmentWeight;
        this.redux.dispatch(this.actions.setMaxWeightLimit(stateObj));
        this.form.pkgWeight.setErrors(null);
      } else {
        this.currentShipmentWeight -= parseFloat(this.form.pkgWeight.value);
        this.form.pkgWeight.setErrors({ weightLimit: true });
      }
    }
  }
  // Method to submit package form.
  onSubmit = () => {
    if (!this.form.pkgName.errors && !this.form.currency.errors && !this.form.pkgValue.errors) {
      this.validateShipmentWeight();
    }

    if (this.pkgForm.invalid) {
     return;
    }
    this.onPackageAddition.emit(this.pkgForm.value);
    this.pkgForm.reset();
  }
}
