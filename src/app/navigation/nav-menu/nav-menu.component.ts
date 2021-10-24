import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowtimesFilterModel } from '@models/showtimes-filter.model';
import { FilterService } from '@service/filter.service';
import { SelectCityComponent } from '../select-city/select-city.component';
import { AuthModalComponent } from '@app/authentication/auth-modal/auth-modal.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less']
})
export class NavMenuComponent {
  isAuthed = false;
  location = 'Minsk';

  constructor(
    public dialogCity: MatDialog,
    public dialogAuth: MatDialog,
    private readonly filterService: FilterService
  ) {
    const filter: ShowtimesFilterModel = { city: this.location };
    this.filterService.updateFilter(filter);
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
    const dialogRef = this.dialogAuth.open(AuthModalComponent, {
      width: '450px'
    });
    dialogRef.afterClosed()
      .subscribe(
        (result: boolean) => {
          this.isAuthed = result;
        }
      );
  }
}
