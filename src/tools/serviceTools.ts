import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { SnackBarService } from '@service/snack-bar.service';
import { Nullable } from '@tools/utilityTypes';
import { UserService } from '@service/user.service';

interface Options {
  headers: HttpHeaders,
  params?: HttpParams,
  body?: any
}

export function ErrorHandlerFactory(
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

export function getHttpOptionsWithAuthorizationHeader(
  params?: HttpParams,
  body?: any
): Options {
  const userModel = UserService.getUserModel();
  return {
    headers: new HttpHeaders({
      Authorization: `Bearer ${userModel?.token}`
    }),
    params: params,
    body: body
  };
}
