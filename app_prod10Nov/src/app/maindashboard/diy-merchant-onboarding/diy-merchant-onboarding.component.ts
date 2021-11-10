import { Component, OnInit, TemplateRef, ViewChild, ViewChildren, ElementRef, QueryList, EventEmitter, Output, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { interval as observableInterval, Observable } from "rxjs";
import { takeWhile, scan, tap, map, startWith } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardService } from 'src/app/services/dashboard.service';
import { VariablesService } from 'src/app/services/Variables.service';
import { MerchantOnboardingService } from 'src/app/services/merchant-onboarding.service';

import { LoginService } from 'src/app/services';
import { ToasterService, Toast } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var showProdTabEnv: any; // just change here from arun answer.
declare var openProdCurrentTabEnv: any;
import { formatDate } from '@angular/common';
import { CONSTANTS } from 'config/application-constant';
import { PATTERNS } from 'config/regex-pattern';
import { DomSanitizer } from '@angular/platform-browser';
import { element } from '@angular/core/src/render3';
import { NestedListFilterPipePipe } from 'src/app/maindashboard/nested-list-filter-pipe.pipe';
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { saveAs } from "file-saver";
import {

  HttpEventType,
  HttpErrorResponse
} from "@angular/common/http";
declare var $: any;
@Component({
  selector: 'app-diy-merchant-onboarding',
  templateUrl: './diy-merchant-onboarding.component.html',
  styleUrls: ['./diy-merchant-onboarding.component.css']
})
export class DiyMerchantOnboardingComponent implements OnInit {
  modalRef: BsModalRef;
  reactiveForm: FormGroup;
  responseData: [];
  menuArray: any[];
  arrayObjectOfListIds = [];
  arrayObjectOfDomain = [];
  compositePay = [];
  arrayObjectOfValue = [];
  logged_in: Boolean = false;
  additionalParams: any;
  refJIRAID: boolean = false;

  headers: boolean = false;
  accNo: boolean = false;
  clientCode: boolean = false;
  url: boolean = false;
  ip: boolean = false;
  port: boolean = false;
  checksum: boolean = false;
  encryption: boolean = false;
  merchantCertificate:boolean=false;
  certificate: boolean = false;
  service: boolean = false;
  message: boolean = false;
  ifsc: boolean = false;
  virtualCode: boolean = false;
  ips: boolean = false;
  interAccNo: boolean = false;
  accName: boolean = false;
  authLevel: boolean = false;
  urn: boolean = false;
  env: boolean = false;
  valid: boolean = false;
  accept: boolean = false;
  recipient: boolean = false;
  mode: boolean = false;
  trans: boolean = false;
  amount: boolean = false;
  uatTestingID: boolean = false;
  SOLID: boolean = false;
  EmpID: boolean = false;
  nestedCheckboxesList: boolean = false;
  showTab = 1;
  apiGreenCheck: string = "invalid";
  confirmMsgProd: any;
  selectedDay: string = '';
  paymentMode: any[] = ["Cash", "ICICI Cheque", "ICICI DD", "Non-ICICI Cheque", "Non-ICICI DD", "Debit Authorization", "Other"];
  yesNo: any[] = ["Yes", "No"];
  serviceTypeOption: any[] = ["WADL", "REST", "SOAP", "Other"];
  comTypeOption: any[] = ["XML", "XML as a string", "JSON"];
  ifscCodeOption: any[] = ["ICIC0000103", "ICIC0000104", "ICIC0000106"];
  environmentOption: any[] = ["UAT", "CUG", "Production"];
  certificateOption: any[] = ["Java Key Store", "IIS SSL (Should be 4096 bits/Public certificate is also required)"];
  callbackURLInfo: any = "It should be domain based & start with https.";
  clientCodeInfo: any = "Provide client code created ."
  isemail_check: boolean = false;
  isemail_reg_check: string = "";
  selectedValue = [];
  selectedAPINAME = [];
  progress: number;
  clicked = false;
  currentProgress: any = 1;
  currentProgress1: any = 0;
  currentProgress2: any = 0;
  currentProgress3: any = 0;
  step_no: any = 1;
  term: any;
  errorMsg: any = "Something went wrong. Please try again in some time.";
  /** Add var for search field */
  myControl = new FormControl();
  APIAutocompletDataSource: any[] = [];
  filteredOptions: Observable<string[]>;
  searchedItem: any;
  searchedFieldValue: any;
  companyName: any;
  email: any;
  mobileNo: any;
  rm: any;

  productDetail:any = [];
  productApiService:any = {};
  apiServiceUrlList:any = [];
  apiService: any ;
  apiUrl: any ;

  checkboxValues:any ="Select";
  showText1: boolean = false;
  showText2: boolean = false;
  checkedStatus: boolean = false;
  showMode: boolean = false;
  selectedProduct:any="";

  apiUATURL:[];
  apiPRODUrl:[];
  

Attach;
fileName;
filetype;
fileCT;
extnsn;
fileTest:boolean=false;

