import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${baseURL}/api/User/get`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${baseURL}/api/User/add`, user).pipe( catchError(this.errorMgmt));
  }

  getUserById(id: any): Observable<User> {
    return this.http.get<User>(`${baseURL}/api/User/get/${id}`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  updateUser(id: any, data: User): Observable<User> {
    return this.http.put<User>(`${baseURL}/api/User/update/${id}`, data, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  deleteUser(id: any): Observable<User> {
    return this.http.delete<User>(`${baseURL}/api/User/delete`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
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
