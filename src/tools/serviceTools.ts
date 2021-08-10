import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { SnackBarService } from '../service/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceTools {
  constructor(
    private readonly snackBarService: SnackBarService
  ) {
  }

  ErrorHandlerFactory(messageSwitcher: (error: HttpErrorResponse) => string | null) {
    return (error: HttpErrorResponse) => {
      const message: string | null = messageSwitcher(error);
      if (message !== null) {
        this.snackBarService.showMessage(message);
        if (!environment.production) {
          return throwError(error);
        }
        return throwError(message);
      }
      else {
        this.snackBarService.showMessage('Something is wrong. Please, try later');
        if (!environment.production) {
          return throwError(error);
        }
        return throwError('Something is wrong. Please, try later');
      }
    };
  }
}
