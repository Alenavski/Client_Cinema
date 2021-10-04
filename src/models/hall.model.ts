import { SeatModel } from '@models/seat.model';

export interface HallModel {
  id: number,
  name: string,
  seats?: SeatModel[]
}
