import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';

import { MovieComponent } from './movie.component';
import { ShowtimeComponent } from './showtime/showtime.component';

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
        FormsModule,
        MatExpansionModule
    ],
  exports: [
    ...components
  ]
})
export class MovieModule { }
