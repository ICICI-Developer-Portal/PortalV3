import { Component, OnInit, TemplateRef, ɵConsole } from "@angular/core";
import { Toast, ToasterService } from "angular2-toaster";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "src/app/services";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordValidation } from "../LandingPage/layout/header/password.validator";

import { ChangeDetectorRef } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { SessionService } from "src/app/services/session.service";
import { formatDate } from "@angular/common";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { preserveWhitespacesDefault } from "@angular/compiler";
import { CustomValidators } from "../LandingPage/layout/header/custom-validators";
import { DatePipe } from '@angular/common';
import * as CryptoJS from 'crypto-js';
// import * as bcrypt from 'bcryptjs';
declare var $: any;
@Component({
  selector: "icici-header",
  templateUrl: "./header.component.html",
  providers: [DatePipe]
  //styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  modalRef4: BsModalRef;
  isusername: boolean = false;
  issetpwd: boolean = false;
  is_res_error: any = "";
  valueWidth = false;
  show: boolean = false;
  showOtp: boolean = true;
  signupForm: FormGroup;
  isSubmitted: boolean;
  showbtn: Boolean;
  showlogoutbtn: Boolean;
  signupForm2: FormGroup;
  signupForm3: FormGroup;
  signupForm4: FormGroup;
  forgetpassForm: FormGroup;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  signupFormLink: FormGroup;
  isemail_check: boolean = false;
  shfrmSFFirst: boolean = false;
  shfrmSFSecond: boolean = false;
  shfrmSFThird: boolean = false;
  logged_in: boolean = false;
  otp_txt_id: any = "";
  isemail_reg_check: string = "";
  ismobile_reg_check: string = "";
  isotp_reg_check: string = "";
  user_name = "";
  otp_verified = 0;
  domainLst: any[];
  loginResponse: any;
  companyNamesDetails: any;
  companyNames: any;
  appathonUsername: any;
  appathonPassword: any;
  appathonFirstName: any;
  appathonMobileNumber: any;
  appathonCompanyEmail: any;
  appathonCompanyName: any;
  appathonUserName: any;
  modalRef9: BsModalRef;

  //aapathonSignUpForm
  appathonSignupForm: FormGroup;
  appathonSignupForm2: FormGroup;
  appathonSignupForm3: FormGroup;
  appathonSignupForm4: FormGroup;
  //aapathonSignUpForm

  //aapathonSignUpForm
  shfrmSFFirst1: boolean = false;
  shfrmSFSecond1: boolean = false;
  shfrmSFThird1: boolean = false;
  //aapathonSignUpForm

  //aapathonSignUpForm
  teamList: any[];
  teamMemberArr: any[];
  showOptn: boolean = false;
  showAppDash: boolean = false;
  userName: any;
  errorMsg:any = "Something went wrong. Please try again in some time.";
  misUserVal:any = false;
  Firstname: any="";
  lastLoginDate: any="";
  status_code:any;
  isInternalUser:any = false;
  salt:string;
  userEmailId;
  showBUH: boolean = false;
  showBU: boolean = false;
  userRole:boolean = false;

  constructor(
    private SessionService: SessionService,
    private authService: AuthService,
    private ref: ChangeDetectorRef,
    private formbuilder: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private adm: LoginService,
    private toasterService: ToasterService,
    public datepipe: DatePipe
  ) {
    this.btn_Sign();
    this.adm.getUserId().subscribe(data => {
      this.logged_in =
        data != "" && data != null && data != undefined ? true : false;
      this.showbtn = !this.logged_in;
      if(localStorage.getItem('misUserVal') != ""){
        this.misUserVal = localStorage.getItem('misUserVal');
      }if(localStorage.getItem('Firstname') != ""){
        this.Firstname = localStorage.getItem('Firstname');
      }if(localStorage.getItem('lastLoginDate') != ""){
        this.lastLoginDate = localStorage.getItem('lastLoginDate');
      }if(localStorage.getItem('username') != ""){
        this.userName = localStorage.getItem('username');
      }if(localStorage.getItem('isInternalUser') != ""){
        this.isInternalUser = localStorage.getItem('isInternalUser');
      }
      if(localStorage.getItem('role') != ""){
        let role = localStorage.getItem('role');
        if (role === "BUH") {
          this.showBUH = true;
          this.showBU = false;
        }else 
        if (role === "BU") {
          this.showBU = true;
          this.showBUH = false;
        }
      }
      if(localStorage.getItem('isAdmin') == "yes"){
       this.userRole = true;
       this.showBU = true;
       this.showBUH = true;
      }else{
        this.userRole = false;
      }

    });
    this.adm.getUserName().subscribe(data => {
      this.appathonFirstName = localStorage.getItem("appathonFirstName");
      this.appathonCompanyEmail = localStorage.getItem("appathonCompanyEmail");
      this.appathonMobileNumber = localStorage.getItem("appathonMobileNumber");
      this.appathonCompanyName = localStorage.getItem("appathonCompanyName");
      this.appathonUserName = localStorage.getItem("appathonUserName");
      this.user_name = data;
    });

    this.adm.getSaltValue().subscribe(data => {
      this.salt = data
      
    });
    this.get_domain_and_apis();
  }
  decode(val){
 
    // Decryption process
    var key = 'ICICI#~#';
    key += this.datepipe.transform(Date.now(),'ddMMyyyy');
  
    var encryptedBase64Key=btoa(key); //base64encryption
    var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
  
    var encryptedCipherText = val ; // or encryptedData;
    var decryptedData = CryptoJS.AES.decrypt( encryptedCipherText, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    } );
    var decryptedText = decryptedData.toString( CryptoJS.enc.Utf8 );
    return decryptedText
  
  }
  decode1(val,key){
 
    // Decryption process
  //  var key = 'ICICI#~#';
//    key += this.datepipe.transform(Date.now(),'ddMMyyyy');
  
    var encryptedBase64Key=btoa(key); //base64encryption
    var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
  
    var encryptedCipherText = val ; // or encryptedData;
    var decryptedData = CryptoJS.AES.decrypt( encryptedCipherText, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    } );
    var decryptedText = decryptedData.toString( CryptoJS.enc.Utf8 );
    return decryptedText
  
  }
     
  ngOnInit() {

    this.userEmailId=localStorage.getItem("email");
    
    //aapathonSignUpForm
    this.teamList = [0, 1, 2, 3, 4];
    //aapathonSignUpForm
    this.forgetpassForm = this.formbuilder.group({
      username: ["", [Validators.required,]]
    });
    this.signupForm = this.formbuilder.group({
      firstname: ["", [Validators.required]],
      companyName: ["", [Validators.required]],
      domainNm: ["", [Validators.required]],
      CITY: ["", [Validators.required]],
      RM: ["", [Validators.required]],
      partnerCode:[""],
      email: ["", [Validators.required, Validators.email]],
      otp_verified: ["0"],
      otp_send: ["0"]
    });

    //aapathonSignUpForm
    this.appathonSignupForm = this.formbuilder.group({
      teamName: ["", [Validators.required]],
      captainName: ["", [Validators.required]],
      captainMobileNumber: [
        "",
        [Validators.required, Validators.pattern(this.mobnumPattern)]
      ],
      teamEmail: ["", [Validators.required, Validators.email]],
      teamSize: ["", [Validators.required]],
      memberName1: [""],
      memberMobileNumber1: [""],
      memberEmail1: [""],
      memberName2: [""],
      memberMobileNumber2: [""],
      memberEmail2: [""],
      memberName3: [""],
      memberMobileNumber3: [""],
      memberEmail3: [""],
      memberName4: [""],
      memberMobileNumber4: [""],
      memberEmail4: [""],
      location: ["", [Validators.required]],
      memberCompanyName: ["", [Validators.required]],
      otp_verified: ["0"],
      otp_send: ["0"]
    });

    this.appathonSignupForm2 = this.formbuilder.group({
      mobile_no: [
        "",
        [Validators.required, Validators.pattern(this.mobnumPattern)]
      ],
      otp_code: ["", [Validators.required]]
    });

    this.appathonSignupForm3 = this.formbuilder.group(
      {
        username: ["", [Validators.required]],
        password: ["", [Validators.required]],
        confirmPassword: ["", [Validators.required]],
        term: ["", [Validators.required]]
      },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      }
    );

    this.appathonSignupForm4 = this.formbuilder.group({
      termsandcondition: ["", [Validators.required]]
    });
    //aapathonSignUpForm

    this.signupForm2 = this.formbuilder.group({
      mobile_no: [
        "",
        [Validators.required, Validators.pattern(this.mobnumPattern)]
      ],
      otp_code: ["", [Validators.required]]
    });

    this.signupForm3 = this.formbuilder.group(
      {
        uname :["",[Validators.required]],
        //uname: ["", [Validators.required]],
        //password: ["", [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],

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
        term: ["", [Validators.required]]
      },
      {
        validator: CustomValidators.passwordMatchValidator // your validation method
      }
    );
    this.signupForm4 = this.formbuilder.group({
      termsandcondition: ["", [Validators.required]]
    });

    this.shfrmSFFirst = true;
    this.shfrmSFSecond = false;
    this.shfrmSFThird = false;
    this.companyNames = [];

    //aapathonSignUpForm
    this.shfrmSFFirst1 = true;
    this.shfrmSFSecond1 = false;
    this.shfrmSFThird1 = false;
    //aapathonSignUpForm

    if (localStorage.getItem("role") !== "Appathon") {
      this.showOptn = true;
    }
    if (localStorage.getItem("role") === "Both") {
      this.showAppDash = true;
    }
    if (localStorage.getItem("role") === "BUH") {
      this.showBUH = true;
    
    }
    if (localStorage.getItem("role") === "BU") {
      this.showBU = true;
    
    }
    this.userName = localStorage.getItem("username");

    if(localStorage.getItem('misUserVal') != ""){
      this.misUserVal = localStorage.getItem('misUserVal');
    }if(localStorage.getItem('Firstname') != ""){
      this.Firstname = localStorage.getItem('Firstname');
    }if(localStorage.getItem('lastLoginDate') != ""){
      this.lastLoginDate = localStorage.getItem('lastLoginDate');
    } 
   
  }
