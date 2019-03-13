import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Package } from '../Package/package';

@Injectable()
export class AppService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(@Inject(HttpClient) private http: HttpClient) {
  }
  // Method to get currency conversion data.
  convertCurrencyParams(): Observable<any> {
    const url = 'http://localhost:3000/data';
    return this.http.get(url).pipe(map((res: Response) => {
      return res;
    }), catchError ((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(error);
    }));
  }
  // Method to post shipment obj.
  sendShipment(pkgArr: Package[]): Observable<any> {
    const url = 'http://localhost:12345/shipment';
    const pkgObj = {
      "packages": pkgArr
    }
    return this.http.post<any>(url, pkgObj, this.httpOptions)
      .pipe(map((res: Response) => {
        return res;
    }), catchError ((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(error);
      }));
  }
}
