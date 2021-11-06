import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { CinemaService } from '@service/cinema.service';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.less']
})
export class SelectCityComponent implements OnInit {
  cities$!: Observable<string[]>;

  private readonly searchTerms = new Subject<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private readonly cinemaService: CinemaService
  ) {}

  ngOnInit(): void {
    this.cities$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.cinemaService.getCitiesByTerm(term))
    );
  }

  public search(term: string): void {
    this.searchTerms.next(term);
  }
}

