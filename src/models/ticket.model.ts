import { ShowtimeModel } from '@models/showtime.model';
import { TicketAdditionModel } from '@models/ticket-addition.model';
import { UserModel } from '@models/user.model';
import { Nullable } from '@tools/utilityTypes';
import { TicketSeatModel } from '@models/ticket-seat.model';
import { MovieModel } from '@models/movie.model';

export interface TicketModel {
  id: number,
  showtime: ShowtimeModel,
  user: Nullable<UserModel>,
  ticketsSeats?: TicketSeatModel[],
  dateOfBooking: Date,
  dateOfShowtime: Date,
  ticketsAdditions?: TicketAdditionModel[],
  movie?: Nullable<MovieModel>
}
