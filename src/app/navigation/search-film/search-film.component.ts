import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { CinemaModel } from '@models/cinema.model';
import { MovieModel } from '@models/movie.model';
import { ShowtimesFilterModel } from '@models/showtimes-filter.model';

import { CinemaService } from '@service/cinema.service';
import { MovieService } from '@service/movie.service';
import { FilterService } from '@service/filter.service';

@Component({
  selector: 'app-search-film',
  templateUrl: './search-film.component.html',
  styleUrls: ['./search-film.component.less']
})
export class SearchFilmComponent implements OnInit {
  searchFieldExpanded: boolean = false;

  movies$!: Observable<MovieModel[]>;
  cinemas$!: Observable<CinemaModel[]>;

  private readonly searchTerms = new Subject<string>();

  constructor(
    private readonly movieService: MovieService,
    private readonly cinemaService: CinemaService,
    private readonly filterService: FilterService
  ) {
  }

  ngOnInit(): void {
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

  public updateMovieTitle(movieTitle: string): void {
    const filter: ShowtimesFilterModel = { movieTitle: movieTitle };
    this.filterService.updateFilter(filter);
  }

  public updateCinemaName(cinemaName: string): void {
    const filter: ShowtimesFilterModel = { cinemaName: cinemaName };
    this.filterService.updateFilter(filter);
  }
}
