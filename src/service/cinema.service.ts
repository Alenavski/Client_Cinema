import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CinemaModel } from '@models/cinema.model';

import { SnackBarService } from '@service/snack-bar.service';

import { ErrorHandlerFactory } from '@tools/serviceTools';
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
    return this.httpClient.post<number>(`${environment.hostURL}cinemas`, cinema)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public editCinema(cinema: CinemaModel): Observable<void> {
    return this.httpClient.put<void>(`${environment.hostURL}cinemas/${cinema.id}`, cinema)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public deleteCinema(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.hostURL}cinemas/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
