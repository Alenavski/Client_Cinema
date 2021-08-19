import { Component } from '@angular/core';

@Component({
  selector: 'app-selecting-panel',
  templateUrl: './selecting-panel.component.html',
  styleUrls: ['./selecting-panel.component.less']
})
export class SelectingPanelComponent {
  timeFrom: string;
  timeTo: string = '';
  numberOfFreeSeats: number = 1;

  constructor() {
    const from = new Date();
    this.timeFrom = from.getHours().toString() + ':00';
  }
}
