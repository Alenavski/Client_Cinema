import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AuthModel } from '../models/auth.model';
import { GetRole } from '../models/roles';
import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';
import { ServiceTools } from '../tools/serviceTools';

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
    private readonly serviceTools: ServiceTools
  ) {
  }

  register(email: string, password: string): boolean {
    const messageSwitcher = (error: HttpErrorResponse) => {
      switch (error.status) {
        case 500:
          return 'Server error occurred';
        case 400:
          return error.error.message;
      }
    };

    const errorHandler = this.serviceTools.ErrorHandlerFactory(messageSwitcher);

    let status: boolean = false;
    this.httpClient.post<AuthModel>(environment.hostURL + 'user/register', { Email: email, Password: password })
      .pipe(
        catchError(errorHandler)
      )
      .subscribe(
        (authModel: AuthModel) => {
          status = true;
          this.saveToken(authModel.token);
        }
      );
    return status;
  }

  login(email: string, password: string): boolean {
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

    const errorHandler = this.serviceTools.ErrorHandlerFactory(messageSwitcher);

    let status: boolean = false;
    this.httpClient.post<AuthModel>(environment.hostURL + 'user/login', { Email: email, Password: password })
      .pipe(
        catchError(errorHandler)
      )
      .subscribe(
        (authModel: AuthModel) => {
          this.saveToken(authModel.token);
          status = true;
        }
      );
    return status;
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private getToken(): string {
    return localStorage.getItem('token')!;
  }

  public getUserModel(): UserModel {
    const decoded: TokenModel = jwt_decode(this.getToken());
    return {
      token : localStorage.getItem('token')!,
      id : Number(decoded[Token.id]),
      role : GetRole(decoded[Token.role])
    };
  }
}
