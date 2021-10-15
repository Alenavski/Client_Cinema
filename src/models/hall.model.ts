import { SeatModel } from '@models/seat.model';
import { ServiceModel } from '@models/service.model';

export interface HallModel {
  id: number,
  name: string,
  seats: SeatModel[],
  services?: ServiceModel[]
}
