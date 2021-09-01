import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilterService } from '@service/filter.service';

import { ShowtimesFilterModel } from '@models/showtimes-filter.model';

@Component({
  selector: 'app-selecting-panel',
  templateUrl: './selecting-panel.component.html',
  styleUrls: ['./selecting-panel.component.less']
})
export class SelectingPanelComponent implements OnInit {
  readonly filter: ShowtimesFilterModel = {};

  constructor(
    private readonly filterService: FilterService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    const from = new Date();
    this.filter.startTime = from.getHours().toString() + ':00';
    this.filter.numberOfFreeSeats = 1;

    this.filterService.updateFilter(this.filter);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        let needToUpdate = false;
        if (params.startTime) {
          this.filter.startTime = params.startTime as string;
          needToUpdate = true;
        }
        if (params.endTime) {
          this.filter.endTime = params.endTime as string;
          needToUpdate = true;
        }
        if (params.numberOfFreeSeats) {
          this.filter.numberOfFreeSeats = params.numberOfFreeSeats as number;
          needToUpdate = true;
        }
        if (needToUpdate) {
          this.filterService.updateFilter(this.filter);
        }
      }
    );
  }

  onFilterChange(): void {
    this.filterService.updateFilter(this.filter);
  }
}
