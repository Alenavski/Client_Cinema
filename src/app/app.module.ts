import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CinemaService } from '@service/cinema.service';
import { HallService } from '@service/hall.service';
import { MovieService } from '@service/movie.service';
import { SeatService } from '@service/seat.service';

import { AuthenticationModule } from './authentication/authentication.module';
import { HomeModule } from './home/home.module';
import { NavigationModule } from './navigation/navigation.module';
import { CinemaModule } from '@app/cinema/cinema.module';
import { HallModule } from '@app/hall/hall.module';

import { SnackBarService } from '@service/snack-bar.service';
import { UserService } from '@service/user.service';
import { ShowtimeService } from '@service/showtime.service';
import { FilterService } from '@service/filter.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    AuthenticationModule,
    HomeModule,
    NavigationModule,
    CinemaModule,
    HallModule
  ],
  providers: [
    UserService,
    ShowtimeService,
    CinemaService,
    HallService,
    MovieService,
    SeatService,
    SnackBarService,
    FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
