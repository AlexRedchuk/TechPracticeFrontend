import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Tour } from 'src/app/models/Tour';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../../../environments/environment';

// export interface FilterOptions {
//   country: string;
//   date_min: Date;
//   date_max: Date;
//   nights: number;
//   adults: number;
//   children: number;
// }

@Injectable({
  providedIn: 'root'
})
export class TourService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${baseURL}/api/Tour/get`);
  }

  addTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(`${baseURL}/api/Tour/add`, tour).pipe( catchError(this.errorMgmt));
  }

  getTourById(id: any): Observable<Tour> {
    return this.http.get<Tour>(`${baseURL}/api/Tour/get/${id}`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  updateTour(id: any, data: Tour): Observable<Tour> {
    return this.http.put<Tour>(`${baseURL}/api/Tour/update/${id}`, data, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  deleteTour(id: any): Observable<Tour> {
    return this.http.delete<Tour>(`${baseURL}/api/Tour/delete`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  getCountries(id: any): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${baseURL}/api/Tour/get/country/${id}`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  groupByCountry(): Observable<any> {
    return this.http.get<any>(`${baseURL}/api/Tour/country/group`,
    { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  filterTours(filterParams): Observable<Tour[]> {
    return this.http.post<Tour[]>(`${baseURL}/api/Tour/filter`, filterParams);
  }

  getByHotel(id: any): Observable<Tour> {
    return this.http.get<Tour>(`${baseURL}/api/Tour/get/hotel/${id}`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  getHotTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${baseURL}/api/Tour/hotTours`);
  }

   getUSDCourse(): Observable<any>{
    return this.http.get<any>('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
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
