import { Component } from '@angular/core';
import { AppService } from '../service/app.service';
import { NgRedux } from '@angular-redux/store';
import { MeasureWeightStoreObj } from '../app-store';
import { ShipmentAppState } from '../app-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss'],
})
export class ShipmentComponent {
  public maxPackageCount = 5;
  shipmentObjArr = [];
  totalAcceptableShipmentWeight = 0;
  totalShipmentWeight = 0;
  conversionData: any;
  shipmentWeightWithInLimits = true;
  constructor(private currencyConversion: AppService, private redux: NgRedux<ShipmentAppState>,
              private router: Router) {
    this.currencyConversion.convertCurrencyParams().subscribe((res) => {
      console.log('RES****', res);
      this.conversionData = res[0];
    });
  }
  addPackage = (event) => {
   if (this.shipmentObjArr.length !== this.maxPackageCount) {
      this.redux.select<MeasureWeightStoreObj>('weightObj').pipe()
        .subscribe((maxlimit) => {
           console.log('Max Limit** from package**', maxlimit);
           this.shipmentObjArr.push(event);
           this.totalAcceptableShipmentWeight = maxlimit.acceptableWeight;
        });
    } else {
      console.log('Max limit reached*****', this.shipmentObjArr.length);
    }
  }
  totalPackages =  () => {
    return this.shipmentObjArr.length;
  }
  totalValueinEUR = () => {
    let totalValue = 0;

    this.shipmentObjArr.map((obj) => {
      if (obj.currency === 'GBP') {
        totalValue += (parseFloat(obj.value) * this.conversionData.GBP);
      } else if (obj.currency === 'USD') {
        totalValue += (parseFloat(obj.value) * this.conversionData.USD);
      } else {
        totalValue += parseFloat(obj.value);
      }
    });
    return totalValue;
  }
  sendShipmentDetails = () => {
    if (this.shipmentObjArr.length > 0) {
      this.currencyConversion.sendShipment(this.shipmentObjArr).subscribe((res) => {
        this.router.navigate(['shipment/successful']);
      });
    }
  }
}
