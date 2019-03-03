import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipmentComponent } from './Shipment/shipment.component';
import { ShipmentSucessfulComponent } from './ShipmentSuccessful/shipmentSucessful.component';

const routes: Routes = [
  {
    path: 'shipment', component: ShipmentComponent
  },
  {
    path: 'shipment/successful', component: ShipmentSucessfulComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
