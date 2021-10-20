import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { MovieComponent } from './movie.component';
import { ShowtimeComponent } from './showtime/showtime.component';
import { MatSelectModule } from '@angular/material/select';

const components = [
  MovieComponent,
  ShowtimeComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  exports: [
    ...components
  ]
})
export class MovieModule { }
