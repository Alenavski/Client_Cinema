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
    if (this.filterService.filterForShowtimes) {
      this.filter = Object.assign(this.filter, this.filterService.filterForShowtimes);
    }
    else {
      this.filter.startTime = moment().format('hh:mm');
      this.filter.numberOfFreeSeats = 1;
      this.filterService.updateFilter(this.filter);
    }
  }

  onFilterChange(): void {
    this.filterService.updateFilter(this.filter);
  }
}
