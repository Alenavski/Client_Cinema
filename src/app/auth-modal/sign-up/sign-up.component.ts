import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function confirmValidator(matchingForm: AbstractControl | null): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isEqual = matchingForm?.value === control.value;
    const errors: ValidationErrors = {
      confirmError: control
    };
    return isEqual ? null : errors;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  @Output() closeRequest = new EventEmitter<boolean>();
  regForm = new FormGroup({
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
    ]),
    confirmPassword: new FormControl('')
  });

  constructor() {
    this.regForm.get('confirmPassword')?.setValidators([
      // eslint-disable-next-line @typescript-eslint/unbound-method
      Validators.required,
      confirmValidator(this.regForm.get('password'))]);
  }

  onSignUpClick(): void {
    this.closeRequest.emit(true);
  }
}
