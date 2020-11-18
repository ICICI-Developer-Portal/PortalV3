import { Component, OnInit, TemplateRef, ɵConsole } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { ToasterService, Toast } from "angular2-toaster";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router,NavigationEnd  } from "@angular/router";
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
declare var $: any;
@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  logged_in: Boolean = false;
  reactiveForm: FormGroup;



  constructor(
    private http: Http,
    private HttpClient: HttpClient,
    private formbuilder: FormBuilder,
    private objOnBoarding: VariablesService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private adm: LoginService,
    private toasterService: ToasterService,
    private dashboardService: DashboardService
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
        "CompanyName": new FormControl(edit ? edit.CompanyName : null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
        "domainName": new FormControl(edit ? edit.domainName : null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
        "pinCode": new FormControl(edit ? edit.pinCode : null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
        "rm_emp_id": new FormControl(),
        "partnerCode": new FormControl(edit ? edit.partnerCode : null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),

       
      }),
      "secondSection": new FormGroup({
        "mobileNumber": new FormControl([]),
        "otp": new FormControl(),
      }),
      "thirdSection": new FormGroup({
        "userName": new FormControl(),
        "Password": new FormControl(),
        "confirmPassowrd": new FormControl(),
        "clientCode": new FormControl(),
        "url": new FormArray([ 
          new FormControl(null, [Validators.pattern(regURL)]),
        ]),
    

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

}
