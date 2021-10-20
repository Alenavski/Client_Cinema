import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { ErrorHandlerFactory } from '@tools/serviceTools';

import { MovieModel } from '@models/movie.model';
import { ShowtimesFilterModel } from '@models/showtimes-filter.model';

import { SnackBarService } from '@service/snack-bar.service';
import { ShowtimeModel } from '@models/showtime.model';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  errorHandler;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService
  ) {
    this.errorHandler = ErrorHandlerFactory(this.snackBarService);
  }

  public addShowtime(movieId: number, showtime: ShowtimeModel): Observable<number> {
    console.log(showtime);
    return this.httpClient.post<number>(`${environment.hostURL}movies/${movieId}/showtimes`, showtime)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public deleteShowtime(movieId: number, id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.hostURL}movies/${movieId}/showtimes/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public getShowtimes(filter: ShowtimesFilterModel): Observable<MovieModel[]> {
    const options = {
      params: new HttpParams({
        fromObject: { ...this.removeEmpty(filter) }
      })
    };

    return this.httpClient.get<MovieModel[]>(`${environment.hostURL}movies`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  private removeEmpty(filter: ShowtimesFilterModel): ShowtimesFilterModel {
    return Object.fromEntries(Object.entries(filter).filter(([_, v]) => v != null)) as ShowtimesFilterModel;
  }
}
