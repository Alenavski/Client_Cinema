import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MovieModel } from '@models/movie.model';

import { SnackBarService } from '@service/snack-bar.service';

import { ErrorHandlerFactory, getHttpOptionsWithAuthorizationHeader } from '@tools/serviceTools';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  errorHandler;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService
  ) {
    this.errorHandler = ErrorHandlerFactory(this.snackBarService);
  }

  public getMovies(date?: string): Observable<MovieModel[]> {
    let options;
    if (date) {
      options = {
        params: new HttpParams({
            fromObject: { date: date }
        })
      };
    }

    return this.httpClient.get<MovieModel[]>(`${environment.hostURL}movies`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public getMoviesByTerm(term: string): Observable<MovieModel[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.httpClient.get<MovieModel[]>(`${environment.hostURL}movies/?term=${term}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public getMovie(id: number): Observable<MovieModel> {
    return this.httpClient.get<MovieModel>(`${environment.hostURL}movies/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public addMovie(movie: MovieModel): Observable<number> {
    return this.httpClient.post<number>(
      `${environment.hostURL}movies`,
      movie,
      getHttpOptionsWithAuthorizationHeader()
    )
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public editMovie(movie: MovieModel): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.hostURL}movies/${movie.id}`,
      movie,
      getHttpOptionsWithAuthorizationHeader()
    )
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public deleteMovie(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.hostURL}movies/${id}`,
      getHttpOptionsWithAuthorizationHeader()
    )
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
