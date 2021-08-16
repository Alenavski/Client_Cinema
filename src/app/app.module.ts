import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { SnackBarService } from '../service/snack-bar.service';
import { UserService } from '../service/user.service';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth-modal/sign-in/sign-in.component';
import { IntroHomeComponent } from './home/intro-home/intro-home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SearchFilmComponent } from './search-film/search-film.component';
import { SelectCityComponent } from './select-city/select-city.component';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { SignUpComponent } from './auth-modal/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SearchFilmComponent,
    SelectCityComponent,
    AuthModalComponent,
    SignInComponent,
    SignUpComponent,
    IntroHomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatOptionModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    UserService,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
