import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
  //styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user_name = "";
  showOptn: boolean = false;
  showAppDash: boolean = false;
  constructor(
    private router: Router,
    private adm: LoginService,
    private auth: AuthService
  ) {
    this.user_name = localStorage.getItem("username");
    this.adm.check_user_log();
  }

  ngOnInit() {
    this.auth.ischeck_session();
    this.adm.getUserName().subscribe(data => {
      this.user_name = data;
    });
    if (localStorage.getItem("role") !== "Appathon") {
      this.showOptn = true;
    }
    if (localStorage.getItem("role") === "Both") {
      this.showAppDash = true;
    }
  }

  //  Fuction for Logout
  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    sessionStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("jwt")
    this.router.navigate(["/index"]);
  }

  scroll_view(id) {
    this.router.navigate(["index"]);
    setTimeout(function() {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }, 10);
  }
}
