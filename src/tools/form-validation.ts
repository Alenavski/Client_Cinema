import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Nullable } from '@tools/utilityTypes';

export function confirmValidator(matchingForm: Nullable<AbstractControl>): ValidatorFn {
  return (control: AbstractControl): Nullable<ValidationErrors> => {
    const isEqual = matchingForm?.value === control.value;
    const errors: ValidationErrors = {
      confirmError: control
    };
    return isEqual ? null : errors;
  };
}
