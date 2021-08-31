import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthenticationModule } from './authentication/authentication.module';
import { HomeModule } from './home/home.module';
import { NavigationModule } from './navigation/navigation.module';

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
    AuthenticationModule,
    HomeModule,
    NavigationModule,
    MatSnackBarModule
  ],
  providers: [
    UserService,
    ShowtimeService,
    SnackBarService,
    FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
