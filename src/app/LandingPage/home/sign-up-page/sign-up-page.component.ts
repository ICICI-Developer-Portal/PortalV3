import { Component, OnInit, TemplateRef, ɵConsole } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { ToasterService, Toast } from "angular2-toaster";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router,NavigationEnd  } from "@angular/router";
import { SessionService } from "src/app/services/session.service";
import { AuthService } from "src/app/services/auth.service";
import { ChangeDetectorRef } from "@angular/core";



import { LoginService } from "src/app/services";
import { PasswordValidation } from "../../layout/header/password.validator";
import { VariablesService } from "src/app/services/Variables.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import {
  Http,
  Headers,
  RequestOptions,
  Response,
  RequestMethod,
  ResponseContentType
} from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
declare var showProdTabEnv: any; // just change here from arun answer.
declare var openProdCurrentTabEnv: any;
import { formatDate } from "@angular/common";
import { CONSTANTS } from "config/application-constant";
import { PATTERNS } from "config/regex-pattern";
import { DashboardService } from "src/app/services/dashboard.service";
import { DomSanitizer } from '@angular/platform-browser';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { CustomValidators } from "../../layout/header/custom-validators";
import { DatePipe } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
  providers: [DatePipe]

})
export class SignUpPageComponent implements OnInit {
  logged_in: Boolean = false;
  reactiveForm: FormGroup;
  companyNamesDetails: any;
  companyNames: any;
  domainLst: any[];
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  isotp_reg_check: string = "";


  showOtp: boolean = true;
  show: boolean = false;
  otp_txt_id: any = "";
  otp_verified="";





  errorMsg:any = "Something went wrong. Please try again in some time.";





  constructor(
    private http: Http,
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
    // this.objOnB = this.objOnBoarding.getonBoarding();
    // this.Hide_signbtn();

    // sessionStorage.setItem("1105", "false");
    // sessionStorage.setItem("1106", "false");
    // sessionStorage.setItem("1107", "false");
    this.adm.getUserId().subscribe(data => {
      this.logged_in =
        data != "" && data != null && data != undefined ? true : false;
    });
    this.get_domain_and_apis();

    
  }


