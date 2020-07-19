import { Component, OnInit } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
// import { AdvertisementComponent } from "./advertisement.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
  //styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "ICICI";
  modalRef: BsModalRef;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    // var url = this.router.url;
    // if (url !== "/index/termsandcondition") {
    //   const dialogRef = this.dialog.open(AdvertisementComponent, {
    //     height: "600px",
    //     width: "600px",
    //     disableClose: true,
    //     panelClass: "custom-modalbox"
    //   });
    // }
  }
}
