import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@service/user.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MovieModel } from '@models/movie.model';

import { SnackBarService } from '@service/snack-bar.service';

import { ErrorHandlerFactory } from '@tools/serviceTools';
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
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      }),
      params: new HttpParams()
    };

    if (date) {
      options.params = new HttpParams({
          fromObject: { date: date }
      });
    }

    return this.httpClient.get<MovieModel[]>(`${environment.hostURL}movies`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public getMovie(id: number): Observable<MovieModel> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.get<MovieModel>(`${environment.hostURL}movies/${id}`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public addMovie(movie: MovieModel): Observable<number> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.post<number>(`${environment.hostURL}movies`, movie, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public editMovie(movie: MovieModel): Observable<void> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.put<void>(`${environment.hostURL}movies/${movie.id}`, movie, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public deleteMovie(id: number): Observable<void> {
    const userModel = UserService.getUserModel();

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userModel?.token
      })
    };

    return this.httpClient.delete<void>(`${environment.hostURL}movies/${id}`, options)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
