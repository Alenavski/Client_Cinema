import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  @Output() closeRequest = new EventEmitter<boolean>();
  authForm = new FormGroup({
    email: new FormControl('', [
      // eslint-disable-next-line @typescript-eslint/unbound-method
      Validators.required,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      Validators.email
    ]),
    password: new FormControl('', [
      // eslint-disable-next-line @typescript-eslint/unbound-method
      Validators.required,
      Validators.minLength(8)
    ])
  });

  onCloseClick(): void {
    this.closeRequest.emit();
  }

  onSignInClick(): void {
    this.closeRequest.emit(true);
  }
}
