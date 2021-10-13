import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SeatModel } from '@models/seat.model';

import { SnackBarService } from '@service/snack-bar.service';
import { ErrorHandlerFactory } from '@tools/serviceTools';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  errorHandler;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService
  ) {
    this.errorHandler = ErrorHandlerFactory(this.snackBarService);
  }

  public editSeats(idCinema: number, idHall: number, seats: SeatModel[]): Observable<void> {
    return this.httpClient.put<void>(`${environment.hostURL}seats`, seats)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public removeDeletedSeats(idCinema: number, idHall: number, deletedSeats: SeatModel[]): Observable<void> {
    const options = {
      body: deletedSeats
    };
    return this.httpClient.delete<void>(`${environment.hostURL}seats`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
