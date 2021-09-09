import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CinemaModel } from '@models/cinema.model';
import { HallModel } from '@models/hall.model';

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

  constructor() {
    this.cinema = {
      id: 1,
      name: 'Mir',
      city: 'Minsk',
      address: 'Kozlova 4a'
    };
    this.hall1 = {
      id: 1,
      name: 'Big',
      cinema: this.cinema
    };
    this.hall2 = {
      id: 2,
      name: 'Small',
      cinema: this.cinema
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

  toggle(element: HTMLElement): void {
    if (element.classList.contains('expanded')) {
      element.classList.remove('expanded');
    }
    else {
      element.classList.add('expanded');
    }
  }
}
