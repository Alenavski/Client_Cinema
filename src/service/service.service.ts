import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ServiceModel } from '@models/service.model';

import { SnackBarService } from '@service/snack-bar.service';

import { ErrorHandlerFactory } from '@tools/serviceTools';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  errorHandler;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService
  ) {
    this.errorHandler = ErrorHandlerFactory(this.snackBarService);
  }

  public getServices(): Observable<ServiceModel[]> {
    return this.httpClient.get<ServiceModel[]>(`${environment.hostURL}services`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public getServicesOfHall(hallId: number): Observable<ServiceModel[]> {
    return this.httpClient.get<ServiceModel[]>(`${environment.hostURL}services/halls/${hallId}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public addService(service: ServiceModel): Observable<number> {
    return this.httpClient.post<number>(`${environment.hostURL}services`, service)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public addServiceToHall(hallId: number, service: ServiceModel): Observable<void> {
    return this.httpClient.post<void>(`${environment.hostURL}services/halls/${hallId}`, service)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public deleteService(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.hostURL}services/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public deleteServiceFromHall(hallId: number, serviceId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.hostURL}/services/${serviceId}/halls/${hallId}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
