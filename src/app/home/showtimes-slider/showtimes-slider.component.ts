import { Component, Input, ViewChild } from '@angular/core';
import { HallModel } from '@models/hall.model';
import { Optional } from '@tools/utilityTypes';

import { MovieModel } from '@models/movie.model';
import { ShowtimeModel } from '@models/showtime.model';

import { FilterService } from '@service/filter.service';
import { Router } from '@angular/router';

const movieOuterWidth: number = 400;
const countOfDisplayedCharacters: number = 100;

@Component({
  selector: 'app-showtimes-slider',
  templateUrl: './showtimes-slider.component.html',
  styleUrls: ['./showtimes-slider.component.less']
})
export class ShowtimesSliderComponent {
  @Input() filteredMovies: MovieModel[] = [];

  @ViewChild('movieList') movieList?: HTMLElement;

  sliderIndex = 0;
  movieIndent = 1;

  public get City(): string {
    return this.filterService.filterForShowtimes.city ?? 'all cities';
  }

  constructor(
    private readonly filterService: FilterService,
    private readonly router: Router
  ) {
  }

  public navigateToOrder(movieId: number): void {
    void this.router.navigate([`movie/${movieId}/order`]);
  }

  public makeMovieDescription(description: string): string {
    return description.substring(0, countOfDisplayedCharacters) + '...';
  }

  public calculateMovieIndent(movieList: HTMLElement): void {
    this.movieIndent = Math.trunc((movieList.clientWidth / movieOuterWidth));

    if (this.filteredMovies.length - this.movieIndent < 0) {
      this.movieIndent = this.filteredMovies.length;
    }
  }

  public moveRight(movieList: HTMLElement): void {
    this.sliderIndex++;
    movieList.style.left = (-movieOuterWidth * this.sliderIndex) + 'px';
    this.calculateMovieIndent(movieList);
  }

  public moveLeft(movieList: HTMLElement): void {
    this.sliderIndex--;
    movieList.style.left = (-movieOuterWidth * this.sliderIndex) + 'px';
    this.calculateMovieIndent(movieList);
  }

  public getCinemasOfMovieAndTime(movie: MovieModel, time: string): HallModel[] {
    const cinemas: Optional<HallModel[]> = movie.showtimes?.filter((showtime: ShowtimeModel) => showtime.time === time)
      .map((showtime: ShowtimeModel) => showtime.hall);
    return cinemas ? cinemas : [];
  }
}
