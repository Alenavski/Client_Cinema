import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SnackBarService } from '@service/snack-bar.service';
import { ErrorHandlerFactory } from '@tools/serviceTools';
import { environment } from '../environments/environment';

import { TicketModel } from '@models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  errorHandler;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService
  ) {
    this.errorHandler = ErrorHandlerFactory(this.snackBarService);
  }

  public addTicket(ticket: TicketModel): Observable<number> {
    return this.httpClient.post<number>(`${environment.hostURL}tickets`, ticket)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
