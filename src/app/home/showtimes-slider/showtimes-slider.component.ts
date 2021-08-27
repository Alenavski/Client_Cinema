import { Component } from '@angular/core';
import { CinemaModel } from '@models/cinema.model';
import { MovieModel } from '@models/movie.model';
import { ShowtimeModel } from '@models/showtime.model';
import { Time } from '@angular/common';
import { ShowtimeService } from '@service/showtime.service';

const movieOuterWidth: number = 400;

@Component({
  selector: 'app-showtimes-slider',
  templateUrl: './showtimes-slider.component.html',
  styleUrls: ['./showtimes-slider.component.less']
})
export class ShowtimesSliderComponent {
  filteredMovies: MovieModel[] = [];
  sliderIndex = 0;
  movieIndent = 1;

  constructor(private readonly showtimeService: ShowtimeService) {
    this.clearFilter();
    this.getShowtimes();
  }

  getCity(): string {
    return localStorage.getItem('city') ?? '';
  }

  calculateMovieIndent(movieList: HTMLElement): void {
    this.movieIndent = Math.trunc((movieList.clientWidth / movieOuterWidth));
    console.log(this.movieIndent);
  }

  moveRight(movieList: HTMLElement): void {
    this.sliderIndex++;
    movieList.style.left = (-movieOuterWidth * this.sliderIndex) + 'px';
    this.calculateMovieIndent(movieList);
  }

  moveLeft(movieList: HTMLElement): void {
    this.sliderIndex--;
    movieList.style.left = (-movieOuterWidth * this.sliderIndex) + 'px';
    this.calculateMovieIndent(movieList);
  }

  public getShowtimes(): void {
    this.showtimeService.getShowtimes().subscribe(
      (showtimeModels: ShowtimeModel[]) => {
        this.filterMovies(showtimeModels);
      }
    );
  }

  public getCinemasOfMovieAndTime(movie: MovieModel, time: Time): CinemaModel[] {
    const cinemas: CinemaModel[] | undefined = movie.showtimes?.filter((showtime: ShowtimeModel) => showtime.time == time).map((showtime: ShowtimeModel) => showtime.hall.cinema);
    return cinemas ? cinemas : [];
  }

  private filterMovies(showtimes: ShowtimeModel[]): void {
    const movies: MovieModel[] = [];
    for (const sh of showtimes) {
      const index: number = movies.indexOf(sh.movie);
      if (index !== -1) {
        movies[index].showtimes?.push(sh);
      }
      else {
        movies.push(sh.movie);
        sh.movie.showtimes = [];
        sh.movie.showtimes.push(sh);
      }
    }
    this.filteredMovies = movies;
  }

  private clearFilter(): void {
    localStorage.removeItem('cinemaName');
    localStorage.removeItem('movieTitle');
    localStorage.removeItem('endTime');
    localStorage.removeItem('numberOfFreeSeats');
  }
}
