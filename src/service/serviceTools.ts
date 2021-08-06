import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';

export class ServiceTools {
  static ErrorHandlerFactory(messageSwitcher: (error: HttpErrorResponse) => string | null, snackBar: MatSnackBar) {
    return (error: HttpErrorResponse) => {
      const message: string | null = messageSwitcher(error);
      if (message !== null) {
        snackBar.open(message, 'Close');
        if (!environment.production) {
          return throwError(error);
        }
        return throwError(message);
      }
      else {
        snackBar.open('Something is wrong. Please, try later', 'Close');
        if (!environment.production) {
          return throwError(error);
        }
        return throwError('Something is wrong. Please, try later');
      }
    };
  }
}
