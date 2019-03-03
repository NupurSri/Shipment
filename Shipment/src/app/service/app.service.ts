import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import {Error} from 'tslint/lib/error';

@Injectable()
export class AppService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(@Inject(HttpClient) private http: HttpClient) {
  }
  convertCurrencyParams(): Observable<any> {
    const url = 'http://localhost:3000/data';
    return this.http.get(url).pipe(map((res: Response) => {
      return res;
    }), );
  }
  sendShipment(obj): Observable<any> {
    console.log('sendShipment called');
    const url = 'http://localhost:12345/shipment';
    const pkgObj = {
      "packages": obj
    }
    return this.http.post<any>(url, pkgObj, this.httpOptions)
      .pipe();
  }
}