  ngOnInit() {
    let edit = ''
    this.resetForm(edit);
    $(function ($) {

      $(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if (
      $(this)
        .parent()
        .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });
  
  $("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
  });
  
        
     
     
  });
  }
  resetForm(edit) {
    //regex for https url validatio
    const regURL = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
    const ipReg = '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$';  

    this.reactiveForm = new FormGroup({
      'firstSection': new FormGroup({
        "firstName": new FormControl(edit ? edit.firstName : null, Validators.required),
        "lastName": new FormControl(),
        // "description": new FormControl(edit ? edit.description : null, Validators.required),
        "email": new FormControl(edit ? edit.email : null, [Validators.required,Validators.email]),
        "CompanyName": new FormControl(edit ? edit.CompanyName : null, [Validators.required]),
        "domainName": new FormControl(edit ? edit.domainName : null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
        "domainNm": new FormControl(edit ? edit.CompanyName : null, [Validators.required]),
        "pinCode": new FormControl(edit ? edit.pinCode : null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
        "rm_emp_id": new FormControl(),
        "partnerCode": new FormControl(edit ? edit.partnerCode : null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),

       
      }),
      "secondSection": new FormGroup({
        "mobileNumber": new FormControl(edit ? edit.mobileNumber : null, [Validators.required, Validators.maxLength(10), Validators.pattern(this.mobnumPattern)]),
        "otp":  new FormControl(edit ? edit.firstName : null, Validators.required),
      }),
      "thirdSection": new FormGroup({
        "userName": new FormControl(edit ? edit.userName : null, Validators.required),
        // "confirmPassowrd": new FormControl(),
        "Password": new FormControl(edit ? edit.Password : null, Validators.required),
        "confirmPassowrd":new FormControl(edit ? edit.confirmPassowrd : null, Validators.required),
        "term": new FormControl(edit ? edit.term : null, Validators.required),  
    

        // "port": new FormControl(),
        // "refJIRAID": new FormControl(),
        // "file1": new FormControl(null, [Validators.required]),
        // "checkBox": new FormControl(false, [Validators.requiredTrue])
      }),
     
    })
    // this.reactiveForm.get("basicDetailsSection.email_id").setValue(this.email);
    // this.reactiveForm.get("basicDetailsSection.merchantName").setValue(this.companyName);    
    // this.reactiveForm.get("basicDetailsSection.contact_no").setValue(this.mobileNo);
    // this.reactiveForm.get("basicDetailsSection.r_m_maild_id").setValue(this.rm);

  }
  
  toastrmsg(type, title) {
    var toast: Toast = {
      type: type,
      showCloseButton: true,
      title: "",
      body: title
      
    };
    this.toasterService.pop(toast);
  }
  get companyName() {
    return this.reactiveForm.get("CompanyName");
  }
    //componay name autocomplete
    getCompanyName(companyName) {
    //  
      this.adm.getCompanyName(companyName).subscribe(data => {
        console.log("rchd",data)
        if (data.status === 200) {
          this.companyNamesDetails = data;
          this.companyNames = JSON.parse(this.companyNamesDetails._body);
          console.log("rchd", this.companyNames,this.companyNamesDetails._body)
        
        }
      },
      err => {
        console.log('err', err);
       // this.router.navigate(['error']);
        this.toastrmsg('error',this.errorMsg);
      },);
    }
    getr(){
      console.log("rchd",this.reactiveForm.value)
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


  //aapathonSignUpForm
  appathonSendOtp(mobile: any) {
    try {
      if (mobile == "") {
        //this.toastrmsg('error', "Enter Mobile Number");
        return;
      }
      var json = {
        mobile_no: mobile
      };
      this.adm.SendOTP(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == true) {
          this.showOtp = true;
          this.show = true;
          this.otp_txt_id = obj.data;
          //this.toastrmsg('success', "OTP Sent");
        } else {
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
   verifyOtp2() {
     console.log("111")
    try {
      this.adm.verify_otp(this.reactiveForm.get('secondSection').value, this.otp_txt_id)
        .subscribe((data: any) => {
          var response = data._body;
          var obj = JSON.parse(response);
          if (obj != "") {
            // this.shfrmSFThird1 = true;
            // this.shfrmSFFirst1 = false;
            // this.shfrmSFSecond1 = false;
            // this.appathonSignupForm.controls["otp_verified"].setValue("1");
             this.otp_verified = "1";
           
            this.toastrmsg('success', "Verified Otp");
          } else {
            // this.shfrmSFSecond1 = true;
            // this.shfrmSFThird1 = false;
            // this.shfrmSFFirst1 = false;
            // this.appathonSignupForm.controls["otp_verified"].setValue("0");
            

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
    console.log()
  }

  today = new Date();
  sign_up() {
    console.log("hiii")
    var CurrentTime = formatDate(
      this.today,
      "dd-MM-yyyy hh:mm:ss a",
      "en-US",
      "+0530"
    );
    console.log(CurrentTime,"json","-====")
    //var CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+ new Date().getSeconds();
    try {
      console.log("json","-====") 
      var json = {
        username: this.reactiveForm.get('thirdSection.userName'),
        password: this.reactiveForm.get('thirdSection.mobileNumber').value,
        email: this.reactiveForm.get('firstSection.email').value,
        firstname: this.reactiveForm.get('firstSection.firstName').value,
        lastName:  this.reactiveForm.get('firstSection.lastName').value,
        domainNm: this.reactiveForm.get('firstSection.domainNm').value,
        companyName: this.reactiveForm.get('firstSection.companyName').value,
        contactNo: this.reactiveForm.get('firstSection.mobileNumber').value,
        CITY:  this.reactiveForm.get('firstSection.pinCode').value,
        RM: this.reactiveForm.get('firstSection.rm_emp_id').value,
        partnerCode:this.reactiveForm.get('firstSection.partnerCode').value,
        tncConfirmed: "1",
        tncConfirmedDt: CurrentTime,
        approverName: "YES",
        approverEmailId: "YES",
        requestDt: CurrentTime
      };
      console.log(json,"-====")
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
          // this.spinnerService.hide();
          // this.signupForm.reset();
          // this.signupForm2.reset();
          // this.signupForm3.reset();
          // this.signupForm4.reset();
          // this.modalRef2.hide();
          // this.shfrmSFFirst = true;
          // this.shfrmSFSecond = false;
          // this.shfrmSFThird = false;

          this.router.navigate(["/index"]);
        } else {
          // this.shfrmSFThird = true;
          // this.shfrmSFSecond = false;
          // this.shfrmSFFirst = false;
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

  
  signup_jira() {
    var CurrentTime = formatDate(this.today, "yyyy-MM-dd", "en-US", "+0530");
    //var CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+ new Date().getSeconds();
    var json = {

      userName: this.reactiveForm.get('thirdSection.userName'),
      email: this.reactiveForm.get('firstSection.email').value,
      firstName: this.reactiveForm.get('firstSection.firstName').value,
      lastName:  this.reactiveForm.get('firstSection.lastName').value,
      domainNm: this.reactiveForm.get('firstSection.domainNm').value,
      companyName: this.reactiveForm.get('firstSection.companyName').value,
      contactNo: this.reactiveForm.get('firstSection.mobileNumber').value,
       CITY: "Mumbai",

      RM: this.reactiveForm.get('firstSection.rm_emp_id').value,
      partnerCode:this.reactiveForm.get('firstSection.partnerCode').value,
      // password: this.reactiveForm.get('thirdSection.mobileNumber').value,
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

}
