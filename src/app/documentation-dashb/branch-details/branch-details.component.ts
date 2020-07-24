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
  eazypay:any ;
  compositpay:any;
  

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
  ) {
    this.route.params.subscribe(params => {
      this.branchId = params["id"];
      this.newApplication();
      let num = this.branchId;
      if(num === "201" || num === 201 ){
        this.faq= true;
        this.eazypay= true;
        
      }else if(num === "207" || num === 207){
        this.faq= true;
        this.compositpay= true;
      }else{
        this.faq= false;
        this.eazypay= false;
        this.compositpay= false;
      }
    });
  }
  constants = CONSTANTS;
  ngOnInit() {
   

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
      this.router.navigate(['error']);
    },);
  }
  compositPayFaq:any=[
    {"qn":"1.	What is composite API? ","ans":"Ans: One single API which will accommodate payments for UPI, IMPS, NEFT & RTGS. "},
    {"qn":"2.	How do you know the status of the transaction if there is no response received for the fired API?","ans":"Ans: There are status check API. "},
    {"qn":"3.	How do you know the preferred payment mode in the request? ","ans":"Ans: Through Input Header ‘x-priority’. "},
    {"qn":"4.	What is ‘x-priority’?","ans":"Ans: ‘x-priority’ is a 4 digit input header parameter which determines the payment mode. The first, second, third and fourth digits sets the priority for UPI, IMPS, NEFT & RTGS respectively. "},
    {"qn":"5.	Can we process a single payment mode?","ans":"Ans: Yes. Put the value ‘1’ against the preferred payment mode and rest all as ‘0’. Therefore, in case of just UPI, IMPS, NEFT & RTGS, x-priority shall be 1000, 0100, 0010 & 0001. "},
    {"qn":"6.	Can we process more than one payment modes?","ans":"Ans: Yes. In case, UPI is preferred and IMPS is fallback, then x-priority shall be ‘1200’. Similarly, 1020 is UPI preferred and NEFT as fallback and so on. "},
    {"qn":"7.	Will the request parameter change for more than one payment mode API?","ans":"Ans: Yes. The request packet needs to include the mandatory parameters for all the payment modes selected. "},
    {"qn":"8.	Is Beneficiary Registration API Mandatory? ","ans":"Ans: No. It is only mandatory for clients transacting from Nodal account. "},
    {"qn":"9.	How do you do the status check of Beneficiary Registration API? ","ans":"Ans: Fire Beneficiary registration API again, and you’ll receive a response, ‘Beneficiary already registered’. "},
    {"qn":"10.	How much time does beneficiary registration API takes to register the beneficiaries?","ans":"Ans: Beneficiary Registration API is real time API. As soon as the API response is received, Beneficiary is registered on the Data base and the transfer API can be processed. "},
    {"qn":"11.	What is CIB registration API?","ans":"Ans: This is a one-time API that registers client on CIB which is our internal system. This is required for clients to use the Beneficiary registration, NEFT & RTGS APIs. "},
    {"qn":"12.	What is required from clients’ end for testing? ","ans":"Ans: IP addresses & 4096 Bits Public key certificate. "},
    {"qn":"13.	Why is IP address required? ","ans":"Ans: In order to maintain the security, we whitelist client’s IP addresses. "},
    {"qn":"14.	What is 4096 Bits Public key certificate? ","ans":"Ans: Composite API will follow encryption and decryption mechanism to send and receive request & response from client’s end. Every certificate file will have two components, i.e. Public Key certificate & Private key certificate. Pubic Key Certificates are used to encrypt and Private key certificates are used to decrypt.The client will use ICICI Bank’s pubic key certificate and encrypt the payment request. ICICI Bank will decrypt the payment request using our private key certificate and then process the transaction accordingly as per the payment mode preferred. After the request has been processed, ICICI Bank will encrypt the response using client’s public key certificate and post it back. Client will use their corresponding private key certificate to decrypt the response received. These certificate files are available with third party vendors. Also, for testing purpose, a self-signed certificate will also suffice. "},
    {"qn":"15.	What are the details provided by ICICI Bank after the configuration is completed? ","ans":"Ans: We provide the API Key & ICICI Bank’s Public key certificate separately for both UAT & production."},
    {"qn":"16.	What is API Key? ","ans":"Ans: ‘API Key’ is a unique value generated for each client which is required to be passed in the header."},
    {"qn":"17.	What is Device-ID, profile-ID, channel code, account provider, merchant type, etc. in UPI request packet?","ans":"Ans: These are fixed values which are generated when the client is configured in UAT & Production environment and the same shall be provided after the configuration. "},
    {"qn":"18.	What is BC ID, passcode and r-code in the IMPS request packet?","ans":"Ans: These are fixed values which are generated when the client is configured in UAT & Production environment and the same shall be provided after the configuration."},
    {"qn":"19.	What is AGGRID, AGGRNAME, CORPID & USERID in the NEFT & RTGS request packet?","ans":"Ans: These are fixed values which are generated when the client is configured in UAT & Production environment and the same shall be provided after the configuration."},
    {"qn":"20.	What will be the actionable at client’s end against the error received?","ans":"Ans: Actionable has been mapped against each error codes in the error code document."},
    {"qn":"21.	What is the ideal response time for UPI transaction? ","ans":"Ans: For UPI, ideally the final status of the transaction will be available within 180 secs of initiating the transaction. "},
    {"qn":"22.	What is the ideal response time for IMPS transaction?","ans":"Ans: For IMPS, ideally the final status of the transaction will be available within 180 secs of initiating the transaction. "},
    {"qn":"23.	What is the limit for number of UPI transactions? ","ans":"Ans: No transaction limit on volume per day. Can manage 2-3 transactions per second. "},
    {"qn":"24.	What is limit for number of IMPS transactions?","ans":"Ans: No transaction limit on volume per day. Can manage 2-3 transactions per second."},
    {"qn":"25.	What is limit for number of NEFT and RTGS? ","ans":"Ans: No transaction limit on volume per day. Can manage 2-3 transactions per second."},
    {"qn":"26.	Will NEFT 24X7 be implemented for corporate clients?","ans":"Ans: Yes. But during 07:00PM to 01:00AM ICICI Banks will limit the number of transactions to ‘5’ and consolidate value per user as 2 Lacs. This limit will also hold on bank holidays and alternate weekends. "},
    {"qn":"27.	What is 500 error code? ","ans":"Ans: The request fired in from a non-whitelisted IP."},
    {"qn":"28.	What is 403 forbidden error code? ","ans":"Ans: One of the parameters in the request packet isn’t correct or the x-priority is incorrect."},
    {"qn":"29.	What is 8000 error code? ","ans":"Ans: The encryption mechanism is incorrect at client’s end. "},
    {"qn":"30.	How to check the encryption-decryption mechanism at clients’ end? ","ans":"Ans: Client should encrypt the request using their own public key and decrypt using the corresponding private key to understand the mechanism. "},
    {"qn":"31.	When will MIS be received? ","ans":"Ans: The MIS will be received on T+1 day. "},
    {"qn":"32.	Where will the MIS be received? ","ans":"Ans: Provided email ID. "},
    {"qn":"33.	Will the MIS include failed transactions? ","ans":"Ans: Optional. Depends on the clients’ requirements. "}

  ];
  easyPayFaq:any=[
    {"qn":"","ans":""},
  ];






}
