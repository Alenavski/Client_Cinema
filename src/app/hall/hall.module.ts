import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HallComponent } from './hall.component';

const components = [
  HallComponent
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
export class HallModule { }
