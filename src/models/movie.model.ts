import { ShowtimeModel } from '@models/showtime.model';

export interface MovieModel {
  id: number,
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
  poster?: Uint8Array,
  showtimes?: ShowtimeModel[]
}
