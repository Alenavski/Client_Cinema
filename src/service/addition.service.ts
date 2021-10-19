import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.httpClient.get<AdditionModel[]>(`${environment.hostURL}additions`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public getHallAdditions(hallId: number): Observable<HallAdditionModel[]> {
    return this.httpClient.get<HallAdditionModel[]>(`${environment.hostURL}halls/${hallId}/additions`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public addAddition(addition: AdditionModel): Observable<number> {
    return this.httpClient.post<number>(`${environment.hostURL}additions`, addition)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public addHallAddition(hallId: number, addition: HallAdditionModel): Observable<void> {
    return this.httpClient.post<void>(`${environment.hostURL}halls/${hallId}/additions/${addition.addition.id}`, addition)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public deleteAddition(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.hostURL}additions/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public deleteHallAddition(hallId: number, additionId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.hostURL}halls/${hallId}/additions/${additionId}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
