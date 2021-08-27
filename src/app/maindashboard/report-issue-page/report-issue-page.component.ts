import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, Renderer2, Pipe,ViewChild, HostListener, ElementRef, ɵConsole } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';


import { LoginService } from 'src/app/services';
import { DashboardService } from 'src/app/services/dashboard.service';

import { NgxXml2jsonService } from 'ngx-xml2json';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';
import { ToasterService, Toast } from 'angular2-toaster';

declare var $:any;


@Component({
  selector: 'app-report-issue-page',
  templateUrl: './report-issue-page.component.html',
  styleUrls: ['./report-issue-page.component.css'],
  providers: [DatePipe],

})
export class ReportIssuePageComponent implements OnInit {
    modalRef: BsModalRef;

  reactiveForm: FormGroup;
  selectedProduct:string;
  selectedEnv:string;
  showReportIssue:boolean=false;
  showMyIssue:boolean=false;
  api=[];
  productName=["Eazypay","Arteria","RTGS","UPI","HL topup","IMPS","NEFT","AL topup"];
  domain=["Business banking", "Loans and Cards", "Payments", "Accounts and Deposits"];
  issueType=[];
  getProductIssue=[];
  dateInput: any;
  maxDate:any;
  minDate:any;
  getProductIssuep=[
    {
        "product": "UPI Collections",
        "environment": "Production",
        "api": "Intent,Collect,Dynamic QR,Static QR,PAN validation",
        "issues": [
            {
                "issueId": "1",
                "issueType": "Production callback issues",
                "team": "Eazypay",
                "severity": "P0"
            },
            {
                "issueId": "2",
                "issueType": "Low success rate",
                "team": "Eazypay",
                "severity": "P0"
            },
            {
                "issueId": "3",
                "issueType": "Production MID configuration at APIG",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "4",
                "issueType": "Encryption/Decryption Issue",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "5",
                "issueType": "Forbidden IPs",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "6",
                "issueType": "Settlement MIS not generated",
                "team": "Eazypay",
                "severity": "P1"
            },
            {
                "issueId": "7",
                "issueType": "Statement file not placed in SFTP",
                "team": "Eazypay",
                "severity": "P1"
            },
            {
                "issueId": "34",
                "issueType": "Other",
                "team": "API G/w",
                "severity": "P2"
            }
        ]
    },
    {
        "product": "UPI Collections",
        "environment": "UAT",
        "api": "Intent,Collect,Dynamic QR,Static QR,PAN validation",
        "issues": [
            {
                "issueId": "4",
                "issueType": "Encryption/Decryption Issue",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "8",
                "issueType": "IP Change",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "9",
                "issueType": "Callback URL Testing @APIGW",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "10",
                "issueType": "DMO / Dynamic VPA Configuration @Switch",
                "team": "Eazypay",
                "severity": "P2"
            },
            {
                "issueId": "11",
                "issueType": "API Integration",
                "team": "API G/w",
                "severity": "P2"
            },
            {
                "issueId": "12",
                "issueType": "SFTP Port Opening Setup",
                "team": "Eazypay",
                "severity": "P2"
            },
            {
                "issueId": "13",
                "issueType": "UAT Credentials creation(after complete documentation)",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "14",
                "issueType": "UAT Completion (If at our side)",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "34",
                "issueType": "Other",
                "team": "API G/w",
                "severity": "P2"
            }
        ]
    },
    {
        "product": "IMPS",
        "environment": "Production",
        "api": "Composite API",
        "issues": [
            {
                "issueId": "15",
                "issueType": "MIS and Recon Files not available over SFTP",
                "team": "Eazypay",
                "severity": "P1"
            },
            {
                "issueId": "16",
                "issueType": "Transaction status",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "17",
                "issueType": "Missing Batch files of OCH",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "18",
                "issueType": "EOD Batch files not available for OCH",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "19",
                "issueType": "Batch limit exhausted -OCH",
                "team": "Switch",
                "severity": "P0"
            },
            {
                "issueId": "20",
                "issueType": "Improper narration in Bank statement for IMPS _OCH",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "21",
                "issueType": "Connectivity issues",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "22",
                "issueType": "IP whitelisting error",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "23",
                "issueType": "Increase in certain response code like 31, 61 etc,",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "24",
                "issueType": "New error codes",
                "team": "Switch",
                "severity": "P2"
            },
            {
                "issueId": "25",
                "issueType": "Issues related to Alias ID and user ID",
                "team": "CIB",
                "severity": "P1"
            },
            {
                "issueId": "26",
                "issueType": "New IP addition or delisting Ips",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "27",
                "issueType": "MIS not available",
                "team": "Eazypay",
                "severity": "P1"
            },
            {
                "issueId": "28",
                "issueType": "Bene validation and Registration failure",
                "team": "CIB",
                "severity": "P0"
            },
            {
                "issueId": "35",
                "issueType": "Error code clarification on existing error code list",
                "team": "Switch",
                "severity": "P2"
            },
            {
                "issueId": "30",
                "issueType": "Certificate change",
                "team": "API G/w",
                "severity": "P2"
            },
            {
                "issueId": "31",
                "issueType": "Network timeout",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "32",
                "issueType": "Packet drop",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "4",
                "issueType": "Encryption/Decryption Issue",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "34",
                "issueType": "Other",
                "team": "API G/w",
                "severity": "P2"
            }
        ]
    },
    {
        "product": "NEFT",
        "environment": "Production",
        "api": "Composite API",
        "issues": [
            {
                "issueId": "15",
                "issueType": "MIS and Recon Files not available over SFTP",
                "team": "Eazypay",
                "severity": "P1"
            },
            {
                "issueId": "16",
                "issueType": "Transaction status",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "17",
                "issueType": "Missing Batch files of OCH",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "18",
                "issueType": "EOD Batch files not available for OCH",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "19",
                "issueType": "Batch limit exhausted -OCH",
                "team": "Switch",
                "severity": "P0"
            },
            {
                "issueId": "20",
                "issueType": "Improper narration in Bank statement for IMPS _OCH",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "21",
                "issueType": "Connectivity issues",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "22",
                "issueType": "IP whitelisting error",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "23",
                "issueType": "Increase in certain response code like 31, 61 etc,",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "24",
                "issueType": "New error codes",
                "team": "Switch",
                "severity": "P2"
            },
            {
                "issueId": "25",
                "issueType": "Issues related to Alias ID and user ID",
                "team": "CIB",
                "severity": "P1"
            },
            {
                "issueId": "26",
                "issueType": "New IP addition or delisting Ips",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "27",
                "issueType": "MIS not available",
                "team": "Eazypay",
                "severity": "P1"
            },
            {
                "issueId": "28",
                "issueType": "Bene validation and Registration failure",
                "team": "CIB",
                "severity": "P0"
            },
            {
                "issueId": "35",
                "issueType": "Error code clarification on existing error code list",
                "team": "Switch",
                "severity": "P2"
            },
            {
                "issueId": "30",
                "issueType": "Certificate change",
                "team": "API G/w",
                "severity": "P2"
            },
            {
                "issueId": "31",
                "issueType": "Network timeout",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "32",
                "issueType": "Packet drop",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "4",
                "issueType": "Encryption/Decryption Issue",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "34",
                "issueType": "Other",
                "team": "API G/w",
                "severity": "P2"
            }
        ]
    },
    {
        "product": "NEFT",
        "environment": "UAT",
        "api": "Composite API",
        "issues": [
            {
                "issueId": "4",
                "issueType": "Encryption/Decryption Issue",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "8",
                "issueType": "IP Change",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "33",
                "issueType": "API Testing @APIGW",
                "team": "API G/w",
                "severity": "P2"
            },
            {
                "issueId": "11",
                "issueType": "API Integration",
                "team": "API G/w",
                "severity": "P2"
            },
            {
                "issueId": "12",
                "issueType": "SFTP Port Opening Setup",
                "team": "Eazypay",
                "severity": "P2"
            },
            {
                "issueId": "13",
                "issueType": "UAT Credentials creation(after complete documentation)",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "14",
                "issueType": "UAT Completion (If at our side)",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "34",
                "issueType": "Other",
                "team": "API G/w",
                "severity": "P2"
            }
        ]
    },
    {
        "product": "UPI",
        "environment": "Production",
        "api": "Composite API",
        "issues": [
            {
                "issueId": "15",
                "issueType": "MIS and Recon Files not available over SFTP",
                "team": "Eazypay",
                "severity": "P1"
            },
            {
                "issueId": "16",
                "issueType": "Transaction status",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "17",
                "issueType": "Missing Batch files of OCH",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "18",
                "issueType": "EOD Batch files not available for OCH",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "19",
                "issueType": "Batch limit exhausted -OCH",
                "team": "Switch",
                "severity": "P0"
            },
            {
                "issueId": "20",
                "issueType": "Improper narration in Bank statement for IMPS _OCH",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "21",
                "issueType": "Connectivity issues",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "22",
                "issueType": "IP whitelisting error",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "23",
                "issueType": "Increase in certain response code like 31, 61 etc,",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "24",
                "issueType": "New error codes",
                "team": "Switch",
                "severity": "P2"
            },
            {
                "issueId": "25",
                "issueType": "Issues related to Alias ID and user ID",
                "team": "CIB",
                "severity": "P1"
            },
            {
                "issueId": "26",
                "issueType": "New IP addition or delisting Ips",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "27",
                "issueType": "MIS not available",
                "team": "Eazypay",
                "severity": "P1"
            },
            {
                "issueId": "28",
                "issueType": "Bene validation and Registration failure",
                "team": "CIB",
                "severity": "P0"
            },
            {
                "issueId": "29",
                "issueType": "Error code clarification on existing error codes list",
                "team": "CIB",
                "severity": "P2"
            },
            {
                "issueId": "30",
                "issueType": "Certificate change",
                "team": "API G/w",
                "severity": "P2"
            },
            {
                "issueId": "31",
                "issueType": "Network timeout",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "32",
                "issueType": "Packet drop",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "4",
                "issueType": "Encryption/Decryption Issue",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "34",
                "issueType": "Other",
                "team": "API G/w",
                "severity": "P2"
            }
        ]
    },
    {
        "product": "UPI",
        "environment": "UAT",
        "api": "Composite API",
        "issues": [
            {
                "issueId": "4",
                "issueType": "Encryption/Decryption Issue",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "8",
                "issueType": "IP Change",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "33",
                "issueType": "API Testing @APIGW",
                "team": "API G/w",
                "severity": "P2"
            },
            {
                "issueId": "11",
                "issueType": "API Integration",
                "team": "API G/w",
                "severity": "P2"
            },
            {
                "issueId": "12",
                "issueType": "SFTP Port Opening Setup",
                "team": "Eazypay",
                "severity": "P2"
            },
            {
                "issueId": "13",
                "issueType": "UAT Credentials creation(after complete documentation)",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "14",
                "issueType": "UAT Completion (If at our side)",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "34",
                "issueType": "Other",
                "team": "API G/w",
                "severity": "P2"
            }
        ]
    },
    {
        "product": "RTGS",
        "environment": "Production",
        "api": "Composite API",
        "issues": [
            {
                "issueId": "15",
                "issueType": "MIS and Recon Files not available over SFTP",
                "team": "Eazypay",
                "severity": "P1"
            },
            {
                "issueId": "16",
                "issueType": "Transaction status",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "17",
                "issueType": "Missing Batch files of OCH",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "18",
                "issueType": "EOD Batch files not available for OCH",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "19",
                "issueType": "Batch limit exhausted -OCH",
                "team": "Switch",
                "severity": "P0"
            },
            {
                "issueId": "20",
                "issueType": "Improper narration in Bank statement for IMPS _OCH",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "21",
                "issueType": "Connectivity issues",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "22",
                "issueType": "IP whitelisting error",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "23",
                "issueType": "Increase in certain response code like 31, 61 etc,",
                "team": "Switch",
                "severity": "P1"
            },
            {
                "issueId": "24",
                "issueType": "New error codes",
                "team": "Switch",
                "severity": "P2"
            },
            {
                "issueId": "25",
                "issueType": "Issues related to Alias ID and user ID",
                "team": "CIB",
                "severity": "P1"
            },
            {
                "issueId": "26",
                "issueType": "New IP addition or delisting Ips",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "27",
                "issueType": "MIS not available",
                "team": "Eazypay",
                "severity": "P1"
            },
            {
                "issueId": "28",
                "issueType": "Bene validation and Registration failure",
                "team": "CIB",
                "severity": "P0"
            },
            {
                "issueId": "29",
                "issueType": "Error code clarification on existing error codes list",
                "team": "CIB",
                "severity": "P2"
            },
            {
                "issueId": "30",
                "issueType": "Certificate change",
                "team": "API G/w",
                "severity": "P2"
            },
            {
                "issueId": "31",
                "issueType": "Network timeout",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "32",
                "issueType": "Packet drop",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "4",
                "issueType": "Encryption/Decryption Issue",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "34",
                "issueType": "Other",
                "team": "API G/w",
                "severity": "P2"
            }
        ]
    },
    {
        "product": "RTGS",
        "environment": "UAT",
        "api": "Composite API",
        "issues": [
            {
                "issueId": "4",
                "issueType": "Encryption/Decryption Issue",
                "team": "API G/w",
                "severity": "P0"
            },
            {
                "issueId": "8",
                "issueType": "IP Change",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "33",
                "issueType": "API Testing @APIGW",
                "team": "API G/w",
                "severity": "P2"
            },
            {
                "issueId": "11",
                "issueType": "API Integration",
                "team": "API G/w",
                "severity": "P2"
            },
            {
                "issueId": "12",
                "issueType": "SFTP Port Opening Setup",
                "team": "Eazypay",
                "severity": "P2"
            },
            {
                "issueId": "13",
                "issueType": "UAT Credentials creation(after complete documentation)",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "14",
                "issueType": "UAT Completion (If at our side)",
                "team": "API G/w",
                "severity": "P1"
            },
            {
                "issueId": "34",
                "issueType": "Other",
                "team": "API G/w",
                "severity": "P2"
            }
        ]
    }
];
rm;
issuecreationmsg;
getProducts=[];
issueCreatedOnGateway;
Attach;
fileName;
filetype;
fileCT;
SrNumber;
SrDueDate; 
ActCode;
Description;
extnsn;
myIssues;

// console.log(getProducts);
  menuArray: any[];


