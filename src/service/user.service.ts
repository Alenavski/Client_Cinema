import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthModel } from '../models/auth.model';
import { GetRole } from '../models/roles';
import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';
import { ServiceTools } from './serviceTools';

@Injectable()
export class UserService {
  private readonly hostURL: string = 'https://localhost:5001/user/';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBar: MatSnackBar
  ) {
  }

  register(email: string, password: string): Observable<AuthModel> {
    const messageSwitcher = (error: HttpErrorResponse) => {
      switch (error.status) {
        case 500:
          return 'Server error occurred';
        case 400:
          return error.error.message;
      }
    };

    const errorHandler = ServiceTools.ErrorHandlerFactory(messageSwitcher, this.snackBar);

    const observable = this.httpClient.post<AuthModel>(this.hostURL + 'register', { Email: email, Password: password })
      .pipe(
        catchError(errorHandler)
      );
    observable.subscribe(
      ((authModel: AuthModel | null) => {
        if (authModel) {
          localStorage.setItem('token', authModel.token);
        }
      })
    );
    return observable;
  }

  login(email: string, password: string): Observable<AuthModel> {
    const messageSwitcher = (error: HttpErrorResponse) => {
      switch (error.status) {
        case 500:
          return 'Server error occurred';
        case 401:
          return error.error.message;
        case 400:
          return 'Invalid data';
      }
    };

    const errorHandler = ServiceTools.ErrorHandlerFactory(messageSwitcher, this.snackBar);

    const observable = this.httpClient.post<AuthModel>(this.hostURL + 'login', { Email: email, Password: password })
      .pipe(
        catchError(errorHandler)
      );
    observable.subscribe(
      ((authModel: AuthModel | null) => {
        if (authModel) {
          localStorage.setItem('token', authModel.token);
        }
      })
    );
    return observable;
  }

  getUserModel(): UserModel {
    const decoded: TokenModel = jwt_decode(localStorage.getItem('token')!);
    return {
      token : localStorage.getItem('token')!,
      id : Number(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid']),
      role : GetRole(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    };
  }
}

