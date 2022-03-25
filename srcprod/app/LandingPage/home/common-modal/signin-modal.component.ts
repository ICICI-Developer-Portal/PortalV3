import { Component, OnInit, TemplateRef, ɵConsole,ViewChild,ElementRef } from "@angular/core";
import { Toast, ToasterService, ToasterConfig } from "angular2-toaster";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordValidation } from "../../layout/header/password.validator";
import { ChangeDetectorRef } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { SessionService } from "src/app/services/session.service";
import { formatDate } from "@angular/common";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { CustomValidators } from "../../layout/header/custom-validators";
import { DatePipe } from '@angular/common';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: "app-common-signin-modal",
  templateUrl: "./signin-modal.component.html",
  styleUrls: ["./signin-modal.component.css"],
  providers: [DatePipe]
})
export class SigninModalComponent implements OnInit {

  
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
  currentPath: string;
  modalRef9: BsModalRef;
  companyNamesDetails: any;
  companyNames: any;
  errorMsg: any = "Something went wrong. Please try again in some time.";
  status_code:any;
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
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SigninModalComponent>,
    public datepipe: DatePipe
  ) {
    this.btn_Sign();
    this.adm.getUserId().subscribe(data => {
      this.logged_in =
        data != "" && data != null && data != undefined ? true : false;
      this.showbtn = !this.logged_in;
    });
    this.adm.getUserName().subscribe(data => {
      this.user_name = data;
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
  ngOnInit() {
    this.forgetpassForm = this.formbuilder.group({
      username: ["", [Validators.required]]
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

    this.signupForm2 = this.formbuilder.group({
      mobile_no: ["", [Validators.required, Validators.pattern(this.mobnumPattern)]],
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

  toastrmsg(type, title) {
  //  console.log("toastermsg", type, title);
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
   // console.log(this.domainLst )
  
  // this.modalRef2 = this.modalService.show(signup, { backdrop: "static" });

    try {
      //this.modalRef.hide();
      this.dialogRef.close();
    } catch (e) {}
    this.signupForm.controls["otp_verified"].setValue("0");
    this.otp_verified = 0;
    this.ref.markForCheck();
    this.shfrmSFFirst = true;
    this.shfrmSFSecond = false;
    this.shfrmSFThird = false;
    this.router.navigate(['/signUpPage']);
    
  }
  openModal(signin: TemplateRef<any>) {
    //this.modalRef = this.modalService.show(signin, { backdrop: 'static' });
    const dialogRef = this.dialog.open(SigninModalComponent, {
      disableClose: true
    });
    // return false;

    try {
      this.modalRef2.hide();
    } catch (e) {}
  }
  Modalforgotpassw(forgotpassw: TemplateRef<any>) {
    this.modalRef3 = this.modalService.show(forgotpassw, {
      backdrop: "static"
    });

    try {
      //this.modalRef.hide();
      this.dialogRef.close();
    } catch (e) {}
  }
 // Login on Enter key press
 keyDownFunction(event,username: any, password: any, loginsuccess: TemplateRef<any>) {
  if (event.keyCode === 13) {
    this.Login(username, password,loginsuccess);
  }
}

  // Login function
  Login(username: any, password: any, loginsuccess: TemplateRef<any>) {
    //localStorage.setItem('username',username);
    //localStorage.setItem('password',password);
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
    password = btoa(password);
    //console.log("username password"+username+':' +password)
    var json = { username: username, password: password };
    this.spinnerService.show();
    this.adm.Login(json).subscribe((data: any) => {
      var response = data._body;
      this.loginResponse = JSON.parse(response);
      if (this.loginResponse.status == true) {
        var timer = this.SessionService.session();
        this.show = false;

        localStorage.setItem("jwt",this.loginResponse.jwttoken)
        this.spinnerService.hide();

        let respData =  this.loginResponse.data;

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

        this.adm.LoginPortal(nonEncodedJson).subscribe(
          res => {
            console.log("LoginPortal success");
            //this.router.navigate([this.router.url]);
          },
          err => {
            console.log("LoginPortal error")
           // this.router.navigate([this.router.url]);
          }
        );
        this.dialogRef.close();
        /**
         * Start here 
         * */
        this.sessionSet("username", this.loginResponse.data.username);
    localStorage.setItem("username", this.loginResponse.data.username);
    localStorage.setItem("password", this.loginResponse.data.password);
    localStorage.setItem("id", this.loginResponse.data.id);
    localStorage.setItem("role", "user");
    localStorage.setItem("email", this.loginResponse.data.email);
    this.adm.sendUserId(this.loginResponse.data.id);

   
    /**
     * End here
     */
        this.modalRef4 = this.modalService.show(loginsuccess, {
          backdrop: "static"
        });

       // this.router.navigate([this.router.url]);
      } else {
        this.spinnerService.hide();
        this.isusername = false;
        this.issetpwd = false;
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
     // this.router.navigate(['error']);
      this.toastrmsg('error',this.errorMsg);
    },);
  }
  //  Signup function

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
    //var CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds();
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
          this.currentPath = this.router.url;

         // this.router.navigate([this.currentPath]);
        } else {
          this.shfrmSFThird = true;
          this.shfrmSFSecond = false;
          this.shfrmSFFirst = false;
          this.toastrmsg("error", obj.message);
        }
      },
      err => {
        console.log('err', err);
       // this.router.navigate(['error']);
        this.toastrmsg('error',this.errorMsg);
      },);
    } catch {
      this.toastrmsg("error", console.error());
    }
  }

  signup_jira() {
    var CurrentTime = formatDate(this.today, "yyyy-MM-dd", "en-US", "+0530");
    //var CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds();
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
       // this.router.navigate(['error']);
        this.toastrmsg('error',this.errorMsg);
      },);
    } catch {}
  }

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
            this.shfrmSFThird = true;
            this.shfrmSFFirst = false;
            this.shfrmSFSecond = false;
            this.signupForm.controls["otp_verified"].setValue("1");
            this.otp_verified = 1;
            //this.toastrmsg('success', "Verified Otp");
          } else {
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
         // this.router.navigate(['error']);
          this.toastrmsg('error',this.errorMsg);
        },);
    } catch {}
  }

  // new signup form function
  save1() {
    this.shfrmSFSecond = true;
    this.shfrmSFFirst = false;
    this.shfrmSFThird = false;
  }

  save2() {
    this.verifyOtp1();
  }

  // End region

  // Documentation(signin: any) {
  //   if (localStorage.getItem('id') != null) {
  //     this.router.navigate(['/documentation']);
  //     localStorage.setItem('IsReload', 'true');
  //   } else {
  //     this.modalRef = this.modalService.show(signin, { backdrop: 'static' });
  //     this.modalRef2.hide();
  //   }
  // }
  Documentation(signin: any) {
    this.router.navigate(["/documentation"]);
    localStorage.setItem("IsReload", "true");
  }

  // forget Password function
  forgot(username: any,forgotpasswreset: TemplateRef<any>) {
    console.log('forgot pass click');
    if (username == '') {
      console.log('user name empty');
      this.toastrmsg('error', 'Enter Username');
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
        // this.toastrmsg('success', 'Please check your mail');
        //this.router.navigate(['/index']);
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
       // this.router.navigate(['error']);
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

  //  Fuction for Logout
  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("jwt")
    localStorage.removeItem('lastLoginDate');
    localStorage.removeItem('misUserVal');
    localStorage.removeItem('Firstname');
    localStorage.removeItem('isInternalUser');
    this.adm.sendUserId("");
    this.showbtn = true;
    this.showlogoutbtn = false;
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
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }, 10);
  }

   //login success pop up modal
   clickOk() {
    this.modalRef4.hide();
    if (this.router.url === "/documentation"){
      this.router.navigate(['explore-api']); 
    } else if( localStorage.getItem("userEnteredText")!= "" || localStorage.getItem("userEnteredText")!= undefined ){
      this.router.navigate(['viewallapi']);
    }
    else{
      this.router.navigate([this.currentPath]);
    }
    
   /* this.sessionSet("username", this.loginResponse.data.username);
    localStorage.setItem("username", this.loginResponse.data.username);
    localStorage.setItem("password", this.loginResponse.data.password);
    localStorage.setItem("id", this.loginResponse.data.id);
    localStorage.setItem("role", "user");
    localStorage.setItem("email", this.loginResponse.data.email);
    this.adm.sendUserId(this.loginResponse.data.id);

    this.router.navigate([this.router.url]);*/
  }
  modalRef4Close() {
    this.modalRef4.hide();
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
