import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Roles } from '@models/constants/roles';
import { UserService } from '@service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private readonly router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const userModel = UserService.getUserModel();
    if (userModel?.role === Roles.Admin) {
      return true;
    }
    else {
      return this.router.parseUrl('');
    }
  }
}
