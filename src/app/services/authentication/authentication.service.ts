import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {User} from '../../models/User';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap, delay} from 'rxjs/operators';
import { baseURL } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public error$: Subject<string> = new Subject<string>();
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }
  register(user: User): Observable<User> {
    return this.http.post<User>(`${baseURL}/api/auth/register`, user).pipe( catchError(this.handleError.bind(this)));
  }

  login(user: User): Observable<any> {
    return  this.http.post<any>(`${baseURL}/api/auth/login`, user).pipe(tap(this.setToken),  catchError(this.handleError.bind(this))
    );
  }

  getUserId(): Observable<string> {
    return this.http.get<string>(`${baseURL}/api/auth/userid/${localStorage.getItem('token')}`);
  }

  logout() {
    this.setToken(null);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(res: any | null) {
    if (res) {
      const expDate = new Date( new Date().getTime() + res.expiresIn * 1000);
      localStorage.setItem('token', res.token);
      localStorage.setItem('token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error.message;

    this.error$.next(message);

    return throwError(error);
  }

}
