import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SelectCityComponent} from '../select-city/select-city.component';

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

  collapse() {
    this.isExpanded = false;
  }

  openDialog() {
    const dialogRef = this.dialog.open(SelectCityComponent, {
      width: '250px',
      data: this.location
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.location = result;
    });
  }

  signInClick() {
    this.isAuthed = true;
  }

  signOutClick() {
    this.isAuthed = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
