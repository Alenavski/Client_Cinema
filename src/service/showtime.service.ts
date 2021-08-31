import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { ErrorHandlerFactory } from '@tools/serviceTools';

import { MovieModel } from '@models/movie.model';
import { ShowtimesFilterModel } from '@models/showtimes-filter.model';

import { SnackBarService } from '@service/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService
  ) {
  }

  public getShowtimes(filter: ShowtimesFilterModel): Observable<MovieModel[]> {
    const errorHandler = ErrorHandlerFactory(this.snackBarService);

    const options = {
      params: new HttpParams({
        fromObject: { ...filter }
      })
    };

    return this.httpClient.get<MovieModel[]>(`${environment.hostURL}showtimes`, options)
      .pipe(
        catchError(errorHandler)
      );
  }
}
