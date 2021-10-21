import { HallModel } from '@models/hall.model';

export interface ShowtimeModel {
  id: number,
  time: string,
  numberOfFreeSeats: number,
  hall: HallModel
}
