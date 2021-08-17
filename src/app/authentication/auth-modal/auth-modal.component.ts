import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.less']
})
export class AuthModalComponent {
  constructor(public dialogRef: MatDialogRef<AuthModalComponent>) {
  }

  onCloseRequest(event: boolean): void {
    this.dialogRef.close(event);
  }
}
