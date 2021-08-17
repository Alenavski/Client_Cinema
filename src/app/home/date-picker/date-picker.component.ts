import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

const dayCount: number = 30;

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less']
})
export class DatePickerComponent implements OnInit {
  dates: Date[] = [];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
  currentDay: Date;
  selectedDay: Date;

  constructor() {
    this.currentDay = new Date();
    this.selectedDay = this.currentDay;
  }

  ngOnInit(): void {
    this.dates.push(this.currentDay);
    for (let i = 0; i < dayCount; i++) {
      this.dates.push(this.getTomorrow(this.dates[this.dates.length - 1]));
    }
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d ?? new Date());
    return day >= new Date(this.currentDay.getTime() - 24 * 60 * 60 * 1000);
  };

  public onDateClick(selectedDate: Date): void {
    this.selectedDay = selectedDate;
    this.setDates(this.selectedDay);
  }

  public onBackArrowClick(): void {
    this.selectedDay = this.currentDay;
    this.setDates(this.currentDay);
  }

  public onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDay = event.value!;
    this.setDates(this.selectedDay);
  }

  private getTomorrow(today: Date): Date {
    return new Date(today.getTime() + (24 * 60 * 60 * 1000));
  }

  private setDates(firstDay: Date): void {
    this.dates = [];
    this.dates.push(firstDay);
    for (let i = 0; i < dayCount; i++) {
      this.dates.push(this.getTomorrow(this.dates[this.dates.length - 1]));
    }
  }
}
