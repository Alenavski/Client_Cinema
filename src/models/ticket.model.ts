import { ShowtimeModel } from '@models/showtime.model';
import { UserModel } from '@models/user.model';
import { AdditionModel } from '@models/addition.model';
import { Nullable } from '@tools/utilityTypes';
import { TicketSeatModel } from '@models/ticket-seat.model';

export interface TicketModel {
  id: number,
  showtime: ShowtimeModel,
  user: Nullable<UserModel>,
  ticketSeats?: TicketSeatModel[],
  dateOfBooking: Date,
  additions?: AdditionModel[]
}
