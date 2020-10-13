import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Hotel } from 'src/app/models/Hotel';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HotelService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${baseURL}/api/hotel/get`);
  }

  addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${baseURL}/api/hotel/add`, hotel).pipe( catchError(this.errorMgmt));
  }

  getHotelById(id: any): Observable<Hotel> {
    return this.http.get<Hotel>(`${baseURL}/api/hotel/get/${id}`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  updateHotel(id: any, data: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${baseURL}/api/Hotel/update/${id}`, data, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  deleteHotel(id: any): Observable<Hotel> {
    return this.http.delete<Hotel>(`${baseURL}/api/hotel/delete`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  findHotelsByName(name: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${baseURL}/api/hotel/findByName`, {
      params: new HttpParams().append('name', name)
    }).pipe(catchError(this.errorMgmt));
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
