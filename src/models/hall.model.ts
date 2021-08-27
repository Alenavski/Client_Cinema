import { CinemaModel } from '@models/cinema.model';

export interface HallModel {
  id: number,
  name: string,
  cinema: CinemaModel
}
