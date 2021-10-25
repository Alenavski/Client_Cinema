import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@service/user.service';
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
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.get<CinemaModel[]>(`${environment.hostURL}cinemas`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public getCinema(id: number): Observable<CinemaModel> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.get<CinemaModel>(`${environment.hostURL}cinemas/${id}`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public addCinema(cinema: CinemaModel): Observable<number> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.post<number>(`${environment.hostURL}cinemas`, cinema, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public editCinema(cinema: CinemaModel): Observable<void> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.put<void>(`${environment.hostURL}cinemas/${cinema.id}`, cinema, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public deleteCinema(id: number): Observable<void> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.delete<void>(`${environment.hostURL}cinemas/${id}`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
