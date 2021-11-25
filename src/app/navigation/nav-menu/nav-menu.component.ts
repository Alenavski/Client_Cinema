import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthModalComponent } from '@app/authentication/auth-modal/auth-modal.component';
import { AdminWindowComponent } from '@app/navigation/admin-window/admin-window.component';
import { Roles } from '@models/constants/roles';
import { ShowtimesFilterModel } from '@models/showtimes-filter.model';
import { FilterService } from '@service/filter.service';
import { UserService } from '@service/user.service';
import { SelectCityComponent } from '../select-city/select-city.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less']
})
export class NavMenuComponent {
  location = 'Minsk';

  constructor(
    public dialogCity: MatDialog,
    public dialogAuth: MatDialog,
    private readonly router: Router,
    private readonly filterService: FilterService,
    private readonly userService: UserService
  ) {
    const filter: ShowtimesFilterModel = { city: this.location };
    this.filterService.updateFilter(filter);
  }

  public get isAuthed(): boolean {
    return !!UserService.getUserModel();
  }

  openDialogCity(): void {
    const dialogRef = this.dialogCity.open(SelectCityComponent, {
      width: '250px',
      data: this.location
    });
    dialogRef.afterClosed()
      .subscribe(
        (result: string) => {
          this.location = result;
          const filter: ShowtimesFilterModel = { city: this.location };
          this.filterService.updateFilter(filter);
        }
      );
  }

  openDialogAuth(): void {
    this.dialogAuth.open(AuthModalComponent, {
      width: '450px'
    });
  }

  get isAdmin(): boolean {
    const userModel = UserService.getUserModel();
    return userModel?.role === Roles.Admin;
  }

  openDialogAdmin(): void {
    this.dialogAuth.open(AdminWindowComponent, {
      width: '500px',
    });
  }

  openHistory(): void {
    const user = UserService.getUserModel();
    void this.router.navigate([`user/${user?.id}/tickets`]);
  }

  logout(): void {
    this.userService.logout();
  }
}
