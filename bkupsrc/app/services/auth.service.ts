import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged_in: boolean;
  showbtn: boolean;
  user_name:any ="";
    constructor(private router:Router, private adm:LoginService){  }
  _userActionOccured: Subject<void> = new Subject();
  get userActionOccured(): Observable<void> { return this._userActionOccured.asObservable() };

  notifyUserAction() {
    this._userActionOccured.next();
  }

  loginUser() {
    
  }

  logOutUser(){
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    //alert('a');
    this.adm.sendUserId('');
    this.adm.LogoutPortal()
        .subscribe(
         (res) => { 
           this.router.navigate(['/index']);
         },
         (err) => {
           this.router.navigate(['/index']);
         }
       );
       this.router.navigate(["/index"]);
  }
  ischeck_session(){
   // if(!localStorage.getItem("username")){      
    //  this.logOutUser();
   // }
   // else{

   // }

  }
  
}