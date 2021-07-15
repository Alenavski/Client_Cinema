import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.css']
})
export class SelectCityComponent {
  options: string[] = ['Minsk', 'Bobruisk'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string) {}
}
