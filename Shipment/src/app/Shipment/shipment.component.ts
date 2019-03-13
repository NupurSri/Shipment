import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { NgRedux } from '@angular-redux/store';
import { ShipmentAppState } from '../app-store';
import { Router } from '@angular/router';
import { Package } from '../Package/package';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss'],
})
export class ShipmentComponent implements OnInit {
  maxPackageCount = 5;
  shipmentObjArr: Package[] = [];
  totalAcceptableShipmentWeight = 0.000;
  conversionData: any;
  maxPackageLimitReached = false;
  resetPackageForm = false;
  constructor(private appService: AppService, private redux: NgRedux<ShipmentAppState>,
              private router: Router) {}
  ngOnInit() {
    this.appService.convertCurrencyParams().subscribe((res) => {
      this.conversionData = res[0];
    });
  }
  // Method to add package to shipment.
  addPackage = (event) => {
    const pkgObj = new Package();
    pkgObj.setPackageName(event.pkgName);
    pkgObj.setPackageWeight(event.pkgWeight);
    pkgObj.setCurrency(event.currency);
    pkgObj.setPackageValue(event.pkgValue);
     if (this.shipmentObjArr.length < this.maxPackageCount) {
       this.maxPackageLimitReached = false;
       this.shipmentObjArr.push(pkgObj);
       this.redux.select<ShipmentAppState>('shipmentWeight').pipe()
          .subscribe((maxlimit) => {
            if (maxlimit) {
              this.totalAcceptableShipmentWeight = maxlimit.shipmentWeight;
            }
          });
      } else {
        this.maxPackageLimitReached = true;
      }
  }
  // Method to get total shipment array.
  totalPackages =  () => {
    return this.shipmentObjArr.length;
  }
  // Method to get total shipment value in EUR.
  totalShipmentValueinEUR = () => {
    let totalValue = 0;
    this.shipmentObjArr.map((pkgObj) => {
      if (pkgObj && this.conversionData) {
        if (pkgObj.getCurrency() === 'GBP') {
          totalValue += (parseFloat(pkgObj.getPackageValue()) * this.conversionData.GBP);
        } else if (pkgObj.getCurrency() === 'USD') {
          totalValue += (parseFloat(pkgObj.getPackageValue()) * this.conversionData.USD);
        } else {
          totalValue += parseFloat(pkgObj.getPackageValue());
        }
      }
    });
    return totalValue.toFixed(2);
  }
  isValidShipment = () => {
    const totalShipmentValue = this.totalShipmentValueinEUR();
    if (this.shipmentObjArr.length === 0) {
      return true;
    }
    return false;
  }
  // Method to post shipment.
  sendShipmentDetails = () => {
    if (this.shipmentObjArr.length > 0) {
      this.appService.sendShipment(this.shipmentObjArr).subscribe((res) => {
        this.router.navigate(['shipment/successful']);
      });
    }
  }
  // Reset shipment form.
  resetShipmentDetails = () => {
    this.shipmentObjArr = [];
    this.maxPackageLimitReached = false;
    this.totalAcceptableShipmentWeight = 0;
    this.resetPackageForm = true;
  }
}
