import { Component, OnInit } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
// import { AdvertisementComponent } from "./advertisement.component";
import { Router } from "@angular/router";
import { LoginService } from "./services";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
  //styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "ICICI";
  modalRef: BsModalRef;

  constructor(public dialog: MatDialog, private router: Router,
    private adm: LoginService,
    private httpClient: HttpClient) {}

  ngOnInit() {

    this.adm.getSalt().subscribe((data: any) => {
      
      this.adm.sendSalt(data._body);
    },
    err => {
      console.log('err', err);
    });
    
   /*  this.adm.getDrupalProduct().subscribe((data: any) => {
      console.log(data);
      console.log(data._body);
    },
    err => {
      console.log('err', err);
    }); */
    /*   let context = this;
      window.addEventListener("beforeunload", function (e) {
          let currentUser = localStorage.getItem('username');
          if(currentUser){
              context.logout();
          }
      }); */
  
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
  logout() {

    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("jwt")
    localStorage.removeItem('lastLoginDate');
    localStorage.removeItem('misUserVal');
    localStorage.removeItem('Firstname');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isInternalUser');
    localStorage.removeItem('email');
    localStorage.removeItem("userEnteredText");

    localStorage.removeItem("appathonFirstName");
    localStorage.removeItem("appathonCompanyEmail");
    localStorage.removeItem("appathonMobileNumber");
    localStorage.removeItem("appathonCompanyName");
    localStorage.removeItem("appathonUserName");
    localStorage.removeItem('appathonusername');
    localStorage.removeItem('mobileNo');
    localStorage.removeItem('companyName');

    this.adm.sendUserId("");
    this.adm.logout().subscribe(
      res => {
        console.log("logout success")
        this.router.navigate(['/index']).then(() => {
          window.location.reload();
        });
      },
      err => {
        console.log("logout failed")
        this.router.navigate(['/index']).then(() => {
          window.location.reload();
        });
      }
    );
  }
}