  constructor(
    private formbuilder: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    public datepipe: DatePipe,
    private router: Router,


    private adm: LoginService,
    private dashboardService: DashboardService,
    private toasterService: ToasterService,



    private elementRef: ElementRef) {
    // this.adm.getUserId().subscribe(data => {
    //   this.logged_in =
    //     data != "" && data != null && data != undefined ? true : false;
    // });
    this.dateInput= datepipe.transform(Date.now(),'dd-MMMM-yyyy');
    let today = new Date()
    let priorDate = new Date().setDate(today.getDate()-45);
    this.minDate= datepipe.transform(new Date(priorDate),'yyyy-MM-dd');
    let prevDate = new Date().setDate(today.getDate()-1);
    this.maxDate= datepipe.transform(new Date(prevDate),'yyyy-MM-dd');

    this.reactiveForm = this.reportAnIssueFormControl();
  }

  ngOnInit() {
    // $("#contactName").keypress(function(e){
    //     alert("hii")
    //         var k;
    //         document.all ? k = e.keyCode : k = e.which;
    //         return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57) || k == 190 || k == 188);
    // })
    var now = new Date(),
    // minimum date the user can choose, in this case now and in the future
    minDate = now.toISOString().substring(0,10);

$('#issueFirstObserved').prop('min', minDate);



    this.rm = localStorage.getItem("rm");

    let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      //  "userName" :localStorage.getItem('username'),
      //   "Token" : localStorage.getItem("jwt")
     });
    
    console.log(this.dashboardService.getMenuTreeData())
    this.adm.getProductIssueItem(headers).subscribe((data: any) => {
      this.getProductIssue = JSON.parse(data._body);
      console.log(this.getProductIssue)
    //   this.menuArray = this.getMenuData(this.getProductIssue);
    //   console.log(this.menuArray, "hhhhhhhhh  ")

    this.getProducts = this.getProductIssue.filter((e, i) => {
        console.log(e,i)
      return this.getProductIssue.findIndex((x) => {
      // return x.room_rate_type_id == e.room_rate_type_id && x.price == e.price;}) == i;
       return x.product == e.product;}) == i;
  });
  $(document).ready(function(){     
    // Add minus icon for collapse element which is open by default
    $(".collapse.show").each(function(){
        // alert("hii")
        $(this).prev(".card-header").find(".fa").addClass("fa-angle-down,arrow-down").removeClass("fa-angle-up,arrow-up");
    });
    
    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function(){
        alert("hii")
        $(this).prev(".card-header").find(".fa").removeClass("fa-angle-up,arrow-up").addClass("fa-angle-down,arrow-down");
    }).on('hide.bs.collapse', function(){
        alert("bye")
        $(this).prev(".card-header").find(".fa").removeClass("fa-angle-down,arrow-down").addClass("fa-angle-up,arrow-up");
    });
});
    });
 
    

       

    this.reactiveForm = new FormGroup({
      'basicDetailsSection': new FormGroup({
        "merchantName": new FormControl(),
        "productName": new FormControl(),
        "Environment": new FormControl(),
        "APIname": new FormControl(),
        "issueDescreption": new FormControl('',[Validators.required]),  
        "endpointURL": new FormControl('',[Validators.required]),  
        "issueType": new FormControl('',[Validators.required]),  
        "requestPacket": new FormControl('',[Validators.required]),  
        "errorrcvd": new FormControl('',[Validators.required]),  
        "Notes": new FormControl('',[Validators.required]),  
        "Attachments": new FormControl(),
        "contactName": new FormControl('',[Validators.required]),  
        "contactEmail":  new FormControl('',[Validators.required,Validators.email]),  
        "contactnumber": new FormControl('',[Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),  
        "RMname": new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(9)]),  
        "issueFirstObserved":new FormControl('', [Validators.required]),
        "responsetPacket":new FormControl('',[Validators.required]),  
        // "responsetPacket":new FormControl(),

        // "responsetPacket":new FormControl(),



      })

    });
    this.reactiveForm.get("basicDetailsSection.RMname").setValue(this.rm);

    this.adm.getSrList().subscribe(
        (data:any) => {
            console.log(data);
            console.log(data._body);
            this.myIssues=JSON.parse(data._body);
     
           },
          err => {  
            console.log('err', err);
      this.toastrmsg('error',"Something went wrong. Please try again in some time.");
          },
      );
  }
 
  // Only AlphaNumeric
  keyPressAlphaNumeric(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressNumber(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  omit_special_char(event){   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}
  UAT_help(UAT_Help: any) {
    this.modalRef = this.modalService.show(UAT_Help, {
      backdrop: "static",
      class: "modal-lg"
    });
  }
  Close_ConfirmProd() {
    this.modalRef.hide();

    this.router.navigate(["/onboardingrequests"]);
  }

  getMenuData(data): Array<object> {
    let tempArray = [];
    Object.keys(data).forEach(async (eachKey, index) => {
      let tempObj = { menuName: eachKey, menuOrder: index };
      if (typeof data[eachKey] == 'object' && !data[eachKey].API_ID) {
        //parent node
        tempObj['children'] = this.getMenuData(data[eachKey]);
      } else if (typeof data[eachKey] == 'object' && data[eachKey].API_ID) {
        //child
        tempObj['API_ID'] = data[eachKey].API_ID;
      }
      tempArray.push(tempObj);
    });

    tempArray = tempArray.sort((a, b) =>
      a.menuOrder > b.menuOrder ? 1 : b.menuOrder > a.menuOrder ? -1 : 0,
    );
    return tempArray;
  }
  reportAnIssueFormControl(){
    return new FormGroup({
    reactiveForm : new FormGroup({
        "issueType": new FormControl(),
        "api": new FormControl(),
        "onboardingID":new FormControl(),
        "problemSeverity":new FormControl(),
        "issueDescreption":new FormControl(),
        "endpointURL":new FormControl(),
        "firstObservedDate":new FormControl(),
        "issueFirstObserved":new FormControl(),
        "supportingLogs":new FormControl(),
        "name":new FormControl(),
        "email":new FormControl(),
        "contactNo":new FormControl(),
        "RMname": new FormControl(),
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
// createReportIssue(body,header){
//   this.adm.createTranscationHistory(body,header).subscribe(
//     (data:any) => {
//         console.log(JSON.parse(JSON.stringify(data)));

//         let callbackResponse="Your callback response is captured sucessfully"

//       },
//       err => {
//         let callbackResponse="Failed"

//         console.log('err', err);
//       },

//   );
// }
selectChangeHandler(event: any) {
  this.selectedProduct = event.target.value;
   console.log(JSON.stringify(this.selectedProduct))
   this.getIssues();

}

selectChangeHandlerEnv(event: any) {
    this.selectedEnv = event.target.value;
    this.getIssues();
  }

  selectChangeHandlerIssues(e: any) {
   let issuesType=[];
   let severity=[];
   let issueId=[];
   let issueTeam=[];
  //  this.issuesType = e.target.value;
    severity.push( e.target.getAttribute('severity'));
    issuesType.push(e.target.getAttribute('issuesType'));
issueId.push(e.target.getAttribute('issuesType'));
issueTeam.push(e.target.getAttribute('issuesType'));
console.log(e.target.getAttribute('severity'))
  }

  getIssues(){
    this.api=[];
    this.issueType=[];
    for (var i in this.getProductIssue) {
        if(this.getProductIssue[i].product==this.reactiveForm.value.basicDetailsSection.productName && this.getProductIssue[i].environment==this.reactiveForm.value.basicDetailsSection.Environment ){
this.api=(this.getProductIssue[i].api.split(','));
console.log(this.getProductIssue[i].api.split(','));
console.log(this.getProductIssue[i].api.split(','));

console.log(this.getProductIssue[i].api);
console.log(this.api);
// for (var a in this.api ) {
//     this.api[a] // Explicitly include base as per Álvaro's comment
//     console.log(this.api[a],a);

// }


(this.issueType).push(this.getProductIssue[i].issues)

// var array = this.getProductIssue[i].api.split(',');


        }
      }
      console.log(this.issueType)
  }
  readFile(fileEvent: any) {
    const file = fileEvent.target.files[0];
    console.log(fileEvent.value)
    // pdf,exe,zip,xlxs,jpeg,png,jpg
    const allowed_types = ['pdf','exe','zip','xlxs','jpeg','png','jpg','PDF','EXE','ZIP','XLXS','JPEG','PNG','JPG'];
    console.log('size', file.size);
    console.log('type', file.type);
    console.log(fileEvent.target.files[0])
    console.log(fileEvent.target.files[0].name)
    // console.log(this.fileName.substring(this.fileName.lastIndexOf('.')+1));
    // const ext= this.fileName.substring(this.fileName.lastIndexOf('.')+1)
    
    // console.log((allowed_types).includes(ext),ext)

    if (fileEvent.target.files && fileEvent.target.files[0]) {
        // alert("file exist")
    if(file.size > 1048576){ // if file is grtr thn 1mb
        // alert("1mb se jyada")
        // alert("File is too big!");  
        $(".fileError").text("File size should not exceed 1 MB limit.")
        $(".fileError").show();
        return false;           
     }
     else{
        // alert("fjefnewjn")

        this.fileName=fileEvent.target.files[0].name;
       
        // console.log(this.fileName.substring(0,lastdot))
     
      
        this.filetype=fileEvent.target.files[0].type;
        let lastdot = this.fileName.lastIndexOf('.');
        let ext =this.fileName.substring(this.fileName.lastIndexOf('.')+1);
        console.log(ext);
        console.log((allowed_types).includes(ext),ext)
        this.extnsn=ext;
   
        if ((allowed_types).includes(ext)) {
            // alert("ext alwd")
          
          $(".fileError").text("");
          $(".fileError").hide();
         
       }
       else{
        // alert("ext not alwd")

           this.filetype=fileEvent.target.files[0].type;
           // alert(fileEvent.target.files[0].type)
           $(".fileError").text(ext+"File type not allowed.")
           $(".fileError").text('Only pdf,exe,zip,xlxs,jpeg,png,jpg file type are  allowed')
           $(".fileError").show();
           return false;
        //    console.log( 'Only ["pdf","exe","zip","xlxs","jpeg","png","jpg"] are not allowed ( exe | bat )');
           // console.log(fileEvent.fileData.rawFile.type)
       }

        //  console.log(file.value.substring(file.value.lastIndexOf(".") + 1));
     

    // console.log(fileEvent.target.files[0].value)

     }

    //base 64 encode code
    //  const reader = new FileReader();
    //  reader.readAsDataURL(file);
    //  reader.onload = () => {
    //      console.log(reader.result);
    //      this.Attach=reader.result;
    //  };

    //  reader.onload = (e: any) => {
    //     // console.log(reader.result);
    //     // console.log( e.target.result);
       
    //     this.Attach= e.target.result;
    // };



    
    //base 64 encode code
    const reader = new FileReader();
    let self = this;
    reader.onload = (e: any) => {
     //   console.log(reader.result);
        console.log( e.target.result.split(',')[1]);
        
 e.target.result.replace("data:image/png;base64,", "");
console.log( e.target.result);
       
        self.Attach= e.target.result.split(',')[1];
    };
    
    reader.readAsDataURL(file);
 }
}

pageRefresh(){
    window.location.reload();}
   
submitOnReportIssue(){
  const reactivefrmcontrols= this.reactiveForm.controls;
  console.log(this.reactiveForm.value.productName   )
  console.log(this.reactiveForm.value.basicDetailsSection.productName)
  console.log(this.reactiveForm.value.basicDetailsSection.issueType)
  console.log(this.reactiveForm.value.basicDetailsSection.issueDescreption)
  console.log(this.Attach);

  console.log(this.reactiveForm.value.basicDetailsSection.endpointURL)

  let header = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    "token" : localStorage.getItem("jwt"),
    "username" :localStorage.getItem("username"),
  });    
//   this.modalRef = this.modalService.show(srcreationPopup, {
  
//     backdrop: "static",
//     class: "modal-lg"

//   });   
let filename;
 if( this.fileName == "" || this.fileName ==undefined){
// alert(this.fileName+"emty")
filename="";
 }
 else{
// alert(this.fileName+"filled")
filename= this.fileName.split('.').slice(0,-1).join('.');    
 }
  // console.log(this.getProductIssue)
  let selectedDate = this.reactiveForm.value.basicDetailsSection.issueFirstObserved;
  console.log(selectedDate)
  this.dateInput = this.datepipe.transform(new Date(selectedDate),'dd-MMMM-yyyy');
 
  let json= {
    "product": this.reactiveForm.value.basicDetailsSection.productName,
    "environment": this.reactiveForm.value.basicDetailsSection.Environment,
    "api": this.reactiveForm.value.basicDetailsSection.APIname,
    // "issue": JSON.stringify({
    "issueType": this.reactiveForm.value.basicDetailsSection.issueType,
    "issueId":$('.issues option:selected').attr('issueId'),
    "team": $('.issues option:selected').attr('team'),
    "severity": $('.issues option:selected').attr('severity'),
    //   }),
    "Attach": this.Attach,
    "FileName":filename,
    "FileType":  this.extnsn,
    "ContentType":  this.filetype,
    "contactPerson": this.reactiveForm.value.basicDetailsSection.contactName,
    "contactNo": this.reactiveForm.value.basicDetailsSection.contactnumber,
    "userID": this.reactiveForm.value.basicDetailsSection.RMname,
    //   "notes":  JSON.stringify({
    "issueDescription": this.reactiveForm.value.basicDetailsSection.issueDescreption,
    "endpointURL": this.reactiveForm.value.basicDetailsSection.endpointURL,
    "issueFirstObserbedDate": this.dateInput,
    "requestPacket": this.reactiveForm.value.basicDetailsSection.requestPacket,
    "responsePacket": this.reactiveForm.value.basicDetailsSection.responsetPacket,
    "errorMessage": this.reactiveForm.value.basicDetailsSection.errorrcvd,
    "notes": this.reactiveForm.value.basicDetailsSection.Notes,
    "contactEmail": this.reactiveForm.value.basicDetailsSection.contactEmail
    
         
    //   })
  }
  console.log(json)
  let jsondataPacket= {issuePacket : json};
  this.adm.raiseSRRequest(json).subscribe(
        (data:any) => {
            console.log(data);

            console.log(data._body);
            var JSONObject = JSON.parse(data._body);
            var messageRes = JSONObject["message"];
            console.log(messageRes);
         
            // issueCreateGateway=============================
            this.adm.raiseSRRequest(json).subscribe(
                (data:any) => {
                    console.log(data);
        
                    console.log(data._body);
                    var JSONObject = JSON.parse(data._body);
                    var messageRes = JSONObject["message"];
                    console.log(messageRes);
                   // let extraDetails=[{"username":localStorage.getItem("username"),
                    
                  //   extraDetails.push(messageRes)
                  //   console.log(extraDetails)
                  //   console.log(messageRes)
                  
                    //$.extend(messageRes,extraDetails)
                   // console.log(messageRes)
                    //this.toastrmsg('success',data._body);
                  //  let newJson=Object.assign(messageRes,extraDetails);
                    this.adm.issueCreateGateway(messageRes, this.reactiveForm.value.basicDetailsSection.issueType).subscribe(
                        (data:any) => {
                            console.log(messageRes,"issueCreateGateway");
                            console.log(data._body);
                      
                            //
                            
                    console.log(data._body);
                    var JSONObject1 = JSON.parse(data._body);
                   this.issueCreatedOnGateway = JSONObject1["message"];
                    console.log(messageRes);
                            //
                            $('#myModal2').modal('show');
                          
                            var response= data._body; 
                            var obj=JSON.parse(response);
                           },
                          err => {  
                            console.log('err', err);
                      this.toastrmsg('error',"Something went wrong. Please try again in some time.");
                          },
                      );
        
                  //  this.toastrmsg('success',data._body);
        
              
                   },
                  err => {  
                    console.log('err', err);
              this.toastrmsg('error',"Something went wrong. Please try again in some time.");
        
                  },
              );

          //  this.toastrmsg('success',data._body);

      
           },
          err => {  
            console.log('err', err);
      this.toastrmsg('error',"Something went wrong. Please try again in some time.");

          },
      );
    
//   let formData = new URLSearchParams();
  // formData.set("headers","application/json");
//   formData.set("issueType","json")
//   formData.set("api","form.value.Request")
//   formData.set("onboardingID","form.controls.Response.value")
//   formData.set("problemSeverity","this.idForClickedTab")
//   formData.set("issueDescription","601")
//   formData.set("firstObservedDate","5")
//   formData.set("name",localStorage.getItem("jwt"))
//   formData.set("email",localStorage.getItem("username"))
//   formData.set("contactNo","QR Code")
//   formData.set("supportingLogs","attachnnt")


// console.log("yes created")
//   this.createReportIssue(formData.toString(),header);
    
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
    // If the HTML code doesn't work, simply call this function
    reset() {
        this.reactiveForm.reset();
      }
    
 
}

