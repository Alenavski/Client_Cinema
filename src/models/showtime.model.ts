import { Time } from '@angular/common';
import { HallModel } from '@models/hall.model';
import { MovieModel } from '@models/movie.model';

export interface ShowtimeModel {
  id: number,
  time: Time,
  numberOfFreeSeats: number,
  hall: HallModel,
  movie: MovieModel
}
