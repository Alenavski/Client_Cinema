import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CinemaComponent } from './cinema.component';

const components = [
  CinemaComponent
];

@NgModule({
  declarations: [
    ...components
  ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatExpansionModule
    ],
  exports: [
    ...components
  ]
})
export class CinemaModule { }
