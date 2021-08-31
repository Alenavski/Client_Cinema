import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { DaysOfWeek } from '@models/days-of-week';
import { Months } from '@models/months';
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
    this.dates.push(this.currentDay);
    for (let i = 0; i < dayCount; i++) {
      this.dates.push(this.getTomorrow(this.dates[this.dates.length - 1]));
    }
    const filter: ShowtimesFilterModel = { date: this.selectedDay.toDateString() };

    this.filterService.updateFilter(filter);
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d ?? new Date());
    return day >= new Date(this.currentDay.getTime() - msecsInDay);
  };

  public displayMonth(indexOfMonth: number): string {
    return Months[indexOfMonth];
  }

  public displayDayOfWeek(indexOfDay: number): string {
    return DaysOfWeek[indexOfDay];
  }

  public needToDisplayMonth(day: Date): boolean {
    return day.getDate() === 1 || day === this.dates[0];
  }

  public onDateClick(selectedDate: Date): void {
    this.selectedDay = selectedDate;
    this.setDates(this.selectedDay);
    const filter: ShowtimesFilterModel = { date: this.selectedDay.toDateString() };

    this.filterService.updateFilter(filter);
  }

  public onBackArrowClick(): void {
    this.selectedDay = this.currentDay;
    this.setDates(this.currentDay);
    const filter: ShowtimesFilterModel = { date: this.selectedDay.toDateString() };

    this.filterService.updateFilter(filter);
  }

  public onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDay = event.value ?? this.currentDay;
    this.setDates(this.selectedDay);
    const filter: ShowtimesFilterModel = { date: this.selectedDay.toDateString() };

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
