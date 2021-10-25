import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Roles } from '@models/constants/roles';
import { UserService } from '@service/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private readonly router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userModel = UserService.getUserModel();
    if (userModel?.role === Roles.Admin) {
      return true;
    }
    else {
      void this.router.navigate(['']);
      return false;
    }
  }

}
