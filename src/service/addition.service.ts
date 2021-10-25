import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@service/user.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AdditionModel } from '@models/addition.model';
import { HallAdditionModel } from '@models/hall-addition.model';

import { SnackBarService } from '@service/snack-bar.service';

import { ErrorHandlerFactory } from '@tools/serviceTools';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdditionService {
  errorHandler;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService
  ) {
    this.errorHandler = ErrorHandlerFactory(this.snackBarService);
  }

  public getAdditions(): Observable<AdditionModel[]> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.get<AdditionModel[]>(`${environment.hostURL}additions`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public getHallAdditions(hallId: number): Observable<HallAdditionModel[]> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.get<HallAdditionModel[]>(`${environment.hostURL}halls/${hallId}/additions`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public addAddition(addition: AdditionModel): Observable<number> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.post<number>(`${environment.hostURL}additions`, addition, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public addHallAddition(hallId: number, addition: HallAdditionModel): Observable<void> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.post<void>(`${environment.hostURL}halls/${hallId}/additions/${addition.addition.id}`, addition, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public deleteAddition(id: number): Observable<void> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.delete<void>(`${environment.hostURL}additions/${id}`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public deleteHallAddition(hallId: number, additionId: number): Observable<void> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.delete<void>(`${environment.hostURL}halls/${hallId}/additions/${additionId}`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