/* active class toggle **/
  addActiveClass(e){
   // console.log(e);
    $('ul li a[data-toggle="tab"]').removeClass('active');
    $('ul li a[data-toggle="tab"]').removeClass('show');
   
    $('ul li a[data-toggle="dropdown"]').removeClass('active');
    $('ul li a[data-toggle="dropdown"]').removeClass('show');
   $(e.target).parent().parent().find('a').first().addClass('active');
   
  }

  appathonReg() {
    this.modalRef2.hide();
    this.router.navigate(["/appathon/landing-page"]);
  }

  get firstname() {
    return this.signupForm.get("firstname");
  }
  get companyName() {
    return this.signupForm.get("companyName");
  }
  get domainNm() {
    return this.signupForm.get("domainNm");
  }
  get email() {
    return this.signupForm.get("email");
  }
  get CITY() {
    return this.signupForm.get("CITY");
  }
  get RM() {
    return this.signupForm.get("RM");
  }
  get partnerCode() {
    return this.signupForm.get("partnerCode");
  }
  get mobile_no() {
    return this.signupForm2.get("mobile_no");
  }
  get otp_code() {
    return this.signupForm2.get("otp_code");
  }

  get username() {
    return this.signupForm3.get("username");
  }
  get password() {
    return this.signupForm3.get("password");
  }
  get confirmPassword() {
    return this.signupForm3.get("confirmPassword");
  }

  get termsandcondition() {
    return this.signupForm2.get("termsandcondition");
  }

  get username1() {
    return this.forgetpassForm.get("username1");
  }

 /* toastrmsg(type, title) {
    var toast: Toast = {
      type: type,
      title: title,
      showCloseButton: true
    };
    this.toasterService.pop(toast);
  }*/
