import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, Renderer2, Pipe,ViewChild, HostListener, ElementRef, ɵConsole } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { LoginService } from 'src/app/services';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';
declare var $:any;


@Component({
  selector: 'app-report-issue-page',
  templateUrl: './report-issue-page.component.html',
  styleUrls: ['./report-issue-page.component.css']
})
export class ReportIssuePageComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private adm: LoginService,

    private elementRef: ElementRef) {
    // this.adm.getUserId().subscribe(data => {
    //   this.logged_in =
    //     data != "" && data != null && data != undefined ? true : false;
    // });

    this.reactiveForm = this.reportAnIssueFormControl();
  }

  ngOnInit() {
  }
  reportAnIssueFormControl(){
    return new FormGroup({
    reactiveForm : new FormGroup({
        "issueType": new FormControl(),
        "api": new FormControl(),
        "onboardingID":new FormControl(),
        "problemSeverity":new FormControl(),
        "issueDescreption":new FormControl(),
        "firstObservedDate":new FormControl(),
        "supportingLogs":new FormControl(),
        "name":new FormControl(),
        "email":new FormControl(),
        "contactNo":new FormControl(),
// issueType :
// api :
// onboardingID:
// problemSeverity:
// issueDescription:
// firstObservedDate:
// name:
// email:
// contactNo:
// supportingLogs: attachment
  })
});
}
createReportIssue(body,header){
  this.adm.createTranscationHistory(body,header).subscribe(
    (data:any) => {
        console.log(JSON.parse(JSON.stringify(data)));
        // this.modalRef = this.modalService.show(this.Prodconfirm, {
        //   backdrop: "static"
        // });
        let callbackResponse="Your callback response is captured sucessfully"
        // this.confirmMsgProd = res.jiraId;
//  this.modalRef ;
// this.openModalcallbackURL(this.Prodconfirm) 

      },
      err => {
        let callbackResponse="Failed"

        console.log('err', err);
       // this.router.navigate(['error']);
      },

  );
}
submitOnReportIssue(){
  const reactivefrmcontrols= this.reactiveForm.controls;
  console.log(this.reactiveForm.value   )
  console.log(reactivefrmcontrols)
  let header = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    "token" : localStorage.getItem("jwt"),
    "username" :localStorage.getItem("username"),
  });
 
  let formData = new URLSearchParams();
  // formData.set("headers","application/json");
  formData.set("issueType","json")
  formData.set("api","form.value.Request")
  formData.set("onboardingID","form.controls.Response.value")
  formData.set("problemSeverity","this.idForClickedTab")
  formData.set("issueDescription","601")
  formData.set("firstObservedDate","5")
  formData.set("name",localStorage.getItem("jwt"))
  formData.set("email",localStorage.getItem("username"))
  formData.set("contactNo","QR Code")
  formData.set("supportingLogs","attachnnt")


// console.log("yes created")
  this.createReportIssue(formData.toString(),header);
    
}
}

