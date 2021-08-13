import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(
    private readonly snackBar: MatSnackBar
  ) {
  }

  public showMessage(message: string): void {
    this.snackBar.open(message, 'Close');
  }
}
