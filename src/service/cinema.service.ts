import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CinemaModel } from '@models/cinema.model';

import { SnackBarService } from '@service/snack-bar.service';

import { ErrorHandlerFactory, getHttpOptionsWithAuthorizationHeader } from '@tools/serviceTools';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  errorHandler;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService
  ) {
    this.errorHandler = ErrorHandlerFactory(this.snackBarService);
  }

  public getCitiesByTerm(term: string): Observable<string[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.httpClient.get<string[]>(`${environment.hostURL}cinemas/cities/?term=${term}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public getCinemasByTerm(term: string): Observable<CinemaModel[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.httpClient.get<CinemaModel[]>(`${environment.hostURL}cinemas/?term=${term}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public getCinemas(): Observable<CinemaModel[]> {
    return this.httpClient.get<CinemaModel[]>(`${environment.hostURL}cinemas`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public getCinema(id: number): Observable<CinemaModel> {
    return this.httpClient.get<CinemaModel>(`${environment.hostURL}cinemas/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public addCinema(cinema: CinemaModel): Observable<number> {
    return this.httpClient.post<number>(
      `${environment.hostURL}cinemas`,
      cinema,
      getHttpOptionsWithAuthorizationHeader()
    )
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public editCinema(cinema: CinemaModel): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.hostURL}cinemas/${cinema.id}`,
      cinema,
      getHttpOptionsWithAuthorizationHeader()
    )
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public deleteCinema(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.hostURL}cinemas/${id}`,
      getHttpOptionsWithAuthorizationHeader()
    )
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
