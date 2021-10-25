import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SearchFilmComponent } from './search-film/search-film.component';
import { SelectCityComponent } from './select-city/select-city.component';
import { AdminWindowComponent } from './admin-window/admin-window.component';

const components = [
  NavMenuComponent,
  SelectCityComponent,
  SearchFilmComponent,
  AdminWindowComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [
    ...components
  ],
})
export class NavigationModule { }
