import { Time } from '@angular/common';
import { HallModel } from '@models/hall.model';

export interface ShowtimeModel {
  id: number,
  time: Time,
  numberOfFreeSeats: number,
  hall: HallModel
}
