import { HallModel } from '@models/hall.model';
import { AdditionModel } from '@models/addition.model';

export interface ShowtimeAdditionModel {
  hall: HallModel,
  addition: AdditionModel
}
