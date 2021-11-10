import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToasterService, Toast } from 'angular2-toaster';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DatePipe]
})
export class LoginComponent implements OnInit {
  isusername: boolean = false;
  issetpwd: boolean = false;
  is_res_error: any = '';
  status_code:any="";
  salt:string;

  constructor(
    private router: Router,
    private adm: LoginService,
    private toasterService: ToasterService,
    private spinnerService: Ng4LoadingSpinnerService,
    public datepipe: DatePipe
  ) {}

  ngOnInit() {
    //alert('sdcs');
    this.reloadToken(); 
  }

  // adminLogin(username, password) {
  //   this.isusername = false;
  //   this.issetpwd = false;
  //   this.is_res_error = '';
  //   if (username == '') {
  //     this.isusername = true;
  //     return;
  //   } else if (password == '') {
  //     this.isusername = false;
  //     this.issetpwd = true;
  //     return;
  //   }
  //   //call Api then route depends on response
  //   if (username !== '' && password !== '') {
  //     this.router.navigate(['admin/home']);
  //   }
  // }

  toastrmsg(type, title) {
    var toast: Toast = {
      type: type,
      showCloseButton: true,
      title: "",
      body: title
      
    };
    this.toasterService.pop(toast);
  }

  sessionSet(key, value, expirationInMin = 20) {
    let expirationDate = new Date(
      new Date().getTime() + 60000 * expirationInMin,
    );
    let newValue = {
      value: value,
      expirationDate: expirationDate.toISOString(),
    };
    window.sessionStorage.setItem(key, JSON.stringify(newValue));
  }

  encode(key,val){
    var encryptedBase64Key=btoa(key); //base64encryption
    var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
   let encryptedVal = CryptoJS.AES.encrypt(val, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
      });
      return encryptedVal;
  }
  reloadToken(){
    this.adm.getSalt().subscribe((data: any) => {
      
      this.adm.sendSalt(data._body);
      this.salt = data._body;
    },
    err => {
      console.log('err', err);
    });
  }

  // Login function
  adminLogin(username: any, password: any) {
    localStorage.setItem('username', username);
    //localStorage.setItem('password', password);
    this.isusername = false;
    this.issetpwd = false;
    this.is_res_error = '';
    if (username == '') {
      this.isusername = true;
      return;
    } else if (password == '') {
      this.isusername = false;
      this.issetpwd = true;
      return;
    }
    /* username = btoa(username);
    password = btoa(password);
    console.log("username password"+username+':' +password)
    var json = { username: username, password: password }; */
    username = btoa(username);
//   password = btoa(password);


 let pwd = this.encode(this.salt,password);
 let challengeId = this.salt;
   this.spinnerService.show();
   var key = 'ICICI#~#';
   key += this.datepipe.transform(Date.now(),'ddMMyyyy');
 let newSalt = this.encode(key,this.salt);
 var json = { username: username, password: pwd ,Token:newSalt};
    this.spinnerService.show();
    this.adm.Login(json).subscribe((data: any) => {
      this.resetUser();
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == true) {
        if(obj.data.challengeId !== challengeId){

          this.spinnerService.hide();
          this.isusername = false;
          this.issetpwd = false;
          this.reloadToken();
          this.is_res_error = "Unable to login ,try again.";
          return false;

        }
        
        this.sessionSet('username', obj.data.username);
        localStorage.setItem('id', obj.data.id);
      //  localStorage.setItem('email', obj.data.email);
        localStorage.setItem("jwt",obj.jwttoken);

        localStorage.setItem("username", obj.data.username);
       // localStorage.setItem("password", this.loginResponse.data.password);
        localStorage.setItem("id", obj.data.id);
        localStorage.setItem("role", obj.data.role);
        
      let respData = obj.data;
      if(respData ){
        localStorage.setItem('misUserVal',respData.misUser);
      }  if(respData && respData.firstName ){
        localStorage.setItem('Firstname',respData.firstName);
      }  if(respData && respData.lastLoginDt ){
        localStorage.setItem('lastLoginDate',respData.lastLoginDt);
      }if(respData  ){
      localStorage.setItem('isInternalUser',respData.internalUser);
    }

      if(respData && respData.companyName ){
        localStorage.setItem('companyName',respData.companyName);
      } if(respData && respData.mobileNo ){
        localStorage.setItem('mobileNo',respData.mobileNo);
      }if(respData && respData.email ){
        localStorage.setItem('email',respData.email);
      }if(respData && respData.rm ){
        localStorage.setItem('rm',respData.rm);
      }



        this.admin_acccess(obj.data.username);
        this.adm.sendUserId(obj.data.id);
        this.spinnerService.hide();
      } else {
        this.spinnerService.hide();
        this.isusername = false;
        this.issetpwd = false;
        this.reloadToken();
        if(obj.status_code == 111 || obj.status_code == "111" ){
          this.status_code = 111;
        this.is_res_error = "Your account is locked because of "+obj.message +" days inactive.";
       
        }else if(obj.status_code == 112 || obj.status_code == "112" ){
          this.is_res_error = obj.message;
        }else{
         this.is_res_error = obj.message;;
         }
       // this.is_res_error = obj.message;
      }
    },
    err => {
      console.log('err', err);
      this.reloadToken();
    //  this.router.navigate(['error']);
      this.toastrmsg('error',"Something went wrong. Please try again in some time.");
    },);
  }

  admin_acccess(username) {
    this.adm.Admin_access(username).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.message == 'Success') {
        this.toastrmsg('success', 'Successfully Login');
        localStorage.setItem('isAdmin',"yes");
        this.router.navigate(['/admin/request']);
      } else {
        this.toastrmsg('error', 'Unauthorized');
        localStorage.removeItem('isAdmin');
        this.resetUser();
        this.router.navigate(['/admin/login']);
      }
    },
    err => {
       console.log('err', err);
      //this.router.navigate(['error']);
     
      this.toastrmsg('error',"Something went wrong. Please try again in some time.");
     localStorage.removeItem('isAdmin');
     this.resetUser(); 
    /*  localStorage.setItem('isAdmin',"yes");
     this.router.navigate(['/admin/request']); */
    },);
  }
  resetUser(){
    

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
      
      this.adm.sendUserId("");
      localStorage.clear();
     // this.router.navigate(["/index"]);
     this.adm.logout().subscribe(
      res => {
       // this.router.navigate(["/index"]);
      },
      err => {
        //this.router.navigate(["/index"]);
      }
    );
    //this.router.navigate(["/index"]);
      
  
  }

  
}
