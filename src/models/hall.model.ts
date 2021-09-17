import { CinemaModel } from '@models/cinema.model';
import { SeatModel } from '@models/seat.model';

export interface HallModel {
  id: number,
  name: string,
  cinema: CinemaModel,
  seats: SeatModel[]
}
