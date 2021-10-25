import { HallModel } from '@models/hall.model';
import { TicketPriceModel } from '@models/ticket-price.model';
import { ShowtimeAdditionModel } from '@models/showtime-addition.model';

export interface ShowtimeModel {
  id: number,
  time: string,
  numberOfFreeSeats: number,
  hall: HallModel,
  additions?: ShowtimeAdditionModel[],
  prices: TicketPriceModel[]
}