toastrmsg(type, title) {
  var toast: Toast = {
    type: type,
    showCloseButton: true,
    title: "",
    body: title
    
  };

    this.toasterService.pop(toast);
  }

  session() {
    var timer = this.SessionService.session();
    this.adm.getUserId().subscribe(data => {
      this.logged_in =
        data != "" && data != null && data != undefined ? true : false;
      this.showbtn = !this.logged_in;
    });
  }

  openModal2(signup: TemplateRef<any>) {
    //this.modalRef2 = this.modalService.show(signup, { backdrop: "static" });
    try {
      this.modalRef.hide();
    } catch (e) {}
    this.signupForm.controls["otp_verified"].setValue("0");
    this.otp_verified = 0;
    this.ref.markForCheck();
    this.router.navigate(['/signUpPage']);
  }

  //aapathonSignUpForm
  openModalAppathonSignup(appathonSignup: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(appathonSignup, {
      backdrop: "static"
    });
    try {
      this.modalRef.hide();
    } catch (e) {}
    this.signupForm.controls["otp_verified"].setValue("0");
    this.otp_verified = 0;
    this.ref.markForCheck();
  }
  //aapathonSignUpForm
  openModal(signin: TemplateRef<any>) {
    this.modalRef = this.modalService.show(signin, { backdrop: "static" });

    try {
      this.modalRef2.hide();
    } catch (e) {}
  }
  Modalforgotpassw(forgotpassw: TemplateRef<any>) {
    this.modalRef3 = this.modalService.show(forgotpassw, {
      backdrop: "static"
    });

    try {
      this.modalRef.hide();
    } catch (e) {}
  }
  //
  keyDownFunction(event,username: any, password: any, loginsuccess: TemplateRef<any>) {
    if (event.keyCode === 13) {
     // alert('you just pressed the enter key');
      // rest of your code
      this.Login(username, password,loginsuccess);
    }
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("route-access", state);
}

  // Login function
  Login(username: any, password: any, loginsuccess: TemplateRef<any>) {
    var nonEncodedJson = {
      username : username,
      password : password
    };
    this.isusername = false;
    this.issetpwd = false;
    this.is_res_error = "";
    this.status_code = "";

    if (username == "") {
      this.isusername = true;
      return;
    } else if (password == "") {
      this.isusername = false;
      this.issetpwd = true;
      return;
    }
    username = btoa(username);
 //   password = btoa(password); //

 
  let pwd = this.encode(this.salt,password);
  let challengeId = this.salt;
    this.spinnerService.show();
    var key = 'ICICI#~#';
    key += this.datepipe.transform(Date.now(),'ddMMyyyy');
  let newSalt = this.encode(key,this.salt);
  var json = { username: username, password: pwd ,Token:newSalt};
  this.adm.Login1(json).subscribe((data: any) => {
    var response = data._body;
    this.loginResponse = JSON.parse(response);
    if (this.loginResponse.status == true) {
      if(this.loginResponse.data.challengeId !== challengeId){

        this.spinnerService.hide();
        this.isusername = false;
        this.issetpwd = false;
        this.reloadToken();
        this.is_res_error = "Unable to login ,try again.";
        return false;

      }


      var timer = this.SessionService.session();
      this.show = false;
      this.modalRef.hide();

      let respData =  this.loginResponse.data;
      if(respData  ){
        this.misUserVal = respData.misUser;
        localStorage.setItem('misUserVal',this.misUserVal);
      }  if(respData && respData.firstName ){
        this.Firstname=respData.firstName;
        localStorage.setItem('Firstname',this.Firstname);
      }  if(respData && respData.lastLoginDt ){
        this.lastLoginDate=respData.lastLoginDt;
        localStorage.setItem('lastLoginDate',this.lastLoginDate);
      }if(respData  ){
        localStorage.setItem('isInternalUser',respData.internalUser);
        this.isInternalUser = respData.internalUser;
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
     
      localStorage.setItem(
        "appathonFirstName",
        this.loginResponse.data.firstName
      );
      localStorage.setItem(
        "appathonCompanyEmail",
        this.loginResponse.data.email
      );
      localStorage.setItem(
        "appathonMobileNumber",
        this.loginResponse.data.mobileNo
      );
      localStorage.setItem(
        "appathonCompanyName",
        this.loginResponse.data.companyName
      );
      localStorage.setItem("jwt",this.loginResponse.jwttoken)
      // localStorage.setItem('password', obj.data.password);
      // localStorage.setItem('id', obj.data.id);
      // localStorage.setItem('role', 'user');
      // localStorage.setItem('email', obj.data.email);
      // this.adm.sendUserId(obj.data.id);
      this.spinnerService.hide();
       
   
       /**
       * Changing the flow as login shd complete even if loginsuccess popup eacaped
       */
      $('ul li a[data-toggle="tab"]').removeClass('active');
      $('ul li a[data-toggle="tab"]').removeClass('show');
          this.userName = this.loginResponse.data.username;
      this.sessionSet("username", this.loginResponse.data.username);
      localStorage.setItem("username", this.loginResponse.data.username);
      localStorage.setItem("password", this.loginResponse.data.password);
      localStorage.setItem("id", this.loginResponse.data.id);
      localStorage.setItem("role", this.loginResponse.data.role);
      if (this.loginResponse.data.role === "BUH") {
        this.showBUH = true;
      
      }
      if (this.loginResponse.data.role === "BU") {
        this.showBU = true;
      
      }
      this.userName = localStorage.getItem("username");
      
      localStorage.setItem(
        "appathonusername",
        this.loginResponse.data.appathonusername
      );
      localStorage.setItem("appathonUserName", this.loginResponse.data.username);
      localStorage.setItem("email", this.loginResponse.data.email);
      this.adm.sendUserId(this.loginResponse.data.id);
      this.userName = localStorage.getItem("username");
      this.admin_acccess( this.userName)
      if (this.router.url === "/documentation"){
        this.router.navigate(['explore-api']); 
      }else{
        this.router.navigate([this.router.url]);
      }
      
      
      /**
       * End here
       */

      this.modalRef4 = this.modalService.show(loginsuccess, {
        backdrop: "static"
      });

      
    } else {
      this.spinnerService.hide();
      this.isusername = false;
      this.issetpwd = false;
      this.reloadToken();
      if(this.loginResponse.status_code == 111 || this.loginResponse.status_code == "111" ){
        this.status_code = 111;
      this.is_res_error = "Your account is locked because of "+this.loginResponse.message +" days inactive.";
     
      }else if(this.loginResponse.status_code == 112 || this.loginResponse.status_code == "112" ){
        this.is_res_error = this.loginResponse.message;
      }else{
       this.is_res_error = this.loginResponse.message;
       }
     
    }
    },
    err => {
      console.log('err', err);
      this.reloadToken();
     // this.router.navigate(['error']);
      this.toastrmsg('error',this.errorMsg);

      
    },);
  }
  admin_acccess(username) {
    this.adm.Admin_accessNew(username).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.message == 'Success') {
        console.log('yes admin');
        localStorage.setItem('isAdmin',"yes");
        this.userRole = true;
        this.showBU = true;
        this.showBUH = true;
      } else {
        console.log('no');
        this.userRole = false;
      }
    },
    err => {
       /* var obj ={"message":"UnAuthorized","jwttoken":null,"status_code":0,"status":false,"data":null};
      if (obj.message == 'Success') {
        console.log('yes admin');
        this.userRole = true;
        this.showBU = true;
        this.showBUH = true;
       localStorage.setItem('isAdmin',"yes");
      } else {
        console.log('no');
       this.userRole = false;
       
      }  */
      console.log('err', err);
    },);
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
  closeLoginPopup(){
   this.is_res_error = '';
   this.modalRef.hide();
  }
  // Signup function

  sessionSet(key, value, expirationInMin = 20) {
    let expirationDate = new Date(
      new Date().getTime() + 60000 * expirationInMin
    );
    let newValue = {
      value: value,
      expirationDate: expirationDate.toISOString()
    };
    window.sessionStorage.setItem(key, JSON.stringify(newValue));
  }

  today = new Date();
  sign_up() {
    var CurrentTime = formatDate(
      this.today,
      "dd-MM-yyyy hh:mm:ss a",
      "en-US",
      "+0530"
    );
    //var CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+ new Date().getSeconds();
    try {
      var json = {
        username: this.signupForm3.value.uname,
        password: this.signupForm3.value.password,
        email: this.signupForm.value.email,
        firstname: this.signupForm.value.firstname,
        lastName: this.signupForm.value.firstname,
        domainNm: this.signupForm.value.domainNm,
        companyName: this.signupForm.value.companyName,
        contactNo: this.signupForm2.value.mobile_no,
        CITY: this.signupForm.value.CITY,
        RM: this.signupForm.value.RM,
        partnerCode:this.signupForm.value.partnerCode,
        tncConfirmed: "1",
        tncConfirmedDt: CurrentTime,
        approverName: "YES",
        approverEmailId: "YES",
        requestDt: CurrentTime
      };
      this.spinnerService.show();
      this.adm.sign_up(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == true) {
          this.signup_jira();
          this.toastrmsg(
            "success",
            "Thank you for registering. Your account has been successfully created. Please log in to continue."
          );
          this.spinnerService.hide();
          this.signupForm.reset();
          this.signupForm2.reset();
          this.signupForm3.reset();
          this.signupForm4.reset();
          this.modalRef2.hide();
          this.shfrmSFFirst = true;
          this.shfrmSFSecond = false;
          this.shfrmSFThird = false;

          this.router.navigate(["/index"]);
        } else {
          this.shfrmSFThird = true;
          this.shfrmSFSecond = false;
          this.shfrmSFFirst = false;
          this.toastrmsg("error", obj.message);
        }
      },
      err => {
        console.log('err', err);
        //this.router.navigate(['error']);
        this.toastrmsg('error',this.errorMsg);

      },);
    } catch {
      this.toastrmsg("error", console.error());
    }
  }
  //aapathonSignUpForm

  appathonSign_up() {
    var CurrentTime = formatDate(
      this.today,
      "dd-MM-yyyy hh:mm:ss a",
      "en-US",
      "+0530"
    );

    if (
      this.appathonSignupForm3.value.username == undefined ||
      this.appathonSignupForm3.value.username == "" ||
      this.appathonSignupForm3.value.username == "NULL"
    ) {
      this.appathonUsername =
        this.appathonSignupForm3.value.username + "_" + CurrentTime;
    } else {
      this.appathonUsername = this.appathonSignupForm3.value.username;
    }
    if (
      this.appathonSignupForm3.value.password == undefined ||
      this.appathonSignupForm3.value.password == "" ||
      this.appathonSignupForm3.value.password == "NULL"
    ) {
      this.appathonPassword =
        this.appathonSignupForm3.value.password + "_" + CurrentTime;
    } else {
      this.appathonPassword = this.appathonSignupForm3.value.password;
    }

    //var CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+ new Date().getSeconds();
    try {
      var json = {
        username: this.appathonUsername,
        password: this.appathonPassword,
        team_name: this.appathonSignupForm.value.teamName,
        team_captain_name: this.appathonSignupForm.value.captainName,
        team_captain_mobile: this.appathonSignupForm.value.captainMobileNumber,
        team_captain_email: this.appathonSignupForm.value.teamEmail,
        team_size: this.appathonSignupForm.value.teamSize,
        contactNo: this.appathonSignupForm2.value.mobile_no,
        location: this.appathonSignupForm.value.location,
        team_members_name: JSON.stringify(this.exampleArray1),
        team_members_mobile: JSON.stringify(this.exampleArray2),
        team_members_email: JSON.stringify(this.exampleArray3),

        company_name: this.appathonSignupForm.value.memberCompanyName,
        tncConfirmed: "1",
        tncConfirmedDt: CurrentTime,
        approverName: "YES",
        approverEmailId: "YES",
        requestDt: CurrentTime
      };
      this.spinnerService.show();
      this.adm.appathon_sign_up(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
       // console.log(obj);
        if (obj.status == true) {
          //this.signup_jira();
          this.toastrmsg(
            "success",
            "Thanks for registering, once your application is approved it would be conveyed to you on mail"
          );
          this.spinnerService.hide();
          this.appathonSignupForm.reset();
          this.appathonSignupForm2.reset();
          this.appathonSignupForm3.reset();
          this.appathonSignupForm4.reset();
          this.modalRef2.hide();
          this.shfrmSFFirst1 = true;
          this.shfrmSFSecond1 = false;
          this.shfrmSFThird1 = false;

          this.router.navigate(["/index"]);
        } else {
          this.shfrmSFThird1 = true;
          this.shfrmSFSecond1 = false;
          this.shfrmSFFirst1 = false;
          this.toastrmsg("error", obj.message);
        }
      },
      err => {
        console.log('err', err);
        //  this.router.navigate(['error']);
        this.toastrmsg('error',this.errorMsg);

      },);
    } catch {
      this.toastrmsg("error", console.error());
    }
  }
  //aapathonSignUpForm

  signup_jira() {
    var CurrentTime = formatDate(this.today, "yyyy-MM-dd", "en-US", "+0530");
    //var CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+ new Date().getSeconds();
    var json = {
      userName: this.signupForm3.value.uname,
      email: this.signupForm.value.email,
      firstName: this.signupForm.value.firstname,
      lastName: this.signupForm.value.firstname,
      domainNm: this.signupForm.value.domainNm,
      companyName: this.signupForm.value.companyName,
      contactNo: this.signupForm2.value.mobile_no,
      CITY: this.signupForm.value.CITY,
      RM: this.signupForm.value.RM,
      partnerCode:this.signupForm.value.partnerCode,
      tncConfirmed: "1",
      tncConfirmedDt: CurrentTime,
      approverName: "YES",
      approverEmailId: "YES",
      requestDt: CurrentTime
    };
    this.adm.sign_upjira(json).subscribe((data: any) => {
      var response = data._body;
    });
  }

  SendOtp(mobile: any) {
    this.signupForm.controls["otp_send"].setValue("0");
    try {
      if (mobile == "") {
        this.ismobile_reg_check = "Enter Mobile Number";
        //this.toastrmsg('error', "Enter Mobile Number");
        return;
      }
      var json = {
        mobile_no: mobile
      };
      this.ismobile_reg_check = "";
      this.adm.SendOTP(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == true) {
          this.showOtp = true;
          this.show = true;
          this.signupForm.controls["otp_send"].setValue("1");
          this.otp_txt_id = obj.data;
          //this.toastrmsg('success', "OTP Sent");
        } else {
          this.signupForm.controls["otp_send"].setValue("0");
          this.showOtp = true;
          this.show = true;
        }
      },
      err => {
        console.log('err', err);
        //this.router.navigate(['error']);
        this.toastrmsg('error',this.errorMsg);

      },);
    } catch {}
  }
  //send OTP button change and seconds
         name = 'Angular';
         btnText = 'send OTP ';
         btnDisabled = false;
         buttonClick1() {
         this.btnDisabled = true;
         this.btnText = 'Please wait';
         setTimeout(() => {
          this.btnText = 'Resend OTP';
          this.btnDisabled = false
           }, 30000);
         }
  //aapathonSignUpForm
  appathonSendOtp(mobile: any) {
    this.appathonSignupForm.controls["otp_send"].setValue("0");
    try {
      if (mobile == "") {
        this.ismobile_reg_check = "Enter Mobile Number";
        //this.toastrmsg('error', "Enter Mobile Number");
        return;
      }
      var json = {
        mobile_no: mobile
      };
      this.ismobile_reg_check = "";
      this.adm.SendOTP(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == true) {
          this.showOtp = true;
          this.show = true;
          this.appathonSignupForm.controls["otp_send"].setValue("1");
          this.otp_txt_id = obj.data;
          //this.toastrmsg('success', "OTP Sent");
        } else {
          this.appathonSignupForm.controls["otp_send"].setValue("0");
          this.showOtp = true;
          this.show = true;
        }
      },
      err => {
        console.log('err', err);
      //  this.router.navigate(['error']);
      this.toastrmsg('error',this.errorMsg);

      },);
    } catch {}
  }
  //aapathonSignUpForm
  SendEmailOtp() {
    try {
      this.adm.SendEmailOTP(this.signupForm.value).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == true) {
          this.show = true;
          this.shfrmSFSecond = true;
          this.shfrmSFFirst = false;
          this.shfrmSFThird = false;
          this.isemail_reg_check = "";
        } else {
          this.shfrmSFFirst = true;
          this.shfrmSFSecond = false;
          this.shfrmSFThird = false;
          this.isemail_reg_check = obj.message;
        }
      },
      err => {
        console.log('err', err);
       // this.router.navigate(['error']);
       this.toastrmsg('error',this.errorMsg);

      },);
    } catch {}
  }

  verifyOtp1() {
    try {
      this.adm
        .verify_otpCopy(this.signupForm2.value, this.otp_txt_id)
        .subscribe((data: any) => {
          console.log("otp verification section");
          var response = data._body;
          var obj = JSON.parse(response);
          obj = this.decode(obj.data);
          obj = JSON.parse(obj);
          if (obj.status == true) {
            console.log("otp success");
            this.shfrmSFThird = true;
            this.shfrmSFFirst = false;
            this.shfrmSFSecond = false;
            this.signupForm.controls["otp_verified"].setValue("1");
            this.otp_verified = 1;
            //this.toastrmsg('success', "Verified Otp");
          } else {
            console.log("otp error");
            this.shfrmSFSecond = true;
            this.shfrmSFThird = false;
            this.shfrmSFFirst = false;
            this.signupForm.controls["otp_verified"].setValue("0");
            this.otp_verified = 0;
            this.isotp_reg_check = "Otp not verified";
            this.toastrmsg("error", "Otp not verified");
          }
          this.ref.detectChanges();
        },
        err => {
          console.log('err', err);
       //   this.router.navigate(['error']);
          this.toastrmsg('error',this.errorMsg);

        },);
    } catch {}
  }
  //aapathonSignUpForm
  verifyOtp2() {
    try {
      this.adm
        .verify_otp(this.appathonSignupForm2.value, this.otp_txt_id)
        .subscribe((data: any) => {
          var response = data._body;
          var obj = JSON.parse(response);
          if (obj.status == true) {
            this.shfrmSFThird1 = true;
            this.shfrmSFFirst1 = false;
            this.shfrmSFSecond1 = false;
            this.appathonSignupForm.controls["otp_verified"].setValue("1");
            this.otp_verified = 1;
            //this.toastrmsg('success', "Verified Otp");
          } else {
            this.shfrmSFSecond1 = true;
            this.shfrmSFThird1 = false;
            this.shfrmSFFirst1 = false;
            this.appathonSignupForm.controls["otp_verified"].setValue("0");
            this.otp_verified = 0;
            this.isotp_reg_check = "Otp not verified";
            //this.toastrmsg('error', "Otp not verified");
          }
          this.ref.detectChanges();
        },
        err => {
          console.log('err', err);
         // this.router.navigate(['error']);
         this.toastrmsg('error',this.errorMsg);

        },);
    } catch {}
  }
  //aapathonSignUpForm
  // new signup form function
  save1() {
    this.shfrmSFSecond = true;
    this.shfrmSFFirst = false;
    this.shfrmSFThird = false;
  }

  save2() {
    this.verifyOtp1();
  }
  appathonSave1() {
    this.shfrmSFSecond1 = true;
    this.shfrmSFFirst1 = false;
    this.shfrmSFThird1 = false;
  }
  appathonSave2() {
    this.verifyOtp2();
  }

  //aapathonSignUpForm
  // End region

  // Documentation(signin: any) {
  // if (localStorage.getItem('id') != null) {
  // this.router.navigate(['/documentation']);
  // localStorage.setItem('IsReload', 'true');
  // } else {
  // this.modalRef = this.modalService.show(signin, { backdrop: 'static' });
  // this.modalRef2.hide();
  // }
  // }
  Documentation(signin: any) {
     if (
      localStorage.getItem('username') == '' ||
      !localStorage.getItem('username')
    ){
     this.router.navigate(["/documentation"]);
     //this.router.navigate(["/explore-api"]);
    }else{
      this.router.navigate(["/explore-api"]);
    } 
   /*  this.router.navigate(["/documentation"]);
    localStorage.setItem("IsReload", "true"); */
  }

  // forget Password function
  forgot(username: any,forgotpasswreset: TemplateRef<any>) {
    if (username == "") {
      this.toastrmsg("error", "Enter Username");
      return;
    }
    var json = { username: username };
    this.spinnerService.show();
    this.adm.forgetPassw(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == true) {
        this.modalRef9 = this.modalService.show(forgotpasswreset, {
          backdrop: 'static',
          });          
        // this.toastrmsg("success", " Please check your mail");
        this.router.navigate(["/index"]);
        this.modalRef3.hide();
        this.spinnerService.hide();
      } else {
        this.toastrmsg("error", obj.message);
      }
    },
    err => {
      console.log('err', err);
     // this.router.navigate(['error']);
     this.toastrmsg('error',this.errorMsg);

    },);
  }

  OnCheckEmail(Exists_Email: any) {
    try {
      var json = { email: Exists_Email };
      this.adm.Exists_Email(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == true) {
          this.isemail_check = true;
          this.isemail_reg_check = "";
          //this.toastrmsg('success', obj.message);
        } else {
          this.isemail_check = false;
          this.isemail_reg_check = obj.message;
          //this.toastrmsg('error', obj.message);
        }
      },
      err => {
        console.log('err', err);
        //this.router.navigate(['error']);
        this.toastrmsg('error',this.errorMsg);

      },);
    } catch {}
  }

  OnCheckUsername(username: any) {
    try {
      if (username != "") {
        var json = { username: username };
        this.adm.Exists_Username(json).subscribe((data: any) => {
          var response = data._body;
          var obj = JSON.parse(response);
          if (obj.status == true) {
            //this.toastrmsg('error', "Username already Exist");
          } else {
            this.toastrmsg("error", "Username already Exist");
          }
        },
        err => {
          console.log('err', err);
         // this.router.navigate(['error']);
          this.toastrmsg('error',this.errorMsg);

        },);
      }
    } catch {}
  }

  btn_Sign() {
    if (localStorage.getItem("id") != null) {
      
      this.showbtn = false;
      this.showlogoutbtn = true;
    } else {
      
      this.showbtn = true;
      this.showlogoutbtn = false;
    }
  }

  // Fuction for Logout
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
      });
  }
