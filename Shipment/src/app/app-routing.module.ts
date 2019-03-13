import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipmentComponent } from './Shipment/shipment.component';
import { ShipmentSucessfulComponent } from './ShipmentSuccessful/shipmentSucessful.component';

export const routes: Routes = [
  {
    path: 'shipment', component: ShipmentComponent
  },
  {
    path: 'shipment/successful', component: ShipmentSucessfulComponent
  },
  {
    path: '*', component: ShipmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
