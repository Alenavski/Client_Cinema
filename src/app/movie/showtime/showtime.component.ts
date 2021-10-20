import { Component, OnInit } from '@angular/core';
import { CinemaModel } from '@models/cinema.model';
import { CinemaService } from '@service/cinema.service';
import { Nullable } from '@tools/utilityTypes';
import { SEAT_TYPES } from '@models/constants/seat-types';
import { HallModel } from '@models/hall.model';
import { HallAdditionModel } from '@models/hall-addition.model';
import { ShowtimeService } from '@service/showtime.service';
import { ShowtimeModel } from '@models/showtime.model';
import { Time } from '@angular/common';
import { MovieModel } from '@models/movie.model';
import { MovieService } from '@service/movie.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-showtime',
  templateUrl: './showtime.component.html',
  styleUrls: ['./showtime.component.less']
})
export class ShowtimeComponent implements OnInit {
  cinemas: CinemaModel[] = [];
  seatTypes = SEAT_TYPES;
  additions: HallAdditionModel[] = [];

  currentMovie: Nullable<MovieModel> = null;
  chosenCinema: Nullable<CinemaModel> = null;
  chosenHall: Nullable<HallModel> = null;
  time: string = '';
  standardPrice: number = 0;
  comfortPrice: number = 0;
  sofaPrice: number = 0;

  constructor(
    private readonly cinemaService: CinemaService,
    private readonly showtimeService: ShowtimeService,
    private readonly movieService: MovieService,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(
        (params: ParamMap) => {
          const id = Number(params.get('id'));
          if (id) {
            this.fetchMovie(id);
            this.fetchCinemas();
          }
        }
      );
  }

  public needAddition(): void {
    if (this.chosenHall?.additions
      && this.additions.length < this.chosenHall.additions.length
    ) {
      this.additions.push({
        price: 0,
        addition: {
          id: 0,
          name: ''
        }
      });
    }
  }

  public addShowtime(): void {
    let showtime: Nullable<ShowtimeModel> = null;
    if (this.chosenHall) {
      showtime = {
        id: 0,
        time: this.getTime(this.time),
        numberOfFreeSeats: 0,
        hall: this.chosenHall
      };
    }

    if (this.currentMovie?.id && showtime) {
      this.showtimeService.addShowtime(this.currentMovie.id, showtime).subscribe(
        (id: number) => {
          //add ticket
          // // add additions to ticket
          //refresh moviePage
        }
      );
    }
  }

  private fetchMovie(id: number): void {
    this.movieService.getMovie(id).subscribe(
      (movie: MovieModel) => {
        this.currentMovie = movie;
      }
    );
  }

  private getTime(time: string): Time {
    return {
      hours: Number(time.substring(0, time.indexOf(':'))),
      minutes: Number(time.substring(time.indexOf(':') + 1))
    };
  }

  private fetchCinemas(): void {
    this.cinemaService.getCinemas().subscribe(
      (cinemas: CinemaModel[]) => {
        this.cinemas = cinemas;
      }
    );
  }
}
