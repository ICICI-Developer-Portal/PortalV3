import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services";
import { AuthService } from "src/app/services/auth.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { SigninModalComponent } from "../../../LandingPage/home/common-modal/signin-modal.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html"
  //styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged_in: Boolean = false;
  user_name = "";
  showbtn: boolean = false;

  id: any;
  showOptn: boolean = false;
  showAppDash: boolean = false;
  constructor(
    private router: Router,
    private adm: LoginService,
    private auth: AuthService,
    public dialog: MatDialog
  ) {
    this.user_name = localStorage.getItem("username");
  }

  ngOnInit() {
    if (localStorage.getItem("role") !== "Appathon") {
      this.showOptn = true;
    }
    if (localStorage.getItem("role") === "Both") {
      this.showAppDash = true;
    }

    this.getId();
    this.id = setInterval(() => {
      this.getId();
    }, 1000);

    this.auth.ischeck_session();
    this.adm.getUserId().subscribe(data => {
      this.logged_in =
        data != "" && data != null && data != undefined ? true : false;
    });
    this.adm.getUserName().subscribe(data => {
      this.user_name = data;
    });
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  getId() {
    if (localStorage.getItem("id")) {
      this.showbtn = false;
    } else {
      this.showbtn = true;
    }
  }
  //  Fuction for Logout
  logout() {
    localStorage.removeItem("username");
    sessionStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("jwt")
    this.adm.sendUserId("");

    this.adm.LogoutPortal().subscribe(
      res => {
        this.router.navigate(["/index"]);
      },
      err => {
        this.router.navigate(["/index"]);
      }
    );
    this.router.navigate(["/index"]);
  }

  scroll_view(id) {
    this.router.navigate(["index"]);
    setTimeout(function() {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }, 10);
  }

  openModal() {
    const dialogRef = this.dialog.open(SigninModalComponent, {
      disableClose: true
    });
  }

  documentation() {
    this.router.navigate(["/documentation"]);
  }
}
