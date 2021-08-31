import { Component, Input, ViewChild } from '@angular/core';
import { Time } from '@angular/common';

import { CinemaModel } from '@models/cinema.model';
import { MovieModel } from '@models/movie.model';
import { ShowtimeModel } from '@models/showtime.model';
import { FilterService } from '@service/filter.service';

const movieOuterWidth: number = 400;

@Component({
  selector: 'app-showtimes-slider',
  templateUrl: './showtimes-slider.component.html',
  styleUrls: ['./showtimes-slider.component.less']
})
export class ShowtimesSliderComponent {
  @Input() filteredMovies: MovieModel[] = [];

  @ViewChild('movieList') movieList: HTMLElement | undefined;

  sliderIndex = 0;
  movieIndent = 1;

  constructor(
    private readonly filterService: FilterService
  ) {
  }

  get City(): string {
    return this.filterService.filterForShowtimes.city ?? 'all cities';
  }

  calculateMovieIndent(movieList: HTMLElement): void {
    this.movieIndent = Math.trunc((movieList.clientWidth / movieOuterWidth));

    if (this.filteredMovies.length - this.movieIndent < 0) {
      this.movieIndent = this.filteredMovies.length;
    }
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

  public getCinemasOfMovieAndTime(movie: MovieModel, time: Time): CinemaModel[] {
    const cinemas: CinemaModel[] | undefined = movie.showtimes?.filter((showtime: ShowtimeModel) => showtime.time == time).map((showtime: ShowtimeModel) => showtime.hall.cinema);
    return cinemas ? cinemas : [];
  }
}
