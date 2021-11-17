import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import * as moment from 'moment';

import { AdditionModel } from '@models/addition.model';
import { SeatTypeModel } from '@models/seat-type.model';
import { ShowtimeModel } from '@models/showtime.model';
import { TicketMovieModel } from '@models/ticket-movie.model';
import { TicketModel } from '@models/ticket.model';
import { SEAT_TYPES } from '@models/constants/seat-types';

import { TicketService } from '@service/ticket.service';

import { Nullable } from '@tools/utilityTypes';

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

  private static isPastTicket(ticket: TicketModel): boolean {
    const curDate = new Date();
    const ticketDate = new Date(ticket.dateOfShowtime);
    if (curDate.getUTCFullYear() > ticketDate.getUTCFullYear()) {
      return true;
    }
    if (curDate.getUTCMonth() > ticketDate.getUTCMonth()) {
      return true;
    }
    return curDate.getUTCDate() > ticketDate.getUTCDate();
  }

  public ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (tickets: TicketModel[]) => {
        this.ticketService.getTicketMovies().subscribe(
          (ticketMovies: TicketMovieModel[]) => {
            tickets.forEach((ticket: TicketModel) => {
              ticket.movie = ticketMovies.find((tm) => tm.ticket.id == ticket.id)?.movie;
            });
            this.tickets = tickets;
            this.filteredTickets = this.tickets;
          }
        );
      }
    );
  }

  public fetchFilteredTickets(event: MatSlideToggleChange): void {
    if (event.checked && this.tickets) {
      this.filteredTickets = this.tickets.filter(t => !TicketHistoryComponent.isPastTicket(t));
    } else {
      this.filteredTickets = this.tickets;
    }
  }

  public getDateString(date: Date): string {
    return moment(date).format('DD/MM/YYYY').toString();
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
