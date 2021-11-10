import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'advertisement',
  templateUrl: './advertisement.component.html',
})
export class AdvertisementComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AdvertisementComponent>,
    private router: Router,
  ) {}

  ngOnInit() {}
  modalRefClose() {
    this.dialogRef.close();
  }
  modalRefImgClick() {
    this.router.navigate(['/appathon/landing-page']);
    this.dialogRef.close();
  }
}
