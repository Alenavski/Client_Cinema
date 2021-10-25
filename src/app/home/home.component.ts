import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieModel } from '@models/movie.model';
import { ShowtimesFilterModel } from '@models/showtimes-filter.model';

import { FilterService } from '@service/filter.service';
import { ShowtimeService } from '@service/showtime.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  movies: Array<MovieModel> = [];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly filterService: FilterService,
    private readonly showtimeService: ShowtimeService
  ) {
  }

  public ngOnInit(): void {
    this.filterService.onFilterChange(filter => {
      void this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: filter
        });
    });

    this.filterService.onFilterChange(filter => {
      this.setShowtimes(filter);
    });

    this.filterService.filterForShowtimes = Object.assign(this.filterService.filterForShowtimes, this.activatedRoute.snapshot.queryParams);
    this.setShowtimes(this.filterService.filterForShowtimes);
  }

  public ngOnDestroy(): void {
    this.filterService.removeFilterChangeTracking();
  }

  private setShowtimes(filter: ShowtimesFilterModel): void {
    this.showtimeService.getShowtimes(filter).subscribe(movies => {
      this.movies = movies;
    });
  }
}
