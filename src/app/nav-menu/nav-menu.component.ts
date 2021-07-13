import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectCityComponent } from '../select-city/select-city.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  isAuthed = false;
  location = 'Minsk';

  constructor(public dialog: MatDialog) {
  }

  collapse(): void {
    this.isExpanded = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectCityComponent, {
      width: '250px',
      data: this.location
    });
    dialogRef.afterClosed().subscribe(result => {
      this.location = result;
    });
  }

  onSignInClick(): void {
    this.isAuthed = true;
  }
}
