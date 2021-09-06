import { Component } from '@angular/core';
import { CinemaModel } from '@models/cinema.model';

const cinema: CinemaModel = {
  id: 1,
  name: 'Mir',
  city: 'Minsk',
  address: 'Kozlova 4a',
};

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.less']
})
export class CinemaComponent {
  public get Cinema(): CinemaModel {
    return cinema;
  }
}
