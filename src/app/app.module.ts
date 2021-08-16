import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthenticationModule } from './authentication/authentication.module';
import { HomeModule } from './home/home.module';
import { NavigationModule } from './navigation/navigation.module';

import { SnackBarService } from '../service/snack-bar.service';
import { UserService } from '../service/user.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]),
    HttpClientModule,
    AuthenticationModule,
    HomeModule,
    NavigationModule,
    MatSnackBarModule
  ],
  providers: [
    UserService,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
