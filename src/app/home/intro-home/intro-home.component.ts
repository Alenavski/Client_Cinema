import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-intro-home',
  templateUrl: './intro-home.component.html',
  styleUrls: ['./intro-home.component.less']
})
export class IntroHomeComponent {
  @Output() filterChanged = new EventEmitter();

  introForm = new FormGroup({
    cinema: new FormControl(''),
    film: new FormControl('')
  });

  onSearchClick(): void {
    this.saveCinema();
    this.saveMovie();
    this.filterChanged.emit();
  }

  private saveCinema(): void {
    localStorage.setItem('cinemaName', this.introForm.get('cinema')?.value);
  }

  private saveMovie(): void {
    localStorage.setItem('movieTitle', this.introForm.get('film')?.value);
  }
}

