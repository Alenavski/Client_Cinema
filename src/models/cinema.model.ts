import { HallModel } from '@models/hall.model';

export interface CinemaModel {
  id?: number,
  name: string,
  city: string,
  address: string,
  image?: Uint8Array,
  halls?: HallModel[]
}
