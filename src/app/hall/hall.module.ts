import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
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
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule
  ],
  exports: [
    ...components
  ]
})
export class HallModule { }
