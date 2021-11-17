import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CinemaModel } from '@models/cinema.model';
import { MovieModel } from '@models/movie.model';

import { ShowtimesFilterModel } from '@models/showtimes-filter.model';
import { CinemaService } from '@service/cinema.service';

import { FilterService } from '@service/filter.service';
import { MovieService } from '@service/movie.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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

  movies$!: Observable<MovieModel[]>;
  cinemas$!: Observable<CinemaModel[]>;

  private readonly searchTerms = new Subject<string>();

  constructor(
    private readonly movieService: MovieService,
    private readonly cinemaService: CinemaService,
    private readonly filterService: FilterService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.introForm.get('cinema')?.setValue(this.filterService.filterForShowtimes.cinemaName);
    this.introForm.get('film')?.setValue(this.filterService.filterForShowtimes.movieTitle);
    this.movies$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.getMoviesByTerm(term))
    );
    this.cinemas$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.cinemaService.getCinemasByTerm(term))
    );
  }

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  public onSearchClick(): void {
    const filter = this.getFormValues();

    this.filterService.updateFilter(filter);
    void this.router.navigate([], { fragment: 'pick-date' });
  }

  private getFormValues(): ShowtimesFilterModel {
    return {
      cinemaName: this.introForm.get('cinema')?.value as string,
      movieTitle: this.introForm.get('film')?.value as string
    };
  }
}
