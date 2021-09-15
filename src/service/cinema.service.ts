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
  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService
  ) {
  }

  public getCinemas(): Observable<CinemaModel[]> {
    const errorHandler = ErrorHandlerFactory(this.snackBarService);

    return this.httpClient.get<CinemaModel[]>(`${environment.hostURL}cinemas`)
      .pipe(
        catchError(errorHandler)
      );
  }

  public getCinema(id: number): Observable<CinemaModel> {
    const errorHandler = ErrorHandlerFactory(this.snackBarService);

    return this.httpClient.get<CinemaModel>(`${environment.hostURL}cinemas/${id}`)
      .pipe(
        catchError(errorHandler)
      );
  }

  public addCinema(cinema: CinemaModel): Observable<number> {
    const errorHandler = ErrorHandlerFactory(this.snackBarService);

    return this.httpClient.post<number>(`${environment.hostURL}cinemas`, cinema)
      .pipe(
        catchError(errorHandler)
      );
  }

  public editCinema(cinema: CinemaModel): Observable<void> {
    const errorHandler = ErrorHandlerFactory(this.snackBarService);

    return this.httpClient.put<void>(`${environment.hostURL}cinemas/${cinema.id}`, cinema)
      .pipe(
        catchError(errorHandler)
      );
  }

  public deleteCinema(id: number): Observable<void> {
    const errorHandler = ErrorHandlerFactory(this.snackBarService);

    return this.httpClient.delete<void>(`${environment.hostURL}cinemas/${id}`)
      .pipe(
        catchError(errorHandler)
      );
  }
}
