import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: './error.component.html',
  selector: 'app-error',
})
export class ErrorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialog: MatDialog,
   private http: HttpClient, private router: Router
  ) {}
  close() {
    this.router.navigate(["/"]);
    this.dialog.closeAll();
  }
}
