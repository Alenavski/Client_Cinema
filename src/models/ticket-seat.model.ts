import { SeatModel } from '@models/seat.model';

export interface TicketSeatModel {
  seat: SeatModel,
  isOrdered: boolean
}
