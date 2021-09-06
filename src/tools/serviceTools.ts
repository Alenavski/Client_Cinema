import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { SnackBarService } from '@service/snack-bar.service';
import { Nullable } from '@tools/utilityTypes';

export function  ErrorHandlerFactory(
  snackBarService: SnackBarService
) {
  return (httpErrorResponse: HttpErrorResponse) => {
    const message: Nullable<string> = httpErrorResponse.error.message;
    if (message) {
      snackBarService.showMessage(message);
    }
    if (!environment.production) {
      return throwError(httpErrorResponse);
    }
    return throwError(message);
  };
}
