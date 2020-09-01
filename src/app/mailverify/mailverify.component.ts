import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ToasterService, Toast } from 'angular2-toaster';
@Component({
  selector: "app-mailverify",
  templateUrl: "./mailverify.component.html"
  //styleUrls: ['./mailverify.component.css']
})
export class MailverifyComponent implements OnInit {
  user_name: string;
  showOptn: boolean = false;
  showAppDash: boolean = false;

  constructor(
    private HttpClient: HttpClient,
    private adm: LoginService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toasterService: ToasterService,
    private auth: AuthService
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
  }
  // Change Password
  Mail_verify() {
    try {
      var json = {
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token")
      };
      this.adm.verify_mail(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
      },
      err => {
        console.log('err', err);
     //this.router.navigate(['error']);
        this.toastrmsg('error',"Something went wrong. Please try again in some time.");
      },);
    } catch { }
  }
  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    sessionStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("jwt")
    //alert('a');
    this.adm.sendUserId("");

    this.adm.LogoutPortal().subscribe(
      res => {
        this.router.navigate(["/index"]);
      },
      err => {
        this.router.navigate(["/index"]);
      }
    );
  }

  scroll_view(id) {
    this.router.navigate(["index"]);
    setTimeout(function () {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }, 10);
  }
  toastrmsg(type ,title) {
    var toast: Toast = {
      type: type,
      title:"",
      body:title,
      showCloseButton: true 
    }; 
    this.toasterService.pop(toast);
  }
}
