import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-selecting-panel',
  templateUrl: './selecting-panel.component.html',
  styleUrls: ['./selecting-panel.component.less']
})
export class SelectingPanelComponent {
  @Output() filterChanged = new EventEmitter();

  timeFrom: string;
  timeTo: string = '';
  numberOfFreeSeats: number = 1;

  constructor() {
    const from = new Date();
    this.timeFrom = from.getHours().toString() + ':00';
    this.saveStartTime();
  }

  onTimeFromChange(): void {
    this.saveStartTime();
    this.filterChanged.emit();
  }

  onTimeToChange(): void {
    this.saveEndTime();
    this.filterChanged.emit();
  }

  onFreeSeatsChange(): void {
    this.saveNumberOfFreeSeats();
    this.filterChanged.emit();
  }

  private saveStartTime(): void {
    localStorage.setItem('startTime', this.timeFrom);
  }

  private saveEndTime(): void {
    localStorage.setItem('endTime', this.timeTo);
  }

  private saveNumberOfFreeSeats(): void {
    localStorage.setItem('numberOfFreeSeats', this.numberOfFreeSeats.toString());
  }
}