  /** end here */
  constructor(private HttpClient: HttpClient,
    private http2: HttpClient,
    private formbuilder: FormBuilder,
    private objOnBoarding: VariablesService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private adm: LoginService,
    private toasterService: ToasterService,
    private dashboardService: DashboardService,
    private merchantSrvc: MerchantOnboardingService,

    private elementRef: ElementRef) {
    this.adm.getUserId().subscribe(data => {
      this.logged_in =
        data != "" && data != null && data != undefined ? true : false;
    });

  }
  ngOnInit() {


    console.log(localStorage.getItem("companyName"))
    this.companyName = localStorage.getItem("companyName");
    this.email = localStorage.getItem("email");
    this.rm = localStorage.getItem("rm");


    this.mobileNo = localStorage.getItem("mobileNo");


    document.getElementById("merchantName").focus();

    this.logged_in = this.adm.check_log();

    console.log(this.dashboardService.getMenuTreeData())
    this.dashboardService.getMenuTreeData().subscribe((data: any) => {
      this.responseData = JSON.parse(data._body);
      console.log(this.responseData)
      this.menuArray = this.getMenuData(this.responseData);
      console.log(this.menuArray, "hhhhhhhhh  ")

    }
    );

    // testing......
    let edit = ''
    this.resetForm(edit);
    function isNumberKey(evt) {
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

      return true;
    }
    $('body').on('click', '.deleteRemoveObject', function () {
      var currentId = $(this).attr("class");
      console.log(currentId, $(this).parent())
      $(this).parent().remove();
    });
    $('body').on('click', 'span.dynamic', function () {
      var currentId = $(this).attr("id");
      $("#" + currentId).parent().parent().parent().parent().parent().remove();
      $("#countexceeder").remove();
    });

    $(document).off().on('click', '.first-level li', function (e) {
      $(this).children(".display-none").toggle();
      e.stopPropagation();
    });
    $("#searchFilter").keyup(function () {
      var text = $("#searchFilter").val().toLowerCase();
      var items = $(".customcsscontainer label");
      const arry1 = [];
      if ($.trim($("#searchFilter").val()) == '') {
        console.log(items.length)
        //  $(".second-level a").removeClass("paddingLeft13")
        $("").css("display", "");
        // $(".first-level li,.first-level a,.first-level p,.customcsscontainer,.customcsscontainer input").show();
        $(".first-level p,.customcsscontainer input,.customcsscontainer label").show();
        $(".second-level,.third-level,.fourth-level,.fifth-level").css('display', 'none')
        $(".second-level,third-level,.fourth-level,.fifth-level").hide();


      } else {
        items.each(function () {
          var block;
          block = $(this);


          // if (block.text().toLowerCase().indexOf(text) != 0) { //search starts with first entered ltr
          if (block.text().toLowerCase().indexOf(text) < 0) { // search starts with entered text 
            block.hide();

            $(".second-level p").hide();
          } else {


            $(".first-level li,.first-level a,.first-level ul,.customcsscontainer").show();


          }
        });
        $('input[subDomainName]:visible').each(function () {
          if ($('input[subDomainName]:visible').attr("childName")) {
            console.log("last")
          }
          else if ($('input[subDomainName]:visible').attr("parentName")) {
            console.log("last 1")
          }
          else if ($('input[subDomainName]:visible').attr("grandParentName")) {
            console.log("last 2")
          }
          else if ($('input[subDomainName]:visible').attr("greatGrandParentName")) {
            console.log("last 3")
          }
          else if ($('input[subDomainName]:visible').attr("greatGreatGrandParentName")) {
            console.log("last 4")
          }

          var block = $(this);
          console.log($('.requestedData-list input[type="text"]:visible').attr("subDomainName"), block)
          console.log($('.requestedData-list input[type="text"]:visible').parentElement)
          $(".second-level p[class='" + block[0].attributes[3].nodeValue + "']").show();
          console.log(block);
          $(this).parents().eq(4).siblings("a").children("p").css("display", "block");
          $(this).parents().eq(6).siblings("a").children("p").css("display", "block");
          $(this).parents().eq(8).siblings("a").children("p").css("display", "block");


        });

        if ($('input[domainName="Building Blocks"]:visible').length) {

          $(".first-level p.Building").show();
          $(".first-level p.Building").show();

        } else {
          $(".first-level p.Building").hide();
        }
        if ($('input[domainName="Loans and Cards"]:visible').length) {


          $(".first-level p.Loans").show();
        }
        else {
          $(".first-level p.Loans").hide();

        }
        if ($('input[domainName="Payments"]:visible').length) {


          $(".first-level p.Payments").show();
        }
        else {
          $(".first-level p.Payments").hide();
        }
        if ($('input[domainName="Accounts and Deposits"]:visible').length) {


          $(".first-level p.Accounts").show();
        }
        else {
          $(".first-level p.Accounts").hide();
        }
        if ($('input[domainName="Business Banking"]:visible').length) {



          $(".first-level p.Business").show();
        }
        else {
          $(".first-level p.Business").hide();
        }
        if ($('input[domainName="Trade Services"]:visible').length) {



          $(".first-level p.Trade").show();
        }
        else {
          $(".first-level p.Trade").hide();
        }
        if ($('input[domainName="Corporate API Suite"]:visible').length) {



          $(".first-level p.Corporate").show();
        }
        else {
          $(".first-level p.Corporate").hide();
        }
        console.log($('input[domainName="Building Blocks"]:visible').length)

        // setTimeout(function(){ if($('input[domainName="Building Blocks"]:visible').length){
        //   console.log($('input[domainName="Building Blocks"]:visible').length)
        // }

        // },5000);


      }
      $(".first-level").show();
    })




    this.merchantSrvc.getProductDetail( ).subscribe((data: any) => {
      let response = JSON.parse( data._body);
      this.productDetail = response;
      for (let i in response){
        let key = response[i].apiProductName;
        this.productApiService[key] = response[i].apiProducts;
      }
      this.spinnerService.hide();
     // console.log("response=="+ response);
     },
     err => {
       this.spinnerService.hide();
       console.log('err', err);
       
     }); 
  }

 selectChangeHandler1(event){
     this.selectedProduct= event.target.value;
        this.checkboxValues =[];
        $('input[name="selectAll"]').prop('checked', false  );
        this.checkedStatus=false;
        let val =  event.target.value;
        this.apiServiceUrlList = this.productApiService[val];
        console.log(
          this.apiServiceUrlList.sort((a,b) => (b.id - a.id))
        )
        this.apiServiceUrlList= this.apiServiceUrlList.sort((a,b) => (b.id - a.id));

        if(val == "CIB"){
          this.showMode = true;
        }else{
          this.showMode = false;
        }
        console.log(val)
        if(val == "CIB" ){
         this.showText1=true;
         this.showText2=false;

          // this.showMode = true;
        }else if (val=="Composite"|| val=="EazyPay"){
          this.showText2=true;
          this.showText1=false;

          // this.showMode = false;
        }
        else{
          this.showText2=false;
          this.showText1=false;
        }

        if(val=="Select Product"){
          this.selectedAPINAME = [];
          this.selectedValue = [];
    $('.ContinueBtn').prop('disabled', true);

          
        }
      }
  selectChangeHandler(event: any) {
    this.selectedDay = event.target.value;

  }

