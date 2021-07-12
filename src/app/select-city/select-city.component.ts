import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.css']
})
export class SelectCityComponent implements OnInit {
  options: string[] = ['Minsk', 'Bobruisk'];

  constructor(
    public dialogRef: MatDialogRef<SelectCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit() {
  }
}
