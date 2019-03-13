import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    this.navigate();
  }
  // Method to navigate to Shipment component.
  navigate = () => {
    this.router.navigate(['shipment']);
  }
}
