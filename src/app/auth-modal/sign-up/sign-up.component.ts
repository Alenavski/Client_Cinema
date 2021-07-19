import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmValidator } from '../../../tools/form-validation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
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

  constructor() {
    this.regForm.get('confirmPassword')?.setValidators([
      Validators.required,
      confirmValidator(this.regForm.get('password'))]);
  }

  onSignUpClick(): void {
    this.closeRequest.emit(true);
  }
}
