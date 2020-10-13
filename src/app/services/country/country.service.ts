import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, from, throwError} from 'rxjs';
import {Country} from '../../models/Country';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${baseURL}/api/country/get`);
  }

  addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(`${baseURL}/api/country/add`, country).pipe(catchError(this.errorMgmt));
  }

  getCountryById(id: any): Observable<Country> {
    return this.http.get<Country>(`${baseURL}/api/country/get/${id}`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  updateCountry(id: any, data: Country): Observable<Country> {
    return this.http.put<Country>(`${baseURL}/api/Country/update/${id}`, data, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  deleteCountry(id: any): Observable<Country> {
    return this.http.delete<Country>(`${baseURL}/api/country/delete`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

   // Error handling
   errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
