import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@service/user.service';
import { confirmValidator } from '@tools/form-validation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent {
  @Output() closeRequest = new EventEmitter<boolean>();
  regForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl('')
  });

  constructor(
    private readonly userService: UserService
  ) {
    this.regForm.get('confirmPassword')?.setValidators([
      confirmValidator(this.regForm.get('password'))
    ]);
    this.regForm.get('password')?.valueChanges.subscribe(() => {
      this.regForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  onSignUpClick(): void {
    const isSignedUp = this.userService.register(this.regForm.get('email')?.value, this.regForm.get('password')?.value);
    if (isSignedUp) {
      this.closeRequest.emit(true);
    }
  }
}
