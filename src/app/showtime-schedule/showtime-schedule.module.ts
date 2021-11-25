import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { ShowtimeScheduleComponent } from './showtime-schedule.component';

const components = [
  ShowtimeScheduleComponent
];


@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatChipsModule,
    RouterModule
  ],
  exports: [
    ...components
  ]
})
export class ShowtimeScheduleModule { }
