import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShowtimeModel } from '@models/showtime.model';
import { ShowtimesFilterModel } from '@models/showtimes-filter.model';
import { SnackBarService } from '@service/snack-bar.service';
import { ErrorHandlerFactory } from '@tools/serviceTools';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  filter: ShowtimesFilterModel;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService
  ) {
    this.filter = this.setFilter();
  }

  public getShowtimes(): Observable<ShowtimeModel[]> {
    const errorHandler = ErrorHandlerFactory(this.snackBarService);
    return this.httpClient.get<ShowtimeModel[]>(environment.hostURL + 'showtimes?' + this.createQueryParams())
      .pipe(
        catchError(errorHandler)
      );
  }

  private createQueryParams(): string {
    this.filter = this.setFilter();
    return 'CinemaName=' + this.filter.cinemaName
        + '&MovieTitle=' + this.filter.movieTitle
        + '&City=' + this.filter.city
        + '&Date=' + this.filter.date.getFullYear() + '-' + (this.filter.date.getMonth() + 1) + '-' + this.filter.date.getDate()
        + '&StartTime=' + this.filter.startTime.hours + ':' + this.filter.startTime.minutes
        + '&EndTime=' + this.filter.endTime.hours + ':' + this.filter.endTime.minutes
        + '&NumberOfFreeSeats=' + this.filter.numberOfFreeSeats;
  }

  private setFilter(): ShowtimesFilterModel {
    return {
      cinemaName: localStorage.getItem('cinemaName') ?? '',
      movieTitle: localStorage.getItem('movieTitle') ?? '',
      city: localStorage.getItem('city') ?? '',
      date: new Date(localStorage.getItem('date') ?? Date.now()),
      startTime: this.getTimeFromString(localStorage.getItem('startTime') ?? '00:00'),
      endTime: this.getTimeFromString(localStorage.getItem('endTime') ?? '23:59'),
      numberOfFreeSeats: Number(localStorage.getItem('numberOfFreeSeats') ?? 1)
    };
  }

  private getTimeFromString(time: string): Time {
    return {
      hours: Number(time.substring(0, time.indexOf(':'))),
      minutes: Number(time.substring(time.indexOf(':') + 1, time.length))
    };
  }
}
