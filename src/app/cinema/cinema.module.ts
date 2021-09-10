import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CinemaComponent } from './cinema.component';

const components = [
  CinemaComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...components
  ]
})
export class CinemaModule { }
