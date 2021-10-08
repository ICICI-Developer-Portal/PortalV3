import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ToasterService, Toast } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from 'src/app/services';
import { PasswordValidation } from '../../layout/header/password.validator';
import { VariablesService } from 'src/app/services/Variables.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Password1Validation } from 'src/app/services/password1.validator';
import { CustomValidators } from '../../layout/header/custom-validators';
import { DatePipe } from '@angular/common';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [DatePipe]
})
export class ChangePasswordComponent implements OnInit {

  ChangepasswForm:FormGroup;
  token: any;
  salt:any;

 constructor(private route:Router,private activeRoute:ActivatedRoute,
  private formbuilder:FormBuilder,private spinnerService: Ng4LoadingSpinnerService,
   private router:Router, private adm:LoginService, private toasterService: ToasterService,
   public datepipe: DatePipe ) { 
    this.activeRoute.queryParams.subscribe(params => {
       this.token=params.token;  
    });
    this.spinnerService.hide();
 }

 ngOnInit() {
   this.reloadToken();
  document.getElementById("password");

  this.ChangepasswForm=this.formbuilder.group({
    passwordold:["",Validators.required],
    password: ["", [Validators.required,
      // check whether the entered password has a number
      CustomValidators.patternValidator(/\d/, {
        hasNumber: true
      }),
      // check whether the entered password has upper case letter
      CustomValidators.patternValidator(/[A-Z]/, {
        hasCapitalCase: true
      }),
      // check whether the entered password has a lower case letter
      CustomValidators.patternValidator(/[a-z]/, {  
        hasSmallCase: true
      }),
      // check whether the entered password has a special character
      CustomValidators.patternValidator(
        /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        {
          hasSpecialCharacters: true
        }
      ),
      Validators.minLength(8)
    ]],
    confirmPassword: ["", [Validators.required]],
  },
  {
    validator: CustomValidators.passwordMatchValidator // your validation method
  }
  );
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
    
  //  this.adm.sendSalt(data._body);
    this.salt = data._body;
  },
  err => {
    console.log('err', err);
  });
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

 get password() { return this.ChangepasswForm.get('password'); }
 get confirmPassword() { return this.ChangepasswForm.get('confirmPassword'); }


 // Change Password
 save(){
  try{
   

    let oldpwd = this.encode(this.salt,this.ChangepasswForm.value.passwordold);
    let newpwd = this.encode(this.salt,this.ChangepasswForm.value.password);
     var key = 'ICICI#~#';
      key += this.datepipe.transform(Date.now(),'ddMMyyyy');
    let newSalt = this.encode(key,this.salt);
   
    let json=
    {
      username:btoa(localStorage.getItem("username")),
     password: oldpwd,
     newpassword :newpwd
    }





  this.ChangepasswForm.value.token=this.token;
  this.spinnerService.show();
  this.adm.changePassw(json,newSalt)
  .subscribe(
    (data:any) => {
      this.spinnerService.hide();
      var response= data._body; 
      console.log(response);
      var obj=JSON.parse(response);
      if(obj.status==true)
      {   
          this.toastrmsg('success', "Password Change Successfully");
          this.ChangepasswForm.reset();
          this.reloadToken();
      }
      else
      {
          this.toastrmsg('error', obj.message);
          this.reloadToken()
      } 
    },
    err => {
      this.spinnerService.hide();
      this.reloadToken()
      console.log('err', err);
     // this.router.navigate(['error']);
      this.toastrmsg('error',"Something went wrong. Please try again in some time.");
      
    },
  );  
  
  }
  catch{}
}
// End region

}