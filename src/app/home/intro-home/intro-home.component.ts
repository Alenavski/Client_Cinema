import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterService } from '@service/filter.service';

@Component({
  selector: 'app-intro-home',
  templateUrl: './intro-home.component.html',
  styleUrls: ['./intro-home.component.less']
})
export class IntroHomeComponent {
  @Output() filterChanged: EventEmitter<void> = new EventEmitter<void>();

  introForm = new FormGroup({
    cinema: new FormControl(''),
    film: new FormControl('')
  });

  constructor(private readonly filterService: FilterService) {
  }

  onSearchClick(): void {
    this.saveCinema();
    this.saveMovie();
    this.filterChanged.emit();
  }

  private saveCinema(): void {
    this.filterService.setCinema(this.introForm.get('cinema')?.value);
  }

  private saveMovie(): void {
    this.filterService.setMovie(this.introForm.get('film')?.value);
  }
}

