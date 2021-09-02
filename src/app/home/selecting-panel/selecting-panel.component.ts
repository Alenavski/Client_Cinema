import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { FilterService } from '@service/filter.service';

import { ShowtimesFilterModel } from '@models/showtimes-filter.model';

@Component({
  selector: 'app-selecting-panel',
  templateUrl: './selecting-panel.component.html',
  styleUrls: ['./selecting-panel.component.less']
})
export class SelectingPanelComponent implements OnInit {
  filter: ShowtimesFilterModel = {};

  constructor(
    private readonly filterService: FilterService
  ) {
  }

  ngOnInit(): void {
    if (this.filterService.filterForShowtimes.startTime
      || this.filterService.filterForShowtimes.endTime
      || this.filterService.filterForShowtimes.numberOfFreeSeats
    ) {
      this.filter = Object.assign(this.filter, this.filterService.filterForShowtimes);
    } else {
      this.filter.startTime = moment().format('HH:mm');
      this.filter.numberOfFreeSeats = 1;
    }
  }

  onFilterChange(): void {
    this.filterService.updateFilter(this.filter);
  }
}
