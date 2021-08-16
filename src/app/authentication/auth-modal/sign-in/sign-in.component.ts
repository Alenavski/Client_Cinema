import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent {
  @Output() closeRequest = new EventEmitter<boolean>();
  authForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(
    private readonly userService: UserService
  ) {
  }

  onCloseClick(): void {
    this.closeRequest.emit();
  }

  onSignInClick(): void {
    const isSignedIn = this.userService.login(this.authForm.get('email')?.value, this.authForm.get('password')?.value);
    if (isSignedIn) {
      this.closeRequest.emit(true);
    }
  }
}
