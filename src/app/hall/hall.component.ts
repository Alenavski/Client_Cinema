import { Component, OnInit } from '@angular/core';
import { CinemaModel } from '@models/cinema.model';
import { HallModel } from '@models/hall.model';
import { SeatTypeModel } from '@models/seat-type.model';
import { SeatModel } from '@models/seat.model';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.less']
})
export class HallComponent implements OnInit {
  seatTypes: SeatTypeModel[] = [
    { id: 1, name: 'standard' },
    { id: 2, name: 'comfort' },
    { id: 3, name: 'sofa' }
  ];

  seats: SeatModel[] = [
    { id: 1, index: 3, row: 1, numberInRow: 1, type :this.seatTypes[0] },
    { id: 2, index: 4, row: 1, numberInRow: 2, type :this.seatTypes[0] },
    { id: 3, index: 2, row: 2, numberInRow: 1, type :this.seatTypes[0] },
    { id: 4, index: 3, row: 2, numberInRow: 2, type :this.seatTypes[0] },
    { id: 5, index: 4, row: 2, numberInRow: 3, type :this.seatTypes[0] },
    { id: 6, index: 5, row: 2, numberInRow: 4, type :this.seatTypes[0] },
    { id: 7, index: 1, row: 3, numberInRow: 1, type :this.seatTypes[1] },
    { id: 8, index: 2, row: 3, numberInRow: 2, type :this.seatTypes[1] },
    { id: 9, index: 3, row: 3, numberInRow: 3, type :this.seatTypes[1] },
    { id: 10, index: 4, row: 3, numberInRow: 4, type :this.seatTypes[1] },
    { id: 11, index: 5, row: 3, numberInRow: 5, type :this.seatTypes[1] },
    { id: 12, index: 6, row: 3, numberInRow: 6, type :this.seatTypes[1] },
    { id: 13, index: 1, row: 5, numberInRow: 1, type :this.seatTypes[2] },
    { id: 15, index: 5, row: 5, numberInRow: 2, type :this.seatTypes[2] },
  ];
  cinema: CinemaModel = {
    id: 1,
    name: 'Mir',
    city: 'Minsk',
    address: 'chikpu'
  };
  hall: HallModel = {
    id: 1,
    name: 'Blue',
    cinema: this.cinema,
    seats: this.seats
  };
  numberOfSeats: number;
  size: number [] = this.calcSizeOfHall();

  seatsLayout: SeatModel[][] = [];

  constructor() {
    this.numberOfSeats = this.hall.seats.length;
  }

  ngOnInit(): void {
    const [x] = this.calcSizeOfHall();
    for (let i = 0; i <= x; i++) {
      this.seatsLayout[i] = [];
    }
    for (const seat of this.hall.seats) {
      this.seatsLayout[seat.row][seat.index] = seat;
    }
  }

  public calcSizeOfHall(): number[] {
    let maxSeats = 0;
    let maxRows = 0;
    for (const seat of this.hall.seats) {
      maxSeats = Math.max(maxSeats, seat.numberInRow);
      maxRows = Math.max(maxRows, seat.row);
    }
    return [ maxRows, maxSeats ];
  }
}
