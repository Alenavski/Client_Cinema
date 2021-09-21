import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CinemaModel } from '@models/cinema.model';
import { HallModel } from '@models/hall.model';
import { SeatTypeModel } from '@models/seat-type.model';
import { SeatModel } from '@models/seat.model';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.less']
})
export class CinemaComponent {
  cinemaForm: FormGroup;

  hall1: HallModel;
  hall2: HallModel;
  cinema: CinemaModel;

  allCinemas: CinemaModel[];

  constructor(
    public router: Router
  ) {
    const seatTypes: SeatTypeModel[] = [
      { id: 1, name: 'standard' },
      { id: 2, name: 'comfort' },
      { id: 3, name: 'sofa' }
    ];

    const seats: SeatModel[] = [
      { id: 1, index: 3, row: 1, numberInRow: 1, type :seatTypes[0] },
      { id: 2, index: 4, row: 1, numberInRow: 2, type :seatTypes[0] },
      { id: 3, index: 2, row: 2, numberInRow: 1, type :seatTypes[0] },
      { id: 4, index: 3, row: 2, numberInRow: 2, type :seatTypes[0] },
      { id: 5, index: 4, row: 2, numberInRow: 3, type :seatTypes[0] },
      { id: 6, index: 5, row: 2, numberInRow: 4, type :seatTypes[0] },
      { id: 7, index: 1, row: 3, numberInRow: 1, type :seatTypes[0] },
      { id: 8, index: 2, row: 3, numberInRow: 2, type :seatTypes[0] },
      { id: 9, index: 3, row: 3, numberInRow: 3, type :seatTypes[0] },
      { id: 10, index: 4, row: 3, numberInRow: 4, type :seatTypes[0] },
      { id: 11, index: 5, row: 3, numberInRow: 5, type :seatTypes[0] },
      { id: 12, index: 6, row: 3, numberInRow: 6, type :seatTypes[0] },
      { id: 13, index: 1, row: 5, numberInRow: 1, type :seatTypes[0] },
      { id: 14, index: 2, row: 5, numberInRow: 2, type :seatTypes[0] },
      { id: 15, index: 5, row: 5, numberInRow: 3, type :seatTypes[0] },
      { id: 16, index: 6, row: 5, numberInRow: 4, type :seatTypes[0] },
    ];
    this.cinema = {
      id: 1,
      name: 'Mir',
      city: 'Minsk',
      address: 'Kozlova 4a'
    };
    this.hall1 = {
      id: 1,
      name: 'Big',
      cinema: this.cinema,
      seats: seats
    };
    this.hall2 = {
      id: 2,
      name: 'Small',
      cinema: this.cinema,
      seats: seats
    };
    this.cinema.halls = [ this.hall1, this.hall2 ];

    this.cinemaForm = new FormGroup({
      name: new FormControl(this.cinema.name, [
        Validators.required
      ]),
      city: new FormControl(this.cinema.city, [
        Validators.required
      ]),
      address: new FormControl(this.cinema.address, [
        Validators.required,
        Validators.minLength(3)
      ])
    });

    this.allCinemas = [ this.cinema, this.cinema ];
  }
}
