import { SeatTypeModel } from '@models/seat-type.model';

export interface SeatModel {
  id?: number,
  index: number,
  row: number,
  type: SeatTypeModel,
  numberInRow: number
}
