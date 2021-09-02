import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ShowtimesFilterModel } from '@models/showtimes-filter.model';

import { FilterService } from '@service/filter.service';

@Component({
  selector: 'app-intro-home',
  templateUrl: './intro-home.component.html',
  styleUrls: ['./intro-home.component.less']
})
export class IntroHomeComponent implements OnInit {
  introForm = new FormGroup({
    cinema: new FormControl(null),
    film: new FormControl(null)
  });

  constructor(
    private readonly filterService: FilterService
  ) {
  }

  ngOnInit(): void {
    this.introForm.get('cinema')?.setValue(this.filterService.filterForShowtimes.cinemaName);
    this.introForm.get('film')?.setValue(this.filterService.filterForShowtimes.movieTitle);
  }

  public onSearchClick(): void {
    const filter = this.getFormValues();

    this.filterService.updateFilter(filter);
  }

  private getFormValues(): ShowtimesFilterModel {
    return {
      cinemaName: this.introForm.get('cinema')?.value as string,
      movieTitle: this.introForm.get('film')?.value as string
    };
  }
}
