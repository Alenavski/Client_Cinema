import { Component } from '@angular/core';
import { AdditionModel } from '@models/addition.model';
import { SEAT_TYPES } from '@models/constants/seat-types';
import { SeatTypeModel } from '@models/seat-type.model';
import { ShowtimeModel } from '@models/showtime.model';
import { TicketModel } from '@models/ticket.model';
import { TicketService } from '@service/ticket.service';
import { Nullable } from '@tools/utilityTypes';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.less']
})
export class TicketHistoryComponent {
  seatTypes = SEAT_TYPES;

  tickets: Nullable<TicketModel[]> = null;
  filteredTickets: Nullable<TicketModel[]> = [];

  constructor(private readonly ticketService: TicketService) {
    ticketService.getTickets().subscribe(
      (tickets: TicketModel[]) => {
        this.tickets = tickets;
        this.filteredTickets = this.tickets;
      }
    );
  }

  public getPrice(seatType: SeatTypeModel, showtime: ShowtimeModel): number {
    const ticketPrice = showtime.prices.find(seatPrice => seatPrice.seatType.id === seatType.id);
    if (ticketPrice) {
      return ticketPrice.price;
    }
    return 0;
  }

  public getAdditionPrice(addition: AdditionModel, showtime: ShowtimeModel): number {
    const hallAddition = showtime.hall.additions?.find(ha => ha.addition.id === addition.id);
    if (hallAddition) {
      return hallAddition.price;
    }
    return 0;
  }

}
