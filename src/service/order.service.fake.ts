import { Injectable } from '@angular/core';
import { HallModel } from '@models/hall.model';
import { SeatModel } from '@models/seat.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderServiceFake {
  getReservedSeats(hall: HallModel): Observable<SeatModel[]> {
    const reserved = hall.seats.filter(() => Math.random() > 0.8);
    return of(reserved);
  }
}
