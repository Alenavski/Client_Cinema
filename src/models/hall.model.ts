import { SeatModel } from '@models/seat.model';
import { HallAdditionModel } from '@models/hall-addition.model';

export interface HallModel {
  id: number,
  name: string,
  seats: SeatModel[],
  additions?: HallAdditionModel[]
}
