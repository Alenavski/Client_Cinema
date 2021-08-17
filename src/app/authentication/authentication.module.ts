import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { SignInComponent } from './auth-modal/sign-in/sign-in.component';
import { SignUpComponent } from './auth-modal/sign-up/sign-up.component';

const components = [
  AuthModalComponent,
  SignInComponent,
  SignUpComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule
  ],
  exports: [
    ...components
  ]
})
export class AuthenticationModule { }
