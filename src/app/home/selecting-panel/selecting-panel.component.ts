import { Component, EventEmitter, Output } from '@angular/core';
import { FilterService } from '@service/filter.service';

@Component({
  selector: 'app-selecting-panel',
  templateUrl: './selecting-panel.component.html',
  styleUrls: ['./selecting-panel.component.less']
})
export class SelectingPanelComponent {
  @Output() filterChanged: EventEmitter<void> = new EventEmitter<void>();

  timeFrom: string;
  timeTo: string = '';
  numberOfFreeSeats: number = 1;

  constructor(private readonly filterService: FilterService) {
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
    this.filterService.setStartTime(this.timeFrom);
  }

  private saveEndTime(): void {
    this.filterService.setEndTime(this.timeTo);
  }

  private saveNumberOfFreeSeats(): void {
    this.filterService.setNumberOfFreeSeats(this.numberOfFreeSeats);
  }
}
