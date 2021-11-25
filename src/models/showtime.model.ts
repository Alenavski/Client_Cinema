import { HallModel } from '@models/hall.model';
import { TicketPriceModel } from '@models/ticket-price.model';
import { AdditionModel } from '@models/addition.model';

export interface ShowtimeModel {
  id: number,
  time: string,
  hall: HallModel,
  additions?: AdditionModel[],
  prices: TicketPriceModel[]
}
