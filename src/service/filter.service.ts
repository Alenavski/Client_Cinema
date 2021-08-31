import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ShowtimesFilterModel } from '@models/showtimes-filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public filterForShowtimes: ShowtimesFilterModel = {
    cinemaName: '',
    movieTitle: '',
    city: '',
    date: new Date(),
    startTime: '00:00',
    endTime: '23:59',
    numberOfFreeSeats: 1
  };

  constructor(private readonly router: Router) {

    void this.router.navigate([], {
      queryParams: {
        cinemaName: this.filterForShowtimes.cinemaName,
        movieTitle: this.filterForShowtimes.movieTitle,
        city: this.filterForShowtimes.city,
        date: this.filterForShowtimes.date.toDateString(),
        startTime: this.filterForShowtimes.startTime,
        endTime: this.filterForShowtimes.endTime,
        numberOfFreeSeats: this.filterForShowtimes.numberOfFreeSeats
      }
    });

    //this.setDate(this.filterForShowtimes.date);
  }

  public setCity(city: string): void {
    this.filterForShowtimes.city = city;
    //void this.router.navigate([], { queryParams: { city: this.filterForShowtimes.city }, queryParamsHandling: 'merge' });
  }

  public setDate(date: Date): void {
    this.filterForShowtimes.date = date;

    const urlTree = this.router.parseUrl(this.router.url);

    console.log('!', urlTree);

    //void this.router.navigate([], { queryParams: { date: this.filterForShowtimes.date.toDateString() }, queryParamsHandling: 'merge' });
  }

  public setCinema(cinemaName: string): void {
    this.filterForShowtimes.cinemaName = cinemaName;
    //void this.router.navigate([], { queryParams: { cinemaName: this.filterForShowtimes.cinemaName }, queryParamsHandling: 'merge' });
  }

  public setMovie(movieTitle: string): void {
    this.filterForShowtimes.movieTitle = movieTitle;
    //void this.router.navigate([], { queryParams: { movieTitle: this.filterForShowtimes.movieTitle }, queryParamsHandling: 'merge' });
  }

  public setStartTime(startTime: string): void {
    this.filterForShowtimes.startTime = startTime;
    //void this.router.navigate([], { queryParams: { startTime: this.filterForShowtimes.startTime }, queryParamsHandling: 'merge' });
  }

  public setEndTime(endTime: string): void {
    this.filterForShowtimes.endTime = endTime;
    //void this.router.navigate([], { queryParams: { endTime: this.filterForShowtimes.endTime }, queryParamsHandling: 'merge' });
  }

  public setNumberOfFreeSeats(freeSeats: number): void {
    this.filterForShowtimes.numberOfFreeSeats = freeSeats;
    //void this.router.navigate([], { queryParams: { numberOfFreeSeats: this.filterForShowtimes.numberOfFreeSeats }, queryParamsHandling: 'merge' });
  }
}
