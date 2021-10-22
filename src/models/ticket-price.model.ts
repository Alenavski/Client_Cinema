import { SeatTypeModel } from '@models/seat-type.model';

export interface TicketPriceModel {
  seatType: SeatTypeModel,
  price: number
}
