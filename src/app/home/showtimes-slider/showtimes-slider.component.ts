import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CinemaModel } from '@models/cinema.model';
import { MovieModel } from '@models/movie.model';
import { ShowtimeModel } from '@models/showtime.model';
import { Time } from '@angular/common';
import { FilterService } from '@service/filter.service';
import { ShowtimeService } from '@service/showtime.service';

const movieOuterWidth: number = 400;

@Component({
  selector: 'app-showtimes-slider',
  templateUrl: './showtimes-slider.component.html',
  styleUrls: ['./showtimes-slider.component.less']
})
export class ShowtimesSliderComponent implements OnInit {
  @ViewChild('movieList') movieList: HTMLElement | undefined;

  filteredMovies: MovieModel[] = [];
  sliderIndex = 0;
  movieIndent = 1;

  constructor(private readonly showtimeService: ShowtimeService,
              private readonly filterService: FilterService) {
  }

  ngOnInit(): void {
    this.getShowtimes();
  }

  get City(): string {
    return this.filterService.filterForShowtimes.city;
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
      const idMovie: number = sh.movie.id;
      let foundMovie = null;
      for (const movie of movies) {
        if (movie.id === idMovie) {
          foundMovie = movie;
        }
      }
      if (foundMovie) {
        foundMovie.showtimes?.push(sh);
      }
      else {
        movies.push(sh.movie);
        sh.movie.showtimes = [];
        sh.movie.showtimes.push(sh);
      }
    }
    this.filteredMovies = movies;
    this.calculateMovieIndent(this.movieList!);
  }
}
