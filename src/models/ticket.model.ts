import { ShowtimeModel } from '@models/showtime.model';
import { UserModel } from '@models/user.model';
import { AdditionModel } from '@models/addition.model';
import { SeatModel } from '@models/seat.model';
import { Nullable } from '@tools/utilityTypes';

export interface TicketModel {
  id: number,
  showtime: ShowtimeModel,
  user: Nullable<UserModel>,
  seats: SeatModel[],
  dateOfBooking: Date,
  additions: AdditionModel[]
}
