import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieModel } from '@models/movie.model';
import { MovieService } from '@service/movie.service';
import * as moment from 'moment';

const movieOuterWidth: number = 100;
const units: string = 'vw';

@Component({
  selector: 'app-movie-slider',
  templateUrl: './movie-slider.component.html',
  styleUrls: ['./movie-slider.component.less']
})
export class MovieSliderComponent implements OnInit {
  movies: MovieModel[] = [];
  sliderIndex = 0;

  constructor(
    private readonly movieService: MovieService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.fetchMovies();
  }

  public formatDate(date: Date): string {
    return moment(date).format('DD.MM');
  }

  public navigateToOrder(movieId: number): void {
    void this.router.navigate([`movie/${movieId}/order`]);
  }

  public moveLeft(movieList: HTMLElement): void {
    this.sliderIndex = (this.movies.length + this.sliderIndex - 1) % this.movies.length;
    movieList.style.left = (-movieOuterWidth * this.sliderIndex) + units;
  }

  public moveRight(movieList: HTMLElement): void {
    this.sliderIndex = (this.sliderIndex + 1) % this.movies.length;
    movieList.style.left = (-movieOuterWidth * this.sliderIndex) + units;
  }


  private fetchMovies(): void {
    this.movieService.getMovies(new Date().toDateString())
      .subscribe(
        (movies: MovieModel[]) => {
          this.movies = movies;
        }
      );
  }
}
