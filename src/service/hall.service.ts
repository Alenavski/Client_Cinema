import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@service/user.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HallModel } from '@models/hall.model';

import { SnackBarService } from '@service/snack-bar.service';

import { ErrorHandlerFactory } from '@tools/serviceTools';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  errorHandler;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService
  ) {
    this.errorHandler = ErrorHandlerFactory(this.snackBarService);
  }

  public getHall(idCinema: number, idHall: number): Observable<HallModel> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.get<HallModel>(`${environment.hostURL}cinemas/${idCinema}/halls/${idHall}`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public addHall(idCinema: number, hall: HallModel): Observable<number> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.post<number>(`${environment.hostURL}cinemas/${idCinema}/halls`, hall, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public editHall(idCinema: number, hall: HallModel): Observable<void> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.put<void>(`${environment.hostURL}cinemas/${idCinema}/halls/${hall.id}`, hall, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public deleteHall(idCinema: number, idHall: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.hostURL}cinemas/${idCinema}/halls/${idHall}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
