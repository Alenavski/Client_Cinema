import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-intro-home',
  templateUrl: './intro-home.component.html',
  styleUrls: ['./intro-home.component.css']
})
export class IntroHomeComponent {
  introForm = new FormGroup({
    cinema: new FormControl(''),
    film: new FormControl('')
  });

  onSearchClick(): void {

  }
}