resetUserData(){
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
  localStorage.clear();
  this.adm.sendUserId("");
  this.showbtn = true;
  this.showlogoutbtn = false;
  this.reloadToken();
}
  signup_link(id) {
    if (this.shfrmSFFirst) {
      this.shfrmSFFirst = true;
    } else if (this.shfrmSFSecond) {
      this.shfrmSFFirst = id == 1 ? true : false;
      this.shfrmSFSecond = id > 1 ? true : false;
    } else {
      this.shfrmSFFirst = id == 1 ? true : false;
      this.shfrmSFSecond = id == 2 ? true : false;
      this.shfrmSFThird = id == 3 ? true : false;
    }
  }

  // To get Domain List
  get_domain_and_apis() {
    this.adm.domain_and_apis().subscribe((data: any) => {
      var obj = JSON.parse(data._body);
      var domain = [];
      for (var i in obj) {
        domain.push(obj[i].domain);
      }
      this.domainLst = domain;
    },
    err => {
      console.log('err', err);
     // this.router.navigate(['error']);
     this.toastrmsg('error',this.errorMsg);

    },);
  }

  scroll_view(id) {
    this.router.navigate(["index"]);
    
    setTimeout(function() {
    $('html, body').animate({ scrollTop: $(id).offset().top -100});

      // document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }, 10);
    console.log("yes")
  
  }
  scroll_viewHome() {
    this.router.navigate(["index"]);
   
    window.scrollTo(0, 0);
  
  }

  //login success pop up modal
  clickOk() {
    this.modalRef4.hide();
   /* this.sessionSet("username", this.loginResponse.data.username);
    localStorage.setItem("username", this.loginResponse.data.username);
    localStorage.setItem("password", this.loginResponse.data.password);
    localStorage.setItem("id", this.loginResponse.data.id);
    localStorage.setItem("role", this.loginResponse.data.role);
    localStorage.setItem(
      "appathonusername",
      this.loginResponse.data.appathonusername
    );
    localStorage.setItem("appathonUserName", this.loginResponse.data.username);
    localStorage.setItem("email", this.loginResponse.data.email);
    this.adm.sendUserId(this.loginResponse.data.id);
    this.router.navigate(["/documentation"]);
*/
    // if(this.loginResponse.data.role === 'Appathon'){
    //   this.router.navigate(['/appathon-dashboard']);
    // }
    // else this.router.navigate(['/documentation']);
  }
  modalRef4Close() {
    this.modalRef4.hide();
  }

  //componay name autocomplete
  // getCompanyName(companyName) {
  // this.adm.getCompanyName(companyName).subscribe(data => {
  // if (data.status === 200) {
  // this.companyNamesDetails = data;
  // this.companyNames = JSON.parse(this.companyNamesDetails._body);
  // }
  // });
  // }

  numericOnly(event): boolean {
  //  console.log("keypress");
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  appOnChange(val) {
    var len = val;
    this.teamMemberArr = [];
    for (var i = 0; i < len; i++) {
      this.teamMemberArr[i] = i + 1;
    }
  }
  exampleArray1 = [];
  exampleArray2 = [];
  exampleArray3 = [];
  onChangeInput1(val) {
    this.exampleArray1.push(val);
  }
  onChangeInput2(val) {
    this.exampleArray2.push(val);
  }
  onChangeInput3(val) {
    this.exampleArray3.push(val);
  }

  //componay name autocomplete
  getCompanyName(companyName) {
    this.adm.getCompanyName(companyName).subscribe(data => {
      if (data.status === 200) {
        this.companyNamesDetails = data;
        this.companyNames = JSON.parse(this.companyNamesDetails._body);
      }
    },
    err => {
      console.log('err', err);
     // this.router.navigate(['error']);
     this.toastrmsg('error',this.errorMsg);

    },);   
  }
}
