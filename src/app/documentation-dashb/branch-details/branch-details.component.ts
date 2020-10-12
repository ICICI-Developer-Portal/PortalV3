//import { Component, OnInit, TemplateRef, Pipe, ɵConsole } from "@angular/core";
import { Component, OnInit, TemplateRef, ViewChild, ViewChildren, ElementRef, QueryList, EventEmitter, Output, Input } from '@angular/core';

import { LoginService } from "src/app/services";
import { NgxXml2jsonService } from "ngx-xml2json";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { CONSTANTS } from 'config/application-constant';
import { Router } from "@angular/router";
import { ToasterService, Toast } from 'angular2-toaster';

declare var $: any;
@Component({
  selector: "app-branch-details",
  templateUrl: "./branch-details.component.html"
  //styleUrls: ['./branch-details.component.css']
})
export class BranchDetailsComponent implements OnInit {
  id: any;
  resp: any;
  description: any;
  branchId: any;
  obj: any;
  image:any;
  file:any;
  faq:any = false;
  faqEazypay:any= false;
  eazypay:any ;
  compositpay:any;
  faqObj:any;
  faqHeader:any;
  faqObjQues:any=[];
  faqObjQues_eazy:any=[];
  faqObjAns:any=[];
  faqObjAns_eazy:any=[];
  faqObjList:any;
  faqHeaderList:any;
  

  /** @class BranchDetailsComponent
   * @constructor
   */
  constructor(
    private route: ActivatedRoute,
    private adm: LoginService,
    private ngxXml2jsonService: NgxXml2jsonService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    private toasterService: ToasterService
  ) {
    this.route.params.subscribe(params => {
      this.branchId = params["id"];
      this.newApplication();
      let num = this.branchId;
      if(num === "201" || num === 201 ){
        this.faq= false;
        this.faqEazypay= true;
        this.eazypay= true;
        this.compositpay= false;
        
      }else if(num === "207" || num === 207){
        this.faq= true;
        this.faqEazypay= false;
        this.compositpay= true;
        this.eazypay= false;
      }else{
        this.faq= false;
        this.eazypay= false;
        this.compositpay= false;
        this.faqEazypay= false;
      }
    });
  }
  constants = CONSTANTS;
  ngOnInit() {
   
    this.adm.faq().subscribe((data:any)=> {
      this.faqObjList = data._body;
      this.faqObjList= this.faqObjList.replace(/\\n/g, "\\\\n")
      this.faqObj = JSON.parse(this.faqObjList);
     for (var i  in this.faqObj){
       if(this.faqObj[i][0] ==='Eazypay'){
          this.faqObjQues_eazy.push(this.faqObj[i][1])
          this.faqObjAns_eazy.push(this.faqObj[i][2])
          this.faqObjAns_eazy= this.faqObjAns_eazy.map(function(str) {
            return str.replace(/\\n/g, '\n')
          });
       }else if(this.faqObj[i][0] ==='CompositeAPI'){
          this.faqObjQues.push(this.faqObj[i][1])
          this.faqObjAns.push(this.faqObj[i][2])
          this.faqObjAns= this.faqObjAns.map(function(str) {
            return str.replace(/\\n/g, '\n')
          });
      }
      
      }
      //this.faqHeaderList = JSON.parse(this.faqObjList)
     // this.faqHeader = this.faqHeaderList["1"][0]
  },
  err => {
    console.log('err', err);
   // this.router.navigate(['error']);
    this.toastrmsg('error',"Something went wrong. Please try again in some time.");
    
  },)

  }
 
  /** get branch node details
   * @class BranchDetailsComponent
   * @method newApplication
   */
  newApplication() {
    this.spinnerService.show();
    this.adm.api_description(this.branchId).subscribe((data: any) => {
      var response = data._body;
      this.spinnerService.hide();
      this.obj = JSON.parse(response);
      this.resp = this.obj[0].TAB_NAME;
      this.description = this.obj[0].DESCRIPTION;
      this.image = this.obj[0].IMAGE_URL;
      this.file = this.obj[0].FILE_URL;
    },
    err => {
      console.log('err', err);
     // this.router.navigate(['error']);
      this.toastrmsg('error',"Something went wrong. Please try again in some time.");
    },);
  }
  
   /** get branch node details
   * @class BranchDetailsComponent
   * @method downloadFile
   */
  downloadFile() {
    
    let dwldLink = document.createElement("a");
    
    let isSafariBrowser =
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1;
    if (isSafariBrowser) {
      dwldLink.setAttribute("target", "_blank");
    }

    if(this.faqEazypay){
      this.file = "https://developer.icicibank.com/assets/documents/Eazypay.zip";
    }
    dwldLink.setAttribute("href", this.file);
    //dwldLink.setAttribute("download", fileName + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  } 
   /** get branch node details
   * @class BranchDetailsComponent
   * @method downloadFAQ
   */
  downloadFAQ() {
    
    let dwldLink = document.createElement("a");
    
    let isSafariBrowser =
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1;
    if (isSafariBrowser) {
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", "https://developer.icicibank.com/assets/documents/UPI Merchant Integrations FAQs - Consolidated.docx");
    //dwldLink.setAttribute("download", fileName + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
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
