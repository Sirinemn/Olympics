import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { OlympicCountry } from '../interface/olympic-country.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OlympicService {
  private olympicUrl = '/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[] | null>([]);

  constructor(private http: HttpClient) { }

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
      }),
      catchError(this.handleError)
    );
  }
  getOlympics() {
    return this.olympics$.asObservable();
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage= "";
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: `, error.error;
    }
    errorMessage = 'Something bad happened; please try again later.'
    return throwError(() => new Error(errorMessage));
  }
}
