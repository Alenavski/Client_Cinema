import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CinemaModel } from '@models/cinema.model';
import { SEAT_TYPES } from '@models/constants/seat-types';
import { HallModel } from '@models/hall.model';
import { MovieModel } from '@models/movie.model';
import { SeatModel } from '@models/seat.model';
import { ShowtimeModel } from '@models/showtime.model';
import { HallService } from '@service/hall.service';
import { MovieService } from '@service/movie.service';
import { OrderServiceFake } from '@service/order.service.fake';
import { ShowtimeService } from '@service/showtime.service';
import { Nullable } from '@tools/utilityTypes';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  movie: Nullable<MovieModel> = null;
  cinemasWithShowtime: CinemaModel[] = [];

  chosenCinema: Nullable<CinemaModel> = null;
  chosenHall: Nullable<HallModel> = null;
  chosenShowtime: Nullable<ShowtimeModel> = null;

  seatsLayout: SeatModel[][] = [];
  seatTypes = SEAT_TYPES;
  numberOfSeats: number = 0;
  reservedSeats: SeatModel[] = [];

  chosenSeats: SeatModel[] = [];

  timeAndPlaceFormGroup: FormGroup = new FormGroup({
    cinema: new FormControl('', [Validators.required]),
    hall: new FormControl('', [Validators.required]),
    showtime: new FormControl('', [Validators.required])
  });

  constructor(
    private readonly showtimeService: ShowtimeService,
    private readonly movieService: MovieService,
    private readonly hallService: HallService,
    private readonly orderService: OrderServiceFake,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(
        (params: ParamMap) => {
          const idMovie = Number(params.get('id'));
          if (idMovie != 0) {
            this.fetchMovie(idMovie);
            this.fetchCinemas(idMovie);
          }
        }
      );
  }

  public filterShowtimes(): ShowtimeModel[] | undefined {
    return this.movie?.showtimes?.filter(sh => sh.hall.id == this.chosenHall?.id);
  }

  public isSofa(seat?: SeatModel): boolean {
    if (seat) {
      return seat.seatType.name === this.seatTypes.Sofa.name;
    } else {
      return false;
    }
  }

  public calcSizeOfHall(): number[] {
    let maxSeats = 0;
    let maxRows = 0;
    if (this.chosenHall) {
      for (const seat of this.chosenHall.seats) {
        maxSeats = Math.max(maxSeats, seat.place);
        maxRows = Math.max(maxRows, seat.row);
      }
    }
    return [maxRows, maxSeats];
  }

  public fetchSeatsLayout(): void {
    const [x, y] = this.calcSizeOfHall();
    if (this.chosenHall) {
      this.numberOfSeats = this.chosenHall.seats.length;
      for (let i = 0; i <= x; i++) {
        this.seatsLayout[i] = [];
        this.seatsLayout[i].length = y;
      }
      for (const seat of this.chosenHall.seats) {
        this.seatsLayout[seat.row][seat.index] = seat;
      }

      if (this.chosenShowtime) {
        this.orderService.getReservedSeats(this.chosenHall).subscribe(
          (reservedSeats: SeatModel[]) => {
            this.reservedSeats = reservedSeats;
            console.log(this.reservedSeats);
          }
        );
      }
    }
  }

  public isReserved(seat: SeatModel): boolean {
    console.log(seat, this.reservedSeats.includes(seat));
    return this.reservedSeats.includes(seat);
  }

  private fetchMovie(id: number): void {
    this.movieService.getMovie(id)
      .subscribe(
        (movie: MovieModel) => {
          this.movie = movie;
        }
      );
  }

  private fetchCinemas(movieId: number): void {
    this.showtimeService.getCinemasByMovieShowtimes(movieId)
      .subscribe(
        (cinemas: CinemaModel[]) => {
          this.cinemasWithShowtime = cinemas;
        }
      );
  }
}
