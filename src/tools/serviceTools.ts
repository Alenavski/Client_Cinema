import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { SnackBarService } from '../service/snack-bar.service';

export function  ErrorHandlerFactory(
  snackBarService: SnackBarService
) {
  return (httpErrorResponse: HttpErrorResponse) => {
    const message: string | null = httpErrorResponse.error.message;
    if (message) {
      snackBarService.showMessage(message);
    }
    if (!environment.production) {
      return throwError(httpErrorResponse);
    }
    return throwError(message);
  };
}
