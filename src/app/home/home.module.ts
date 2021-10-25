import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from '@app/app-routing.module';

import { HomeComponent } from './home.component';
import { IntroHomeComponent } from './intro-home/intro-home.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { SelectingPanelComponent } from './selecting-panel/selecting-panel.component';
import { ShowtimesSliderComponent } from './showtimes-slider/showtimes-slider.component';

const components = [
  HomeComponent,
  IntroHomeComponent,
  DatePickerComponent,
  SelectingPanelComponent,
  ShowtimesSliderComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    ...components
  ]
})
export class HomeModule { }
