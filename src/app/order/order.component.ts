import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CinemaModel } from '@models/cinema.model';
import { SEAT_TYPES } from '@models/constants/seat-types';
import { HallModel } from '@models/hall.model';
import { MovieModel } from '@models/movie.model';
import { SeatModel } from '@models/seat.model';
import { ShowtimeModel } from '@models/showtime.model';
import { SeatTypeModel } from '@models/seat-type.model';
import { Nullable } from '@tools/utilityTypes';
import { AdditionModel } from '@models/addition.model';
import { TicketModel } from '@models/ticket.model';

import { HallService } from '@service/hall.service';
import { MovieService } from '@service/movie.service';
import { ShowtimeService } from '@service/showtime.service';
import { UserService } from '@service/user.service';
import { TicketService } from '@service/ticket.service';
import { SnackBarService } from '@service/snack-bar.service';
import { SeatService } from '@service/seat.service';

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
  chosenAdditions: AdditionModel[] = [];
  chosenSeats: SeatModel[] = [];

  seatsLayout: SeatModel[][] = [];
  seatTypes = SEAT_TYPES;
  numberOfSeats: number = 0;
  reservedSeats: SeatModel[] = [];

  currentTicket: Nullable<TicketModel> = null;

  timeAndPlaceFormGroup: FormGroup = new FormGroup({
    cinema: new FormControl('', [Validators.required]),
    hall: new FormControl('', [Validators.required]),
    showtime: new FormControl('', [Validators.required])
  });

  constructor(
    private readonly showtimeService: ShowtimeService,
    private readonly movieService: MovieService,
    private readonly hallService: HallService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly ticketService: TicketService,
    private readonly snackBarService: SnackBarService,
    private readonly seatService: SeatService
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

  public calcFinalPrice(): number {
    let price = 0;
    for (const seat of this.chosenSeats) {
      price += this.getPrice(seat.seatType);
    }
    for (const addition of this.chosenAdditions) {
      price += this.getAdditionPrice(addition);
    }
    return price;
  }

  public onMinusAdditionClick(addition: AdditionModel): void {
    const index = this.chosenAdditions.indexOf(addition);
    if (index != -1) {
      this.chosenAdditions.splice(index, 1);
    }
  }

  public onSeatClick(seat: SeatModel): void {
    if (!this.isReserved(seat)) {
      const index = this.chosenSeats.indexOf(seat);
      if (index === -1) {
        this.blockSeat(seat);
      } else {
        this.unblockSeat(seat.id!, index);
      }
    }
  }

  public getAdditionsCount(addition: AdditionModel): number {
    const additions = this.chosenAdditions.filter(ad => ad.id === addition.id);
    return additions.length;
  }

  public getPrice(seatType: SeatTypeModel): number {
    if (this.chosenShowtime) {
      const ticketPrice = this.chosenShowtime.prices.find(seatPrice => seatPrice.seatType.id === seatType.id);
      if (ticketPrice) {
        return ticketPrice.price;
      }
    }
    return 0;
  }

  public getAdditionPrice(addition: AdditionModel): number {
    if (this.chosenShowtime) {
      const hallAddition = this.chosenShowtime.hall.additions?.find(ha => ha.addition.id === addition.id);
      if (hallAddition) {
        return hallAddition.price;
      }
    }
    return 0;
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

  public onShowtimeChoose(): void {
    this.chosenSeats = [];
    this.seatsLayout = [];
    this.addTicket();
    this.fetchSeatsLayout();
  }

  public onApplyClick(): void {
    if (this.currentTicket) {
      this.currentTicket.additions = this.chosenAdditions;
      this.currentTicket.ticketSeats = [];
      for (const seat of this.chosenSeats) {
        this.currentTicket.ticketSeats.push({ seat: seat, isOrdered: true });
      }
      this.currentTicket.dateOfBooking = new Date();
      this.ticketService.applyTicket(this.currentTicket)
        .subscribe(
          () => {
            this.snackBarService.showMessage('Successful success');
          }
        );
    }

  }

  public fetchSeatsLayout(): void {
    if (this.chosenHall && this.chosenShowtime) {
      this.seatService.getBlockedSeatsOfShowtime(this.chosenShowtime.id)
        .subscribe(
          (seats: SeatModel[]) => {
            this.reservedSeats = seats;
            const [x, y] = this.calcSizeOfHall();
            this.numberOfSeats = this.chosenHall!.seats.length;
            for (let i = 0; i <= x; i++) {
              this.seatsLayout[i] = [];
              this.seatsLayout[i].length = y;
            }
            for (const seat of this.chosenHall!.seats) {
              this.seatsLayout[seat.row][seat.index] = seat;
            }
          }
        );
    }
  }

  public isReserved(seat: SeatModel): boolean {
    return !!this.reservedSeats.filter(s => s.id === seat.id).length;
  }

  public isChosen(seat: SeatModel): boolean {
    return this.chosenSeats.includes(seat);
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

  private addTicket(): void {
    this.currentTicket = {
      id: 0,
      showtime: this.chosenShowtime!,
      user: UserService.getUserModel(),
      dateOfBooking: new Date(),
      dateOfShowtime: new Date()
    };
    this.ticketService.addTicket(this.currentTicket)
      .subscribe(
        (id: number) => {
          this.currentTicket!.id = id;
        }
      );
  }

  private blockSeat(seat: SeatModel): void {
    if (this.currentTicket) {
      this.ticketService.blockSeat(this.currentTicket.id, seat.id!)
        .subscribe(
          () => {
            this.chosenSeats.push(seat);
          }
        );
    }
  }

  private unblockSeat(seatId: number, index: number): void {
    if (this.currentTicket) {
      this.ticketService.unblockSeat(this.currentTicket.id, seatId)
        .subscribe(
          () => {
            this.chosenSeats.splice(index, 1);
          }
        );
    }
  }
}
