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

const StatusMatches: { [id: number]: string; } = {
  400: 'Request is invalid.',
  401: 'Token is invalid. Re-login, please.',
  403: 'Access forbidden.',
  404: 'Information not found.',
  500: 'Internal error. Try again later.'
};

export function ErrorHandlerFactory(
  snackBarService: SnackBarService
) {
  return (httpErrorResponse: HttpErrorResponse) => {
    let message: Nullable<string> = httpErrorResponse.error.message;
    if (!message) {
      message = httpErrorResponse.error.title;
    }
    if (message) {
      snackBarService.showMessage(message);
    }
    else {
      snackBarService.showMessage(StatusMatches[httpErrorResponse.status] ?? 'Unknown error.');
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
