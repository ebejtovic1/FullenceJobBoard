import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './error.component.html',
  selector: 'app-error',
})
export class ErrorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialog: MatDialog
  ) {}
  close() {
    this.dialog.closeAll();
  }
}
