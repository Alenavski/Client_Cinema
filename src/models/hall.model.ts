import { SeatModel } from '@models/seat.model';
import { AdditionModel } from '@models/addition.model';

export interface HallModel {
  id: number,
  name: string,
  seats: SeatModel[],
  services?: AdditionModel[]
}
