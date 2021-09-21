import { Component, OnInit } from '@angular/core';
import { CinemaModel } from '@models/cinema.model';
import { HallModel } from '@models/hall.model';
import { SeatModel } from '@models/seat.model';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.less']
})
export class HallComponent implements OnInit {
  seats: SeatModel[] = [
    { id: 1, index: 3, row: 1, numberInRow: 1 },
    { id: 2, index: 4, row: 1, numberInRow: 2 },
    { id: 3, index: 2, row: 2, numberInRow: 1 },
    { id: 4, index: 3, row: 2, numberInRow: 2 },
    { id: 5, index: 4, row: 2, numberInRow: 3 },
    { id: 6, index: 5, row: 2, numberInRow: 4 },
    { id: 7, index: 1, row: 3, numberInRow: 1 },
    { id: 8, index: 2, row: 3, numberInRow: 2 },
    { id: 9, index: 3, row: 3, numberInRow: 3 },
    { id: 10, index: 4, row: 3, numberInRow: 4 },
    { id: 11, index: 5, row: 3, numberInRow: 5 },
    { id: 12, index: 6, row: 3, numberInRow: 6 },
    { id: 13, index: 1, row: 5, numberInRow: 1 },
    { id: 14, index: 2, row: 5, numberInRow: 2 },
    { id: 15, index: 5, row: 5, numberInRow: 3 },
    { id: 16, index: 6, row: 5, numberInRow: 4 }
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
  size: number [] = this.calcSizeOfHall();

  seatsLayout: SeatModel[][] = [];

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
