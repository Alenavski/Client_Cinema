import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ShowtimesFilterModel } from '@models/showtimes-filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public filterForShowtimes: ShowtimesFilterModel = {};
  private readonly filterSubject = new Subject<ShowtimesFilterModel>();

  public updateFilter(filterChanges: ShowtimesFilterModel): void {
    this.filterForShowtimes = Object.assign(this.filterForShowtimes, filterChanges);

    this.filterSubject.next(this.filterForShowtimes);
  }

  public onFilterChange(action: ((_: ShowtimesFilterModel) => void)): void {
    this.filterSubject.subscribe(value => action(value));
  }

  public removeFilterChangeTracking(): void {
    this.filterSubject.complete();
  }
}
