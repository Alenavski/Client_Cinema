import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TicketHistoryComponent } from './ticket-history.component';

const components = [
  TicketHistoryComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatExpansionModule
  ],
  exports: [
    ...components
  ]
})
export class TicketHistoryModule { }
