import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieModel } from '@models/movie.model';
import { Roles } from '@models/constants/roles';
import { ShowtimesFilterModel } from '@models/showtimes-filter.model';

import { FilterService } from '@service/filter.service';
import { ShowtimeService } from '@service/showtime.service';
import { UserService } from '@service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  movies: Array<MovieModel> = [];

  public get needToDisplayAdminForm(): boolean {
    return this.isAdmin();
  }

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly filterService: FilterService,
    private readonly showtimeService: ShowtimeService,
    private readonly userService: UserService
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

  private isAdmin(): boolean {
    const user = this.userService.getUserModel();
    if (user) {
      return user.role === Roles.Admin;
    }
    return false;
  }

  private setShowtimes(filter: ShowtimesFilterModel): void {
    this.showtimeService.getShowtimes(filter).subscribe(movies => {
      this.movies = movies;
    });
  }
}
