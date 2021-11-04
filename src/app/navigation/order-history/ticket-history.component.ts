import { Component, OnInit } from '@angular/core';
import { AdditionModel } from '@models/addition.model';
import { SEAT_TYPES } from '@models/constants/seat-types';
import { SeatTypeModel } from '@models/seat-type.model';
import { ShowtimeModel } from '@models/showtime.model';
import { TicketModel } from '@models/ticket.model';
import { TicketService } from '@service/ticket.service';
import { Nullable } from '@tools/utilityTypes';
import * as moment from 'moment';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.less']
})
export class TicketHistoryComponent implements OnInit{
  seatTypes = SEAT_TYPES;

  tickets: Nullable<TicketModel[]> = null;
  filteredTickets: Nullable<TicketModel[]> = [];

  constructor(
    private readonly ticketService: TicketService
  ) {
  }

  public ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (tickets: TicketModel[]) => {
        this.tickets = tickets;
        this.filteredTickets = this.tickets;
      }
    );
  }

  public fetchFilteredTickets(event: MatSlideToggleChange): void {
    if (event.checked && this.tickets) {
      this.filteredTickets = this.tickets.filter(t => !this.isPastTicket(t));
    } else {
      this.filteredTickets = this.tickets;
    }
  }

  private isPastTicket(ticket: TicketModel): boolean {
    const curDate = new Date();
    const ticketDate = new Date(ticket.dateOfShowtime);
    if (curDate.getFullYear() > ticketDate.getFullYear()) {
      return true;
    }
    if (curDate.getMonth() > ticketDate.getMonth()) {
      return true;
    }
    return curDate.getDay() > ticketDate.getDay();
  }

  public getDateString(date: Date): string {
    return moment(date).format('DD/MM/YYYY');
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
