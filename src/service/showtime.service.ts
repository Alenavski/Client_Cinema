import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShowtimeModel } from '@models/showtime.model';
import { SnackBarService } from '@service/snack-bar.service';
import { ErrorHandlerFactory } from '@tools/serviceTools';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService
  ) {
  }

  public getShowtimes(): Observable<ShowtimeModel[]> {
    const errorHandler = ErrorHandlerFactory(this.snackBarService);
    const params = decodeURI(location.search);
    console.log(params);
    return this.httpClient.get<ShowtimeModel[]>(environment.hostURL + 'showtimes' + params)
      .pipe(
        catchError(errorHandler)
      );
  }
}
