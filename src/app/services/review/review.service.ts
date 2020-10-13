import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Review } from 'src/app/models/Review';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${baseURL}/api/review/get`);
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${baseURL}/api/review/add`, review).pipe( catchError(this.errorMgmt));
  }

  getReviewById(id: any): Observable<Review> {
    return this.http.get<Review>(`${baseURL}/api/review/get/${id}`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  updateReview(id: any, data: Review): Observable<Review> {
    return this.http.put<Review>(`${baseURL}/api/review/update/${id}`, data, { headers: this.headers}).pipe(catchError(this.errorMgmt));
  }

  deleteReview(id: any): Observable<Review> {
    return this.http.delete<Review>(`${baseURL}/api/review/delete/${id}`, { headers: this.headers}).pipe(catchError(this.errorMgmt));
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
