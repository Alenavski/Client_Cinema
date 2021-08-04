import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';

export class ServiceTools {
  static ErrorHandlerFactory(messageSwitcher: (error: HttpErrorResponse) => string | null, snackBar: MatSnackBar) {
    return (error: HttpErrorResponse) => {
      const message: string | null = messageSwitcher(error);
      if (message !== null) {
        const bar = snackBar.open(message, 'Close');
        bar._dismissAfter(3 * 1000);
        if (!environment.production) {
          return throwError(error);
        }
        return throwError(message);
      }
      else {
        const bar = snackBar.open('Something is wrong. Please, try later', 'Close');
        bar._dismissAfter(3 * 1000);
        if (!environment.production) {
          return throwError(error);
        }
        return throwError('Something is wrong. Please, try later');
      }
    };
  }
}