  initipRows() {
    return this.formbuilder.group({
      ip: ['']
    });
  }
  /**
   * add and remove additional IP
   */

  addNewIPField() {
    const control = <FormArray>this.reactiveForm.get('whitelistIpSection').get('ip');
    console.log(control.at(0));
    if (control.length <= 9) {
      control.push(new FormControl(null, [Validators.required, Validators.pattern('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')]))
    } else { }
  }

  deleteRow(i: number) {
    console.log(i);
    const control = <FormArray>this.reactiveForm.get('whitelistIpSection').get('ip');

    control.removeAt(i);

  }
  /**
   * add and remove callback URLs
   */
  addNewURLField() {

    const regURL = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    const control = <FormArray>this.reactiveForm.get('whitelistIpSection').get('url');
    console.log(control.at(0));

    if (control.length <= 9) {
      control.push(new FormControl(null, [Validators.pattern(regURL)]));
    } else { }
  }
  deleteURLRow(i: number) {
    console.log(i);
    const control = <FormArray>this.reactiveForm.get('whitelistIpSection').get('url');
    control.removeAt(i);

  }
  resetField() {
    const control = <FormArray>this.reactiveForm.get('whitelistIpSection').get('ip');
    while (control.length > 1) {
      control.removeAt(1)
    }
    control.reset();
    /**
     * changes done for callback url control
     */
    const control2 = <FormArray>this.reactiveForm.get('whitelistIpSection').get('url');
    while (control2.length > 1) {
      control2.removeAt(1)
    }
    control2.reset();
  }
  ifIPpatternNotmatches() {
    const control = <FormArray>this.reactiveForm.get('whitelistIpSection').get('ip').value;

  }
  // ====================================



  isChecked: any;
  parentDataDomainName: string;
  childData: string;
  // ----------------------------------------------------------------
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
  HWI_link(id) {
    this.showTab = id;
    //this.active ='#F06321';
  }
  additionalFieldComingFromServer(addtionalParams) {
    this.forResetiingAdditionalFields();

    for (var i = 0; i < addtionalParams.length; i++) {
      console.log(addtionalParams[i]);

      if (addtionalParams[i].match("Account Number")) {
        this.accNo = true;
      }
      if (addtionalParams[i].match("Client Code")) {
        this.clientCode = true;
      }
      if (addtionalParams[i].match("URL")) {
        this.ifFieldisVisible(addtionalParams[i]);
        this.url = true;
      }
      if (addtionalParams[i].match("IP")) {
        this.ifFieldisVisible(addtionalParams[i]);
        this.ip = true;
      }
      if (addtionalParams[i].match("Port")) {
        this.port = true;
      }
      if (addtionalParams[i].match("Checksum")) {
        this.checksum = true;
      }
      if (addtionalParams[i].match("Encryption")) {
        this.encryption = true;
      }
      if (addtionalParams[i].match("Certificate")) {
        this.certificate = true;
      }
      if (addtionalParams[i].match("Service Type")) {
        this.service = true;
      }
      if (addtionalParams[i].match("Communication Method")) {
        this.message = true;
      }
      if (addtionalParams[i].match("IFSC Code")) {
        this.ifsc = true;
      }
      if (addtionalParams[i].match("Virtual Code")) {
        this.virtualCode = true;
      }
      if (addtionalParams[i].match("IPS Refund Code")) {
        this.ips = true;
      }
      if (addtionalParams[i].match("Intermediate Account Number")) {
        this.interAccNo = true;
      }
      if (addtionalParams[i].match("Account Name")) {
        this.accName = true;
      }
      if (addtionalParams[i].match("Authorization Level")) {
        this.authLevel = true;
      }
      if (addtionalParams[i].match("URN")) {
        this.urn = true;
      }
      if (addtionalParams[i].match("Environment")) {
        this.env = true;
      }
      if (addtionalParams[i].match("Validation Mode")) {
        this.valid = true;
      }
      if (addtionalParams[i].match("Acceptance Mode")) {
        this.accept = true;
      }
      if (addtionalParams[i].match("Recipient Mail ID")) {
        this.recipient = true;
      }
      if (addtionalParams[i].match("Mode Offered")) {
        this.mode = true;
      }
      if (addtionalParams[i].match("Transaction Limit")) {
        this.trans = true;
      }
      if (addtionalParams[i].match("Amount")) {
        this.amount = true;
      }
      if (addtionalParams[i].match("Headers")) {
        console.log(addtionalParams[i], "hiii")
        this.headers = true;
      }
      if (addtionalParams[i].match("TestingID")) {
        this.uatTestingID = true;
      }
      if (addtionalParams[i].match("EmpID")) {
        this.EmpID = true;
      }
      if (addtionalParams[i].match("SOLID")) {
        this.SOLID = true;
      }
    }



  }
  onClickContinueBtn() {
    console.log("rchd inside cninue btn")

    if ($(".customcsscontainer input:checkbox:checked").length > 0) {
      $("#thrdSectionChld").removeClass("overlay_parent"); $("#submitButton,#file1").removeClass("blockElements"); $('#nav-tab a[href="#tab3"]').tab('show'); this.setProgress(3);

      // aria-controls="nav-additionalDetails"
      $("nav-additional-tab").attr("aria-controls", "nav-additionalDetails")
    }
    else { $("#thrdSectionChld").addClass("overlay_parent"); }
    //this.modalRef.hide();
    this.arrayObjectOfListIds = $(".customcsscontainer input:checkbox:checked").map(function () {
      return this.id
    }).get()
    this.arrayObjectOfDomain = $(".customcsscontainer input:checkbox:checked").map(function () {
      return this.getAttribute("domainName")
    }).get()
    this.compositePay = $(".customcsscontainer input:checkbox:checked").map(function () {
      return this.getAttribute("parentName")
    }).get()
    this.apiUATURL = $(".customcsscontainer input:checkbox:checked").map(function () {
      return this.getAttribute("apiUATUrl")
    }).get()
    this.apiPRODUrl = $(".customcsscontainer input:checkbox:checked").map(function () {
      return this.getAttribute("apiPRODUrl")
    }).get()
    console.log(this.compositePay)
    // console.log(this.arrayObjectOfDomain.join())
    console.log(this.arrayObjectOfDomain[0])


    console.log(this.arrayObjectOfListIds.join())
    const formArray: FormArray = this.reactiveForm.get(this.responseData) as FormArray;
    var json = {
      ID: this.arrayObjectOfListIds.join(),
    };
    this.additionalFieldComingFromServer(json);
    console.log("json", json);
    var obj = {
      ID: "1204",
     ADDITIONAL_DETAILS: "IP,URL,Port,Account Number,Account Name,EmpID,SOLID", 
     API_NAME: "Validation Web Service"};
    
  console.log("obj reached", obj);
  localStorage.setItem('nodevalue', obj.API_NAME)
  this.additionalParams = obj.ADDITIONAL_DETAILS.split(",");
  localStorage.setItem('additonalFields', this.additionalParams)

 this.additionalFieldComingFromServer( this.additionalParams)
  console.log("final", this.additionalParams);



  }


