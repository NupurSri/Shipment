import {TestBed, async, fakeAsync, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app-routing.module';
import { Router } from '@angular/router';
import { ShipmentComponent } from './Shipment/shipment.component';
import { ShipmentSucessfulComponent } from './ShipmentSuccessful/shipmentSucessful.component';
import { PackageComponent } from './Package/package.component';
import { AppService } from './service/app.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { AppActions } from './app.action';

describe('AppComponent', () => {
  let router: Router;
  let location: Location;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgReduxTestingModule
      ],
      providers: [AppService,
        AppActions],
      declarations: [
        AppComponent,
        ShipmentComponent,
        ShipmentSucessfulComponent,
        PackageComponent
      ],
    }).compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));
  // Unit case to check if app is initialized properly.
  it('should initialize app component', () => {
    expect(component).toBeTruthy();
  });
});
