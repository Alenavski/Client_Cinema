import { Time } from '@angular/common';

export interface ShowtimesFilterModel {
  cinemaName: string,
  movieTitle: string,
  city: string,
  date: Date,
  startTime: Time,
  endTime: Time,
  numberOfFreeSeats: number
}
