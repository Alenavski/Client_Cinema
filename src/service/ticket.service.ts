import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TicketMovieModel } from '@models/ticket-movie.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SnackBarService } from '@service/snack-bar.service';
import { ErrorHandlerFactory, getHttpOptionsWithAuthorizationHeader } from '@tools/serviceTools';
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

  public getTickets(): Observable<TicketModel[]> {
    return this.httpClient.get<TicketModel[]>(
      `${environment.hostURL}tickets`,
      getHttpOptionsWithAuthorizationHeader()
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  public getTicketMovies(): Observable<TicketMovieModel[]> {
    return this.httpClient.get<TicketMovieModel[]>(
      `${environment.hostURL}tickets/movies`,
      getHttpOptionsWithAuthorizationHeader()
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  public addTicket(ticket: TicketModel): Observable<number> {
    return this.httpClient.post<number>(
      `${environment.hostURL}tickets`,
      ticket,
      getHttpOptionsWithAuthorizationHeader()
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  public blockSeat(ticketId: number, seatId: number): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.hostURL}tickets/${ticketId}/seats/${seatId}`,
      {},
      getHttpOptionsWithAuthorizationHeader()
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  public unblockSeat(ticketId: number, seatId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.hostURL}tickets/${ticketId}/seats/${seatId}`,
      getHttpOptionsWithAuthorizationHeader()
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  public applyTicket(ticket: TicketModel): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.hostURL}tickets`,
      ticket,
      getHttpOptionsWithAuthorizationHeader()
    ).pipe(
      catchError(this.errorHandler)
    );
  }
}
