import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ShipmentComponent } from './Shipment/shipment.component';
import { PackageComponent } from './Package/package.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule, MatSelectModule } from '@angular/material';
import { AppService } from './service/app.service';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { ShipmentAppState, rootReducer, INITIAL_STATE } from './app-store';
import { AppActions } from './app.action';
import { ShipmentSucessfulComponent } from './ShipmentSuccessful/shipmentSucessful.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipmentComponent,
    PackageComponent,
    ShipmentSucessfulComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule, MatOptionModule, MatSelectModule,
    HttpClientModule,
    NgReduxModule
  ],
  exports: [],
  providers: [AppService, AppActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<ShipmentAppState>) {
    const storeEnhancers = [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], storeEnhancers);
  }
}
