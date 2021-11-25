import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CinemaModel } from '@models/cinema.model';
import { MovieModel } from '@models/movie.model';
import { CinemaService } from '@service/cinema.service';
import { MovieService } from '@service/movie.service';
import { ShowtimeService } from '@service/showtime.service';
import { Nullable } from '@tools/utilityTypes';
import * as moment from 'moment';

@Component({
  selector: 'app-showtime-schedule',
  templateUrl: './showtime-schedule.component.html',
  styleUrls: ['./showtime-schedule.component.less']
})
export class ShowtimeScheduleComponent implements OnInit {
  cinemasWithMovieShowtimes: CinemaModel[] = [];

  currentMovie: Nullable<MovieModel> = null;

  constructor(
    private readonly movieService: MovieService,
    private readonly showtimeService: ShowtimeService,
    private readonly cinemaService: CinemaService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(
        (params: ParamMap) => {
          const id = Number(params.get('id'));
          if (id) {
            this.fetchMovie(id);
            this.fetchCinemasByMovieShowtimes(id);
          }
        }
      );
  }

  public navigateToOrder(movieId: number): void {
    void this.router.navigate([`movie/${movieId}/order`]);
  }

  public navigateToOrderEx(movieId: number, cinemaId: number, hallId: number, showtimeId: number): void {
    const queryParams = {
      queryParams: {
        showtimeId: showtimeId,
        cinemaId: cinemaId,
        hallId: hallId
      }
    };
    void this.router.navigate([`movie/${movieId}/order`], queryParams);
  }

  public formatDate(date: Date): string {
    return moment(date).format('DD.MM');
  }

  private fetchMovie(id: number): void {
    this.movieService.getMovie(id)
      .subscribe(
        (movie: MovieModel) => {
          this.currentMovie = movie;
        }
      );
  }

  private fetchCinemasByMovieShowtimes(movieId: number): void {
    this.showtimeService.getCinemasByMovieShowtimes(movieId)
      .subscribe(
        (cinemas: CinemaModel[]) => {
          this.cinemasWithMovieShowtimes = cinemas;
        }
      );
  }

}
