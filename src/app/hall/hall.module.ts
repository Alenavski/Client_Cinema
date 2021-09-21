import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { HallComponent } from './hall.component';

const components = [
  HallComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule
  ],
  exports: [
    ...components
  ]
})
export class HallModule { }
