import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { ShowtimesFilterModel } from '@models/showtimes-filter.model';

import { FilterService } from '@service/filter.service';

const dayCount: number = 30;
const msecsInDay: number = 86400000;

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less']
})
export class DatePickerComponent implements OnInit {
  dates: Date[] = [];
  currentDay: Date;
  selectedDay: Date;

  constructor(
    private readonly filterService: FilterService
  ) {
    this.currentDay = new Date();
    this.selectedDay = this.currentDay;
  }

  ngOnInit(): void {
    if (this.filterService.filterForShowtimes.date) {
      this.selectedDay = new Date(this.filterService.filterForShowtimes.date);
    }
    this.dates.push(this.selectedDay);
    for (let i = 0; i < dayCount; i++) {
      this.dates.push(this.getTomorrow(this.dates[this.dates.length - 1]));
    }
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d ?? new Date());
    return day >= new Date(this.currentDay.getTime() - msecsInDay);
  };

  public displayMonth(date: Date): string {
    return moment(date).format('MMMM');
  }

  public displayDayOfWeek(date: Date): string {
    return moment(date).format('ddd');
  }

  public needToDisplayMonth(day: Date): boolean {
    return day.getDate() === 1 || day === this.dates[0];
  }

  public onDateClick(selectedDate: Date): void {
    this.selectedDay = selectedDate;
    this.updateDates(this.selectedDay);
  }

  public onBackArrowClick(): void {
    this.selectedDay = this.currentDay;
    this.updateDates(this.currentDay);
  }

  public onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDay = event.value ?? this.currentDay;
    this.updateDates(this.selectedDay);
  }

  private updateDates(date: Date): void {
    this.setDates(date);

    const filter: ShowtimesFilterModel = { date: date.toDateString() };
    this.filterService.updateFilter(filter);
  }

  private getTomorrow(today: Date): Date {
    return new Date(today.getTime() + msecsInDay);
  }

  private setDates(firstDay: Date): void {
    this.dates = [];
    this.dates.push(firstDay);
    for (let i = 0; i < dayCount; i++) {
      this.dates.push(this.getTomorrow(this.dates[this.dates.length - 1]));
    }
  }
}
