import { Component } from '@angular/core';

@Component({
  selector: 'app-search-film',
  templateUrl: './search-film.component.html',
  styleUrls: ['./search-film.component.less']
})
export class SearchFilmComponent {
  searchFieldExpanded: boolean = false;
  randomFilms: string[] = ['Interstellar', 'Inception', 'Prestige'];
}
