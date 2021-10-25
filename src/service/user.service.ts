import jwt_decode from 'jwt-decode';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';

import { AuthModel } from '@models/auth.model';
import { TokenModel } from '@models/token.model';
import { UserModel } from '@models/user.model';

import { ErrorHandlerFactory } from '@tools/serviceTools';
import { SnackBarService } from './snack-bar.service';

import { Nullable } from '@tools/utilityTypes';

const enum Token {
  role = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
  email = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
  id = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService
  ) {
  }

  public static getUserModel(): Nullable<UserModel> {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    const decoded: TokenModel = jwt_decode(token);
    return {
      token: token,
      id: Number(decoded[Token.id]),
      role: decoded[Token.role]
    };
  }

  private static saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private static getToken(): Nullable<string> {
    return localStorage.getItem('token');
  }

  private static deleteToken(): void {
    localStorage.removeItem('token');
  }

  public register(email: string, password: string): Observable<AuthModel> {
    const errorHandler = ErrorHandlerFactory(this.snackBarService);

    const observable = this.httpClient.post<AuthModel>(environment.hostURL + 'user/register', { Email: email, Password: password })
      .pipe(
        catchError(errorHandler)
      );

      observable.subscribe(
        (authModel: AuthModel) => {
          UserService.saveToken(authModel.token);
        }
      );

    return observable;
  }

  public login(email: string, password: string): Observable<AuthModel> {
    const errorHandler = ErrorHandlerFactory(this.snackBarService);

    const observable = this.httpClient.post<AuthModel>(environment.hostURL + 'user/login', { Email: email, Password: password })
      .pipe(
        catchError(errorHandler)
      );

      observable.subscribe(
        (authModel: AuthModel) => {
          UserService.saveToken(authModel.token);
        }
      );

    return observable;
  }

  public logout(): void {
    UserService.deleteToken();
  }
}
