import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmValidator(matchingForm: AbstractControl | null): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isEqual = matchingForm?.value === control.value;
    const errors: ValidationErrors = {
      confirmError: control
    };
    return isEqual ? null : errors;
  };
}
