import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, from, throwError} from 'rxjs';
import {OrderLog} from '../../models/OrderLog';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../../../environments/environment';
import { User } from 'src/app/models/User';
@Injectable({
  providedIn: 'root'
})
export class OrderLogService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getOrderLogs(): Observable<OrderLog[]> {
    return this.http.get<OrderLog[]>(`${baseURL}/api/orderLog/get`);
  }

  addOrderLog(orderLog: any): Observable<OrderLog> {
    return this.http.post<OrderLog>(`${baseURL}/api/orderLog/add`, orderLog).pipe(catchError(this.errorMgmt));
  }

  getOrderLogById(id: any): Observable<OrderLog> {
    return this.http.get<OrderLog>(`${baseURL}/api/orderLog/get/${id}`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  updateOrderLog(id: any, data: OrderLog): Observable<OrderLog> {
    return this.http.put<OrderLog>(`${baseURL}/api/orderLog/update/${id}`, data, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  deleteOrderLog(id: any): Observable<OrderLog> {
    return this.http.delete<OrderLog>(`${baseURL}/api/orderLog/delete/${id}`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  findOrderLogByUserId(id: any): Observable<OrderLog[]> {
    return this.http.get<OrderLog[]>(`${baseURL}/api/orderLog/findByUser/${id}`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  findOrder(orderLog: any): Observable<OrderLog[]> {
    return this.http.post<OrderLog[]>(`${baseURL}/api/orderLog/isOrdered`, orderLog).pipe(catchError(this.errorMgmt));
  }

  checkDate(obj: {user: any , minDate: Date, maxDate: Date}): Observable<any> {
    return this.http.post<any>(`${baseURL}/api/orderLog/checkDate`, obj).pipe(catchError(this.errorMgmt));
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
