import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { CinemaModel } from '@models/cinema.model';
import { HallModel } from '@models/hall.model';
import { SeatTypeModel } from '@models/seat-type.model';
import { SeatModel } from '@models/seat.model';

import { CinemaService } from '@service/cinema.service';
import { HallService } from '@service/hall.service';
import { SeatService } from '@service/seat.service';

import { SEAT_TYPES } from '@models/constants/seat-types';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.less']
})
export class HallComponent implements OnInit {
  isDirty: boolean = false;
  cinemaId: number = 0;
  cinemaName: string = '';
  seatTypes = SEAT_TYPES;
  deletedSeats: SeatModel[] = [];
  editedSeats: SeatModel[] = [];
  hall: HallModel = {
    id: 0,
    name: '',
    seats: []
  };
  numberOfSeats: number = 0;
  seatsLayout: SeatModel[][] = [];
  needToFill: boolean = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly hallService: HallService,
    private readonly cinemaService: CinemaService,
    private readonly seatService: SeatService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(
        (params: ParamMap) => {
          this.cinemaId = Number(params.get('idCinema'));
          this.fetchCinemaName();
          const hallId = Number(params.get('idHall'));
          if (hallId) {
            this.fetchHall(hallId);
          }
        }
      );
  }

  public canCreateSofa(columnIndex: number, rowIndex: number): boolean {
    return (columnIndex !== this.seatsLayout[rowIndex].length - 1)
      && !this.seatsLayout[rowIndex][columnIndex + 1];
  }

  public navigateToCinema(): void {
    void this.router.navigate([`cinema/${this.cinemaId}`]);
  }

  public onSaveChangesClick(): void {
    if (this.hall.id === 0) {
      this.hallService.addHall(this.cinemaId, this.hall)
        .subscribe(
          (idHall: number) => {
            void this.router.navigate([`/cinema/${this.cinemaId}/hall/${idHall}`]);
          }
        );
    } else {
      this.hallService.editHall(this.cinemaId, this.hall)
        .subscribe(
          () => {
            this.fetchHall(this.hall.id);
          }
        );
      if (this.editedSeats.length > 0) {
        this.seatService.editSeats(this.cinemaId, this.hall.id, this.editedSeats)
          .subscribe(
            () => {
              this.fetchHall(this.hall.id);
              this.editedSeats = [];
            }
          );
      }
      if (this.deletedSeats.length > 0) {
        this.seatService.removeDeletedSeats(this.cinemaId, this.hall.id, this.deletedSeats)
          .subscribe(
            () => {
              this.fetchHall(this.hall.id);
              this.deletedSeats = [];
            }
          );
      }
    }
    this.isDirty = false;
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
    for (const seat of this.hall.seats) {
      maxSeats = Math.max(maxSeats, seat.place);
      maxRows = Math.max(maxRows, seat.row);
    }
    return [maxRows, maxSeats];
  }

  public pushSeat(index: number, row: number, seatType: SeatTypeModel): void {
   this.isDirty = true;
    let place = 1;
    for (let i = index - 1; i >= 0; i--) {
      if (this.seatsLayout[row][i]){
        place = this.seatsLayout[row][i].place + 1;
        break;
      }
    }
    for (let i = index + 1; i < this.seatsLayout[row].length; i++) {
      if (this.seatsLayout[row][i]) {
        this.seatsLayout[row][i].place++;
        this.editSeat(this.seatsLayout[row][i]);
      }
    }
    const seat: SeatModel = {
      index: index,
      row: row,
      place: place,
      seatType: seatType
    };
    this.seatsLayout[row][index] = seat;
    this.hall.seats.push(seat);
  }

  public onDeleteSeatClick(seat: SeatModel): void {
    for (let i = this.seatsLayout[seat.row].length - 1; i > seat.index; i--) {
      if (this.seatsLayout[seat.row][i]) {
        this.seatsLayout[seat.row][i].place--;
        this.editSeat(this.seatsLayout[seat.row][i]);
      }
    }
    this.deleteSeat(seat);
  }

  public onNumberOfRowsChange(event: any): void {
    this.isDirty = this.needToFill;
    const oldRows = this.seatsLayout.length;
    const newValue = Number(event.target.value);

    if (newValue < oldRows) {
      this.isDirty = true;
      for (let i = newValue; i < oldRows; i++) {
        const lengthOfRow = this.seatsLayout[i].length;
        for (let j = 0; j < lengthOfRow; j++) {
          this.deleteSeat(this.seatsLayout[i][j]);
        }
      }
      return;
    }

    this.seatsLayout.length = newValue;
    for (let i = oldRows; i < newValue; i++) {
      this.seatsLayout[i] = [];
      this.seatsLayout[i].length = this.seatsLayout[0].length;
      if (this.needToFill) {
        for (let j = 0; j < this.seatsLayout[i].length; j++) {
          const newSeat = {
            index: j,
            row: i,
            place: j + 1,
            seatType: this.seatTypes.Standard
          };
          this.hall.seats.push(newSeat);
          this.seatsLayout[i][j] = newSeat;
        }
      }
    }
  }

  public onNumberOfColumnsChange(event: any): void {
    this.isDirty = this.needToFill;
    const newValue = Number(event.target.value);
    const oldValue = this.seatsLayout[0].length;

    if (newValue < oldValue) {
      this.isDirty = true;

      for (let i = 0; i < this.seatsLayout.length; i++) {
        for (let j = newValue; j < oldValue; j++) {
          this.deleteSeat(this.seatsLayout[i][j]);
        }
      }
      return;
    }

    for (let i = 0; i < this.seatsLayout.length; i++) {
      this.seatsLayout[i].length = newValue;
      if (this.needToFill) {
        let maxNumberInRow: number = 0;
        this.seatsLayout[i].map(
          value => {
            maxNumberInRow = Math.max(value.place, maxNumberInRow);
          }
        );
        for (let j = oldValue; j < this.seatsLayout[0].length; j++) {
          const newSeat = {
            index: j,
            row: i,
            place: maxNumberInRow + j - oldValue + 1,
            seatType: this.seatTypes.Standard
          };
          this.hall.seats.push(newSeat);
          this.seatsLayout[i][j] = newSeat;
        }
      }
    }
  }

  public onSeatTypeChange(seat: SeatModel, selectionChange: MatSelectChange): void {
    seat.seatType = selectionChange.value;
    this.editSeat(seat);
  }

  private editSeat(seat: SeatModel): void {
    if (this.deletedSeats.includes(seat)) {
      return;
    }
    if (this.hall.id === 0) {
      return;
    }
    if (seat.id === 0) {
      return;
    }
    if (this.editedSeats.includes(seat)) {
      return;
    }
    this.editedSeats.push(seat);
  }

  private deleteSeat(seat?: SeatModel): void {
    if (!seat) {
      return;
    }
    if (seat.id === 0) {
      return;
    }
    if (this.deletedSeats.includes(seat)) {
      return;
    }
    if (this.hall.id === 0) {
      return;
    }
    this.deletedSeats.push(seat);
    delete this.seatsLayout[seat.row][seat.index];
  }

  private fetchHall(id: number): void {
    this.hallService.getHall(this.cinemaId, id)
      .subscribe(
        (hall: HallModel) => {
          this.hall = hall;
          this.fetchSeatsLayout();
        }
      );
  }

  private fetchSeatsLayout(): void {
    const [x, y] = this.calcSizeOfHall();
    this.numberOfSeats = this.hall.seats.length;
    for (let i = 0; i <= x; i++) {
      this.seatsLayout[i] = [];
      this.seatsLayout[i].length = y;
    }
    for (const seat of this.hall.seats) {
      this.seatsLayout[seat.row][seat.index] = seat;
    }
  }

  private fetchCinemaName(): void {
    this.cinemaService.getCinema(this.cinemaId)
      .subscribe(
        (cinema: CinemaModel) => {
          this.cinemaName = cinema.name;
        }
      );
  }
}
