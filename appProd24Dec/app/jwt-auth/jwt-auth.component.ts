import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-jwt-auth',
  templateUrl: './jwt-auth.component.html',
  // styleUrls: ['./jwt-auth.component.css']
})
export class JwtAuthComponent implements OnInit {
  plainText:string;  
  encryptText: string;
  encUsername: string;  
  encPassword: string;  
  conversionEncryptOutput: string;  
  conversionDecryptOutput: string;  
  jwt:any;
  // loginForm: FormGroup;
    
  constructor(
    private adm: LoginService,
    private router:Router,
    private toasterService: ToasterService,
    // private formBuilder: FormBuilder,
  ) { }
loginResponse:any;
  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
  }
 


  Login(username: any, password: any) {
  //   this.conversionEncryptOutput = CryptoJS.AES.encrypt(username.trim(),password.trim()).toString();  
  //   alert("encrypt : "+this.conversionEncryptOutput)
  //   this.conversionDecryptOutput = CryptoJS.AES.decrypt( this.conversionEncryptOutput.trim(), password.trim()).toString(CryptoJS.enc.Utf8);
  //  alert("decrypt : "+this.conversionDecryptOutput)
  username = btoa(username);
  password = btoa(password);
  console.log(username+':' ,password)
    var json = { username: username, password: password };
    this.adm.LoginJWT(json).subscribe((data: any) => {
      var response = data._body;
      this.loginResponse = JSON.parse(response);
      if (this.loginResponse.status == true) {
      // localStorage.setItem("jwt",this.loginResponse.jwttoken)
      }
    },
    err => {
      console.log('err', err);
   //   this.router.navigate(['error']);
      this.toastrmsg('error',"Something went wrong. Please try again in some time.");
    },);
    // this.adm.Login(btoa(this.f.username.value), btoa(this.f.password.value))
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 console.log("username" )
    //             },
    //             error => {
    //                 console.log
    //             });
    
    // }
    // console.log(this.conversionEncryptOutput)
    // console.log(username, password);
    // this.conversionEncryptOutput = window.btoa(username + ':' + password);
    // console.log(this.conversionEncryptOutput); 
    // this.conversionEncryptOutput = window.atob("dXNlcm5hbWU6cGFzc3dvcmQ=");
    // console.log(this.conversionEncryptOutput); 
    return false;
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
