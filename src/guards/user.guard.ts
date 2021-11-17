import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthModalComponent } from '@app/authentication/auth-modal/auth-modal.component';
import { Roles } from '@models/constants/roles';
import { SnackBarService } from '@service/snack-bar.service';
import { UserService } from '@service/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly snackBarService: SnackBarService,
  public dialogAuth: MatDialog
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean | UrlTree {
    const userModel = UserService.getUserModel();
    if (userModel?.role === Roles.User) {
      return true;
    }
    else {
      this.snackBarService.showMessage('Please, authorize to make order');
      this.openDialogAuth();
      return this.router.parseUrl('');
    }
  }

  private openDialogAuth(): void {
    const dialogRef = this.dialogAuth.open(AuthModalComponent, {
      width: '450px'
    });
    dialogRef.afterClosed()
      .subscribe(
        () => {
        }
      );
  }
}
