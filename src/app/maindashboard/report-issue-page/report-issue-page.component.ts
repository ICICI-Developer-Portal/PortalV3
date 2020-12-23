import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, Renderer2, Pipe,ViewChild, HostListener, ElementRef, ɵConsole } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { LoginService } from 'src/app/services';
import { DashboardService } from 'src/app/services/dashboard.service';

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
  selectedProduct:string;
  selectedEnv:string;
  api=[];
  productName=["Eazypay","Arteria","RTGS","UPI","HL topup","IMPS","NEFT","AL topup"];
  domain=["Business banking", "Loans and Cards", "Payments", "Accounts and Deposits"];
  issueType=[];
  getProductIssue=[
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
 getProducts = this.getProductIssue.filter((e, i) => {
    return this.getProductIssue.findIndex((x) => {
    // return x.room_rate_type_id == e.room_rate_type_id && x.price == e.price;}) == i;
     return x.product == e.product;}) == i;
});

// console.log(getProducts);
  menuArray: any[];


  constructor(
    private formbuilder: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private adm: LoginService,
    private dashboardService: DashboardService,


    private elementRef: ElementRef) {
    // this.adm.getUserId().subscribe(data => {
    //   this.logged_in =
    //     data != "" && data != null && data != undefined ? true : false;
    // });

    this.reactiveForm = this.reportAnIssueFormControl();
  }

  ngOnInit() {
    let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      //  "userName" :localStorage.getItem('username'),
      //   "Token" : localStorage.getItem("jwt")
     });
    
    console.log(this.dashboardService.getMenuTreeData())
    this.adm.getProductIssueItem(headers).subscribe((data: any) => {
      this.getProductIssue = JSON.parse(data._body);
      console.log(this.getProductIssue)
      this.menuArray = this.getMenuData(this.getProductIssue);
      console.log(this.menuArray, "hhhhhhhhh  ")
     
    });
 
    

        // console.log(this.getProductIssue)

    this.reactiveForm = new FormGroup({
      'basicDetailsSection': new FormGroup({
        "merchantName": new FormControl(),
        "productName": new FormControl(),
        "Environment": new FormControl(),
        "APIname": new FormControl(),
        "issueType": new FormControl(),
        "requestPacket": new FormControl(),
        "errorrcvd": new FormControl(),
        "Notes": new FormControl(),
        "Attachments": new FormControl(),
        "contactName": new FormControl(),
        "contactEmail": new FormControl(),
        "contactnumber": new FormControl(),






      })

    });
    
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
        "firstObservedDate":new FormControl(),
        "supportingLogs":new FormControl(),
        "name":new FormControl(),
        "email":new FormControl(),
        "contactNo":new FormControl(),
        "RMname": new FormControl()
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

  getIssues(){
    this.api=[];
    this.issueType=[];
    for (var i in this.getProductIssue) {
        if(this.getProductIssue[i].product==this.reactiveForm.value.basicDetailsSection.productName && this.getProductIssue[i].environment==this.reactiveForm.value.basicDetailsSection.Environment ){
(this.api).push(this.getProductIssue[i].api.split(','));
console.log(this.getProductIssue[i].api.split(','));
console.log(this.api);

(this.issueType).push(this.getProductIssue[i].issues)

// var array = this.getProductIssue[i].api.split(',');


        }
      }
      console.log(this.issueType)
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
}

