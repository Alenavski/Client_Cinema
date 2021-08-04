import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthModel } from '../../../models/auth.model';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UserService]
})
export class SignInComponent {
  @Output() closeRequest = new EventEmitter<boolean>();
  authForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(
    private readonly userService: UserService
  ) {
  }

  onCloseClick(): void {
    this.closeRequest.emit();
  }

  onSignInClick(): void {
    this.userService.login(this.authForm.get('email')?.value, this.authForm.get('password')?.value)
      .subscribe((authModel: AuthModel | null) => {
        if (authModel) {
          this.closeRequest.emit(true);
        }
    });
  }
}