  // ================================================================
  @ViewChild('BasicDetailsList') BasicDetailsList: ElementRef;
  @ViewChild('RequestedApiList') RequestedApiList: ElementRef;
  @ViewChild('businessBankingList') businessBankingList: ElementRef;
  @ViewChild('whitelistIpList') whitelistIpList: ElementRef;
  @ViewChild('checkboxes') checkboxes: ElementRef;
  @ViewChild('cartApiContainer', { read: ElementRef }) private cartApiContainer: ElementRef;
  @ViewChild('matInput', { read: ElementRef }) private matInput: ElementRef;

  parentMethod(data) {
    console.log(data, "yessss"); console.log("agn", data, "yess", "#" + data);
    this.childData = data;
    console.log("document.querySelector", document.querySelector);
    if (data == "BasicDetailsList") {
      console.log(this);
      this.BasicDetailsList.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
    else if (data == "RequestedApiList") {
      this.RequestedApiList.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
    else if (data == "businessBankingList") {
      this.businessBankingList.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
    else if (data == "whitelistIpList") {
      this.whitelistIpList.nativeElement.scrollIntoView({ behavior: "smooth" });
    };
  }
  scrollToTop(el) {
    const duration = 600;
    const interval = 5;
    const move = el.scrollTop * interval / duration;
    observableInterval(interval).pipe(
      scan((acc, curr) => acc - move, el.scrollTop),
      tap(position => el.scrollTop = position),
      takeWhile(val => val > 0)).subscribe();
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
  // "IP", "Port", "Account Number", "Client Code", "URL", "Checksum", "Encryption", "Certificate", "Service Type", "Communication Method", "IFSC Code", "Virtual Code", "IPS Refund Code", "Intermediate Account Number", "Account Name", "Authorization Level", "URN", "Environment", "Validation Mode", "Acceptance Mode", "Recipient Mail ID", "Mode Offered", "Transaction Limit", "API Name", "Headers", "TestingID"
  forResetiingAdditionalFields() {
    this.accNo = false; this.clientCode = false; this.url = false; this.ip = false; this.port = false;
    this.checksum = false; this.encryption = false; this.merchantCertificate = false;  this.certificate = false; this.service = false; this.message = false;
    this.ifsc = false; this.virtualCode = false; this.ips = false; this.interAccNo = false; this.accName = false;
    this.authLevel = false; this.urn = false; this.env = false; this.valid = false; this.accept = false;
    this.recipient = false; this.mode = false; this.trans = false; this.amount = false; this.headers = false;
    this.uatTestingID = false; this.SOLID = false; this.EmpID = false;
    this.resetField();
  }
  allSelect(e, isChecked: boolean) {
    if (e.target.checked == true) {

      
       this.selectedValue = [];
       console.log($(".selectAll[type='checkbox']:checked").length)
        
         this.selectedAPINAME = [];
         this.selectedValue = [];

         selectedheckboxes = $(".scndCheckbox input:checkbox");
         console.log(selectedheckboxes.length)
         for (var i = 0; i < selectedheckboxes.length; i++) {

             this.selectedValue.push({
               
               "parentName": selectedheckboxes[i].getAttribute('parentName'),
              
               "id": selectedheckboxes[i].getAttribute('id')
             });
             this.selectedAPINAME.push(
               selectedheckboxes[i].getAttribute('value'));
         }
         $(".customcsscontainer input:checkbox").attr("checked", true)
         $(".customcsscontainer input:checkbox").prop("checked", true)
         $('.ContinueBtn').prop('disabled', false);
          this.selectedValue.push({

         "parentName": e.target.getAttribute('parentName'),

         "id": e.target.getAttribute('id')
       });
       this.selectedAPINAME.push(
         e.target.getAttribute('value'));
     
       $(".customcsscontainer input[selectAlldomainName='" + e.target.getAttribute('selectAlldomainName') + "']").attr("checked", true);
       $(".customcsscontainer input[selectAlldomainName='" + e.target.getAttribute('selectAlldomainName') + "']").prop("checked", true);

       var selectedheckboxes = document.querySelectorAll("input[parentName='" + e.target.getAttribute('parentName') + "']:checked")
       for (var i = 0; i < selectedheckboxes.length; i++) {
         if (selectedheckboxes[i].getAttribute('class') != "selectAll") {
           this.selectedValue.push({
             "parentName": selectedheckboxes[i].getAttribute('parentName'),
             "id": selectedheckboxes[i].getAttribute('id')
           });
           this.selectedAPINAME.push(
             selectedheckboxes[i].getAttribute('value'));
         }
       }
       console.log(this.selectedValue)
       console.log(this.selectedAPINAME)

       console.log($(".customcsscontainer input[parentname='" + e.target.getAttribute('parentName') + "']"))



       $('.ContinueBtn').prop('disabled', false);
    }
    else{
      this.selectedAPINAME = [];
      this.selectedValue = [];
      $(".scndCheckbox input:checkbox").prop("checked", false);
      $('.ContinueBtn').prop('disabled', true);

    }
  }
  multiSelectAPI(e, isChecked: boolean) {
    var selectedheckboxes = document.querySelectorAll("input[parentName='" + e.target.getAttribute('parentName') + "']:checked")
    this.forResetiingAdditionalFields();
     if (isChecked) {

 
      this.selectedValue.push({

        "parentName": e.target.getAttribute('parentName'),

        "id": e.target.getAttribute('id')
      });
      this.selectedAPINAME.push(
        e.target.getAttribute('value'));
      console.log(this.selectedAPINAME)
      console.log(this.selectedValue)
      if (this.selectedValue.length > 0) {
        // alert("hi")
        console.log(this.selectedValue[0]['parentName'])
        console.log(e.target.getAttribute("parentname"))

        console.log(this.selectedValue[0]['selectAlldomainName'],this.selectedValue[0])
        console.log(e.target.getAttribute('selectAlldomainName'))



        console.log(e.target.getAttribute('selectAlldomainName'))
      }

    } else {
      console.log("unchecking")
      this.selectedValue = [];
      this.selectedAPINAME = [];

      selectedheckboxes = $(".scndCheckbox input:checkbox:checked");
      console.log(selectedheckboxes.length)
      for (var i = 0; i < selectedheckboxes.length; i++) {
        if (selectedheckboxes[i].getAttribute('class') != "selectAll") {
          this.selectedValue.push({
            "parentName": selectedheckboxes[i].getAttribute('parentName'),
            "id": selectedheckboxes[i].getAttribute('id')
          });
          this.selectedAPINAME.push(
            selectedheckboxes[i].getAttribute('value'));
        }
      }
      console.log(this.selectedValue)
      console.log(this.selectedAPINAME)

    }if(($(".scndCheckbox input:checkbox:checked").length>0)){
      $('.ContinueBtn').prop('disabled', false);
    }

      else{
      $('.ContinueBtn').prop('disabled', true);

      }
    if($(".scndCheckbox input:checkbox:checked").length==  $(".scndCheckbox input:checkbox").length){
      $(".customcsscontainer label .selectAll").prop("checked", true)
    
    }
    else{
      $(".customcsscontainer label .selectAll").prop("checked", false)
    
    }
  }
  multipleSelectAPI1(e, isChecked: boolean) {
   // this.forResetiingAdditionalFields();

    console.log(e.target.getAttribute('class'))


    //logic for multiple select
    if (e.target.checked == true) {

    }
      var selectedheckboxes = document.querySelectorAll("input[parentName='" + e.target.getAttribute('parentName') + "']:checked")

      this.forResetiingAdditionalFields();
   
    
      if (isChecked) {

        this.selectedValue.push({

          "parentName": e.target.getAttribute('parentName'),
 
          "id": e.target.getAttribute('id')
        });
        this.selectedAPINAME.push(
          e.target.getAttribute('value'));
        console.log(this.selectedAPINAME)
        console.log(this.selectedValue)
        if (this.selectedValue.length > 0) {
          // alert("hi")
          console.log(this.selectedValue[0]['parentName'])
          console.log(e.target.getAttribute("parentname"))

          console.log(this.selectedValue[0]['selectAlldomainName'],this.selectedValue[0])
          console.log(e.target.getAttribute('selectAlldomainName'))



          console.log(e.target.getAttribute('selectAlldomainName'))
        }

      } else {
        console.log("unchecking")
        this.selectedValue = [];
        this.selectedAPINAME = [];

        selectedheckboxes = $(".scndCheckbox input:checkbox:checked");
        console.log(selectedheckboxes.length)
        for (var i = 0; i < selectedheckboxes.length; i++) {
          if (selectedheckboxes[i].getAttribute('class') != "selectAll") {
            this.selectedValue.push({
              "parentName": selectedheckboxes[i].getAttribute('parentName'),
              "id": selectedheckboxes[i].getAttribute('id')
            });
            this.selectedAPINAME.push(
              selectedheckboxes[i].getAttribute('value'));
          }
        }
        console.log(this.selectedValue)
        console.log(this.selectedAPINAME)                
      }

  }
  deleteRemoveObjectFromCart(e) {
    console.log(e.target);
    $(".selectAll").removeAttr("checked");
    $(".selectAll").prop("checked", false)
    console.log(this.selectedValue.length)
    console.log(e.target.getAttribute("id"));

    let deletedId = e.target.getAttribute("id");
    console.log(deletedId);
    $("input[id='" +deletedId + "']").prop("checked", false);
    this.selectedValue = this.selectedValue.filter(function (obj) {
      console.log(obj.parentdName, e.target.getAttribute("class"))
      return obj.parentdName !== e.target.getAttribute("class");

    });

    console.log(this.selectedValue)
    if (this.selectedValue.length > 0) {

      this.arrayObjectOfListIds = $(".customcsscontainer input:checkbox:checked").map(function () {
        return this.id
      }).get()
      


      console.log("unchecking")
      this.selectedValue = [];
      this.selectedAPINAME = [];

      selectedheckboxes = $(".scndCheckbox input:checkbox:checked");
      console.log(selectedheckboxes.length)
      for (var i = 0; i < selectedheckboxes.length; i++) {
        if (selectedheckboxes[i].getAttribute('class') != "selectAll") {
          this.selectedValue.push({

            "parentName": selectedheckboxes[i].getAttribute('parentName'),

            "id": selectedheckboxes[i].getAttribute('id')
          });
          this.selectedAPINAME.push(
            selectedheckboxes[i].getAttribute('value'));
        }
      }
      console.log(this.selectedValue)
      console.log(this.selectedAPINAME)
      console.log(this.arrayObjectOfListIds)
      const formArray: FormArray = this.reactiveForm.get(this.responseData) as FormArray;
      var json = {
        ID: this.arrayObjectOfListIds.join(),
      };
   

      this.adm.getUATFromData(json).subscribe((data: any) => {
        console.log(data);
        var response = data._body;
        var obj = JSON.parse(response);
        console.log("obj reached", obj);
        localStorage.setItem('nodevalue', obj.API_NAME)
        this.additionalParams = obj.ADDITIONAL_DETAILS.split(",");
        localStorage.setItem('additonalFields', this.additionalParams)

        this.additionalFieldComingFromServer(this.additionalParams)
        console.log("final", this.additionalParams);
      },
        err => {

          ADDITIONAL_DETAILS: "IP,URL,Port,Account Number,Account Name,EmpID,SOLID";
      //     /* var obj = {
      //       ID: "1105",
      //      ADDITIONAL_DETAILS: "Account Number,Client Code,URL,IP,Port,Certificate…ion Method,Amount validation required,EmpID,SOLID", 
      //      API_NAME: "Validation Web Service"};
          
      //   console.log("obj reached", obj);
      //   localStorage.setItem('nodevalue', obj.API_NAME)
      //   this.additionalParams = obj.ADDITIONAL_DETAILS.split(",");
      //   localStorage.setItem('additonalFields', this.additionalParams)
    
      //  this.additionalFieldComingFromServer( this.additionalParams)
      //   console.log("final", this.additionalParams); */
      //     console.log('err', err);
      //     // this.router.navigate(['error']);
      //     this.toastrmsg('error', this.errorMsg);
        });
    }
    else {
    
      $('.ContinueBtn').prop('disabled', true);
      $("#thrdSectionChld").addClass("overlay_parent");
      $("#dynamic-list-check").css("display", "none");
      $("#scndSectionWhitelistIp").addClass("ng-invalid");
      $("#scndSectionWhitelistIp").removeClass("ng-valid");
      $("#submitButton,#file1").addClass("blockElements");
      this.selectedValue = [];
      this.selectedAPINAME = [];
      var selectedheckboxes = document.querySelectorAll("input[parentName='" + e.target.getAttribute('parentName') + "']:checked")

      selectedheckboxes = $(".scndCheckbox input:checkbox:checked");
      console.log(selectedheckboxes.length)
      for (var i = 0; i < selectedheckboxes.length; i++) {
        if (selectedheckboxes[i].getAttribute('class') != "selectAll") {
          this.selectedValue.push({
            "parentName": selectedheckboxes[i].getAttribute('parentName'),

            "id": selectedheckboxes[i].getAttribute('id')
          });
          this.selectedAPINAME.push(
            selectedheckboxes[i].getAttribute('value'));
        }
      }
      console.log(this.selectedValue)
      console.log(this.selectedAPINAME)

    }
  }

  onSubmitUATForm(Prodconfirm) { 
    console.log(this.reactiveForm.get("whitelistIpSection"));

    this.setProgress(4);


    $("#submitButton").prop("disabled", true)

    setTimeout(function () { $("#submitButton").prop("disabled", false) }, 10000);

    var datestr = (new Date()).toUTCString();

    let ipValues = [];

    let urlValues = [];



    $('.countIp .form-control').each(function () {

      ipValues.push(this.value);

    });

    $('.countUrl .form-control').each(function () {

      urlValues.push(this.value);



    });

    console.log(ipValues)

    console.log(urlValues)

    let reactiveFromFieldValues = this.reactiveForm.value;

    let tempArr = this.arrayObjectOfDomain;

    const distinctArray = tempArr.filter((n, i) => tempArr.indexOf(n) === i);
console.log(reactiveFromFieldValues.whitelistIpSection.Checksum)
console.log(reactiveFromFieldValues.nestedCheckboxesList.apiProduct,
  this.reactiveForm.value.nestedCheckboxesList.apiProduct )

    let inputFields = {
      mName: reactiveFromFieldValues.basicDetailsSection.merchantName,
      desc: reactiveFromFieldValues.basicDetailsSection.description,
      relManager: reactiveFromFieldValues.basicDetailsSection.r_m_maild_id,
      requestDate: datestr,
      apiProduct: this.selectedProduct,
      apiProductServices: this.arrayObjectOfValue + this.arrayObjectOfListIds.toString(),
      ipList: ipValues.toString() ? ipValues.toString() : '',
      callBackUrl: urlValues.toString() ? urlValues.toString() : '',
      ndaSign: reactiveFromFieldValues.whitelistIpSection.checkBox ? reactiveFromFieldValues.whitelistIpSection.checkBox : '',
      apiUrl:this.apiUATURL.join(),
      certificate : reactiveFromFieldValues.whitelistIpSection.merchantCertificate,
      file1: reactiveFromFieldValues.whitelistIpSection.file1,
      remarks: reactiveFromFieldValues.whitelistIpSection.message ? reactiveFromFieldValues.whitelistIpSection.message : '',
      apiName: this.selectedAPINAME.join(),
      encryptRequired : "",
      encryptMode :"",
      ClientCode: reactiveFromFieldValues.whitelistIpSection.ClientCode ? reactiveFromFieldValues.whitelistIpSection.ClientCode : '',
      merchantId:reactiveFromFieldValues.whitelistIpSection.merchantId ,
      status: "",
      merchantEmail:reactiveFromFieldValues.basicDetailsSection.email_id,
      Environment: "UAT",
      userName: localStorage.getItem("username"),
      merchantContact: reactiveFromFieldValues.basicDetailsSection.contact_no,
    };
    console.log(inputFields);
    //console.log(reactiveFromFieldValues.value.Ip);
    const formData = new FormData();
    formData.append("merchantName", inputFields["mName"]);  //4
    formData.append("description", inputFields["desc"]);  //4
    formData.append("relationManagerId", inputFields["relManager"]); //8
    formData.append("requestDate" ,inputFields["requestDate"]); //8
    formData.append("apiProduct", inputFields["apiProduct"]); //2
    formData.append("apiProductServices", inputFields["apiProductServices"]); //2
    formData.append("ipList", inputFields["ipList"]);  //13
    formData.append("callBackUrl", inputFields["callBackUrl"]); //12
    formData.append("ndaSign",inputFields["ndaSign"]); //12
    formData.append("apiUrl", inputFields["apiUrl"]); //12
   // formData.append("certificate", inputFields["certificate"]);//33

    let b: any = (<HTMLInputElement>document.getElementById("merchantCertificate")).files;
   
    for (let k = 0; k < b.length; k++) {
     
      formData.append("certificate", b[k]); //34

    }

    console.log(formData);
    for (var key in formData) {
      console.log(key, formData[key]);
     // fd.append(key, formData[key]);
  }
    let a: any = (<HTMLInputElement>document.getElementById("file1")).files;

    console.log("a", a);
    let extention = a[0].name.split('.').pop();

    console.log("extention", extention);
    if (extention.toLowerCase() == "zip") {
      for (let k = 0; k < a.length; k++) {
        formData.append("file1", a[k]); //34
        console.log(a[k], "oooooooooo")
        console.log(formData)
      }
      formData.append("remarks", inputFields["remarks"]);//33
      formData.append("apiName",  inputFields["apiName"]);//33
      formData.append("encryptRequired",  inputFields["encryptRequired"]);//33
      formData.append("encryptMode",  inputFields["encryptMode"]);//33
      formData.append("clientCode",  inputFields["ClientCode"]);//33
      formData.append("merchantId",  inputFields["merchantId"]);//33
      formData.append("status", "Pending");//33
      formData.append("merchantEmail",  inputFields["merchantEmail"]);//33
      formData.append("Environment",  inputFields["Environment"]);//33
      formData.append("userName", inputFields["userName"]); //1
      formData.append("merchantContact", inputFields["merchantContact"]); //1
      this.HttpClient.post<any>(
        "https://developer.icicibank.com/ROOTDIY/rest/diyMerchantOnboard",
        formData
      ).subscribe(
        res => {
          console.log(res, formData);
          if(res.status){
              alert(res.message +".Your request ID is "+res.data);
          }else{
            alert(res.message);
            
          }
             
        },
        err => {
          console.log('err', err);
        },
      );

    } else {
      this.toastrmsg('error', "Please upload zip file for SSL certificate & encryption certificate along with API application form.");
    }

  }

  //conditional validation
  ifFieldisVisible(value) {
    let reactiveFromFieldValues = this.reactiveForm.value;
    console.log(value);
    console.log(reactiveFromFieldValues.whitelistIpSection.ip);
    console.log(this.reactiveForm)
    console.log(this.reactiveForm.controls.whitelistIpSection)
    let c = this.reactiveForm.controls.whitelistIpSection;

    console.log(reactiveFromFieldValues.whitelistIpSection.ip)
    let ip = reactiveFromFieldValues.whitelistIpSection.ip;
    console.log(ip);

    if (value == "IP") {
      console.log(this.reactiveForm.get('whitelistIpSection'));
      console.log(this.reactiveForm.get('whitelistIpSection').get('ip'));
      let ipControl = this.reactiveForm.get('whitelistIpSection').get('ip');
      // ipControl.setValidators([this.ipValidator]);
      console.log(this.reactiveForm.get('whitelistIpSection'));
      this.reactiveForm.get('whitelistIpSection').get('ip');
      //reactiveFromFieldValues.whitelistIpSection.controls("IP").setValidators(null,[Validators.required, Validators.pattern('((25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)(,\n|,?$))')])
      // reactiveFromFieldValues.whitelistIpSection.addControl('ic', new FormControl(null,[Validators.required, Validators.pattern('((25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)(,\n|,?$))')]));
      console.log(reactiveFromFieldValues.whitelistIpSection);
    }
    if (value == "URL") {
      this.reactiveForm.get('whitelistIpSection').get('url');
    }
    console.log(value + "", 1);

  }

  resetForm(edit) {
    //regex for https url validatio
    const regURL = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
    const ipReg = '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$';
    const regEmployeeId= '^([a-zA-Z]{4}[0-9]{2})$';
    this.reactiveForm = new FormGroup({
      'basicDetailsSection': new FormGroup({
        "merchantName": new FormControl(edit ? edit.merchantName : null, Validators.required),
        "description": new FormControl(edit ? edit.description : null, Validators.required),
        "email_id": new FormControl(edit ? edit.email_id : null, [Validators.required, Validators.email]),
        "contact_no": new FormControl(edit ? edit.contact_no : null, [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]+$')]),
        "r_m_maild_id": new FormControl(edit ? edit.r_m_maild_id : null, [Validators.required]),
      }),
      "nestedCheckboxesList": new FormGroup({
        "apiProduct": new FormControl(),
        "nestedCheckboxFilter": new FormControl(),
      }),
      "whitelistIpSection": new FormGroup({
        "AccountNo": new FormControl(),
        "Acc_name": new FormControl(),
        "merchantCertificate": new FormControl(null, [Validators.required]), 
        "url": new FormArray([new FormControl(null, [Validators.pattern(regURL)]), ]),
        "ip": new FormArray([new FormControl(null, [Validators.required, Validators.pattern(ipReg)]),]),
        "merchantId": new FormControl(null, [Validators.required, Validators.pattern(regEmployeeId)]),
        "SOLID": new FormControl(null, [Validators.required]),
        "file1": new FormControl(null, [Validators.required]),
        "checkBox": new FormControl(false, [Validators.requiredTrue]),
        "Encryption": new FormControl(),//'Select Encryption'

       
        // "clientCode": new FormControl(),
       
        // "Checksum": new FormControl(),//'Select Checksum'
        // "web": new FormControl(),//'Select Service Type'
        // "message": new FormControl(),//'Select Communication Method'
        // "header": new FormControl(),
        // "uatTestingID": new FormControl(),
        // "IFSC_Code": new FormControl(),//'Select IFSC Code'
        // "virtualCode": new FormControl(),
        // "refundCode": new FormControl(),
        // "interAccNo": new FormControl(),
        // "accName": new FormControl(),
        // "Auth_level": new FormControl(),
        // "Urn": new FormControl(),
        // "Acc_env": new FormControl(),//'Select Environment'
        // "Acc_validation": new FormControl(),//'Select Amount Validation'
        // "Acc_acceptance": new FormControl(),//'Select Acceptance Mode'
        // "Rec_mail": new FormControl(),
        // "Acc_mode": new FormControl(),

        // "Acc_trans": new FormControl(),
        // "Acc_amount": new FormControl(),//'Select Amount'

        

        // "port": new FormControl(),
        // "refJIRAID": new FormControl(),
       
      }),

    })
    this.reactiveForm.get("basicDetailsSection.email_id").setValue(this.email);
    this.reactiveForm.get("basicDetailsSection.merchantName").setValue(this.companyName);
    this.reactiveForm.get("basicDetailsSection.contact_no").setValue(this.mobileNo);
    this.reactiveForm.get("basicDetailsSection.r_m_maild_id").setValue(this.rm);

  }

  /*toastrmsg(type, title) {
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

  ngAfterViewInit() {
    console.log(this.BasicDetailsList, "2", this.RequestedApiList, "3", this.businessBankingList, "4", this.whitelistIpList,
      this.checkboxes)
    console.log(this.reactiveForm);
    var d1 = this.cartApiContainer.nativeElement;
    console.log(d1)
    console.log(this.matInput.nativeElement.value);
  }

  createCart() {
    console.log(this.reactiveForm.controls);

    console.log(this.matInput.nativeElement.value);
    console.log(this.matInput.nativeElement);

    console.log(this.cartApiContainer)

    this.cartApiContainer.nativeElement.insertAdjacentHTML('beforeend', '<label _ngcontent-c1="" style="padding-top: 10px; padding-left: 10px; padding-bottom: 5px; padding-right: 10px; border: 1px solid gainsboro; margin-bottom: 0px;"><span _ngcontent-c1="">Domain</span><span _ngcontent-c1="">&gt; Sub Domain</span><span _ngcontent-c1=""> &gt;&gt; ' + this.matInput.nativeElement.value + '</span><span _ngcontent-c1="" class="pull-right deleteRemoveObject" style="cursor: pointer;" >✖</span></label>');

  }

  displayAPIName(api: any): string {
    if (api && api.ApiId) {
      this.searchedItem = api.ApiId;

      console.log("You have selected API " + api.name + " Id=" + this.searchedItem);
      //  this.cartApiContainer.nativeElement.insertAdjacentHTML('beforeend', '<div class="two">'+api.name +'</div><p> Id='+this.searchedItem+' </p');
      console.log(this.cartApiContainer, event.target)
      this.searchedFieldValue = api.name;
      console.log(this.searchedFieldValue);

    }
    return api && api.name ? api.name : '';
  }
  upload(file) {
    this.progress = 1;
    const formData = new FormData();
    formData.append("file", file);

    this.http2
      .post("https://developer.icicibank.com/fileUpload", formData, {
        reportProgress: true,
        observe: "events"
      })
      .pipe(
        map((event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 / event.total) * event.loaded);
          } else if (event.type == HttpEventType.Response) {
            this.progress = null;
          }
        }),
        catchError((err: any) => {
          this.progress = null;
          alert(err.message);
          return throwError(err.message);
        })
      )
      .toPromise();
  }
  nextTab($e) {
    $e.preventDefault();
    // $('"#nav-tab").tabs a[href="#tab2"]').tab('show');
    this.setProgress(2);
    $('#nav-tab a[href="#tab2"]').tab('show');
    // $("#nav-tab").tabs("option", "active", $("#nav-tab").tabs('option', 'active')+1 );
  }
  setProgress(id) {


    if (id == 1 && this.reactiveForm.get('basicDetailsSection').invalid == false) {
      this.currentProgress1 = 0;
      this.currentProgress2 = 0;
      this.currentProgress3 = 0;
      this.step_no = 1;
    } else if (id == 2 && this.reactiveForm.get('basicDetailsSection').invalid == false) {
      this.currentProgress1 = 100;
      this.currentProgress2 = 0;
      this.currentProgress3 = 0;
      this.step_no = 2;
    } else if (id == 3 && this.reactiveForm.get('basicDetailsSection').invalid == false) {
      this.currentProgress2 = 100;
      this.step_no = 3;
      // this.onClickContinueBtn();
    } else if (id == 4 && this.reactiveForm.get('basicDetailsSection').invalid == false) {
      this.currentProgress3 = 100;
    }

  }
  downloadPDF(path,filename){

    this.adm.downloadFromURL(path).subscribe((data: any) => {
      console.log(data);
      let certificate = data._body;
      console.log(data._body);
      var blob = new Blob([certificate], {
        type: "text/pdf"
      });
      saveAs(blob,filename);
    },
    err => {
      console.log('err', err);
     
    });
  }



  readFile(fileEvent: any) {
    const file = fileEvent.target.files[0];
    const allowed_types = ['crt','txt','key'];

    if (fileEvent.target.files && fileEvent.target.files[0]) {

        this.fileName=fileEvent.target.files[0].name;
           
      
        this.filetype=fileEvent.target.files[0].type;
        const lastdot = this.fileName.lastIndexOf('.');
        const ext =this.fileName.substring(this.fileName.lastIndexOf('.')+1);
        this.extnsn=ext;
   
        if ((allowed_types).includes(ext)) {
          // alert("pass")
          this.fileTest=true;

          
          $(".fileError").text("");
          $(".fileError").hide();
         
       }
       else{
           this.filetype=fileEvent.target.files[0].type;
           this.fileTest=false;
          // alert("f")

           // alert(fileEvent.target.files[0].type)
           $(".fileError").text(ext+"File type not allowed.")
           $(".fileError").text('Only  .crt ,.txt,.key file type are  allowed')
           return false;

       }

    


    
    const reader = new FileReader();
    let self = this;
    reader.onload = (e: any) => {
    
        
 e.target.result.replace("data:image/png;base64,", "");
//console.log( e.target.result);
       
        self.Attach= e.target.result.split(',')[1];
    };
    
    reader.readAsDataURL(file);
 }
}

/*  */
}

  