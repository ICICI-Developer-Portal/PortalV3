import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { LoginService } from "src/app/services";

const MINUTES_UNITL_AUTO_LOGOUT = 10// in mins
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY = 'lastAction';
@Injectable()
export class AutoLogoutService {

  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router,
    private adm: LoginService) {
    console.log('object created');
    this.check();
    this.initListener();
    this.initInterval();
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout) {
      //localStorage.clear();
      if(localStorage.getItem("autoLogout") !== "true"){
        localStorage.setItem("autoLogout","true");
        this.logout();
      }
      
    }
  }
  logout() {

  
    this.adm.logout().subscribe(
      res => {
        console.log("logout success");
        this.resetUserData();
        this.router.navigate(['/index']).then(() => {
          window.location.reload();
        });
      },
      err => {
        console.log("logout failure");
        this.resetUserData();
        this.router.navigate(['/index']).then(() => {
          window.location.reload();
        });
      }
    );
   // this.router.navigate(["/index"]);
  }
  resetUserData(){
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("jwt");
    localStorage.removeItem('lastLoginDate');
    localStorage.removeItem('misUserVal');
    localStorage.removeItem('Firstname');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isInternalUser');
    localStorage.clear();
    this.adm.sendUserId("");
  }
}