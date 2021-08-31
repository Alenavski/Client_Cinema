import { Component } from '@angular/core';

import { FilterService } from '@service/filter.service';

import { ShowtimesFilterModel } from '@models/showtimes-filter.model';

@Component({
  selector: 'app-selecting-panel',
  templateUrl: './selecting-panel.component.html',
  styleUrls: ['./selecting-panel.component.less']
})
export class SelectingPanelComponent {
  readonly filter: ShowtimesFilterModel = {};

  constructor(
    private readonly filterService: FilterService
  ) {
    const from = new Date();
    this.filter.startTime = from.getHours().toString() + ':00';
    this.filter.numberOfFreeSeats = 1;

    this.filterService.updateFilter(this.filter);
  }

  onFilterChange(): void {
    this.filterService.updateFilter(this.filter);
  }
}
