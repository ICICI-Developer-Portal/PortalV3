import { Component, OnInit, TemplateRef, ViewChild, ViewChildren, ElementRef, QueryList, EventEmitter, Output, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { interval as observableInterval, Observable } from "rxjs";
import { takeWhile, scan, tap, map, startWith } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardService } from 'src/app/services/dashboard.service';
import { VariablesService } from 'src/app/services/Variables.service';
import { LoginService } from 'src/app/services';
import { ToasterService, Toast } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response, RequestMethod, ResponseContentType } from "@angular/http";


import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var showProdTabEnv: any; // just change here from arun answer.
declare var openProdCurrentTabEnv: any;
import { formatDate } from '@angular/common';
import { CONSTANTS } from 'config/application-constant';
import { PATTERNS } from 'config/regex-pattern';
import { DomSanitizer } from '@angular/platform-browser';
import { element } from '@angular/core/src/render3';
import { NestedListFilterPipePipe } from 'src/app/maindashboard/nested-list-filter-pipe.pipe';
import {  catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import {
  
  HttpEventType,
  HttpErrorResponse
} from "@angular/common/http";
declare var $: any;


@Component({
  selector: 'app-production-onboarding-page',
  templateUrl: './production-onboarding-page.component.html',
  styleUrls: ['./production-onboarding-page.component.css']
})
export class ProductionOnboardingPageComponent implements OnInit {

  modalRef: BsModalRef;
  reactiveForm: FormGroup;
  responseData: [];
  menuArray: any[];
  arrayObjectOfListIds = [];
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
  callbackURLInfo: any = "The URL should start with https.\n We accept only '.cer' and '.txt' formats.\n For Isurepay we require two webservice URLs";
  isemail_check: boolean = false;
  isemail_reg_check: string = "";
  selectedValue = [];
  term: any;
  fetchedJiraId;
  fetchedMerchantName;
  fetchedDescription;
  fetchedSpocEmail;
  fetchedSpocPhone;
  fetchedRelManager;
  fetchedDomain;
  fetchedDomainApi;
  domainApiNumber;
  list;
  selectedJiraId;
  errorMsg:any = "Something went wrong. Please try again in some time.";
  /** Add var for search field */
  myControl = new FormControl();
  APIAutocompletDataSource: any[] = [];
  filteredOptions: Observable<string[]>;
  searchedItem: any;
  searchedFieldValue: any;
  progress: number;
  currentProgress:any = 1;
  currentProgress1:any = 0;
  currentProgress2:any = 0;
  currentProgress3:any = 0;
  step_no:any = 1;
  // term:any;


  /** end here */
  constructor(
    private http: Http,
    private http2: HttpClient,
    private HttpClient: HttpClient,
    private formbuilder: FormBuilder,
    private objOnBoarding: VariablesService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private adm: LoginService,
    private toasterService: ToasterService,
    private dashboardService: DashboardService,
    private elementRef: ElementRef) {
    this.adm.getUserId().subscribe(data => {
      this.logged_in =
        data != "" && data != null && data != undefined ? true : false;
    });

  }
  ngOnInit() {
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

      if ($.trim($("#searchFilter").val()) == '') {
        console.log(items.length)
        $("").css("display", "");
        // $(".first-level li,.first-level a,.first-level p,.customcsscontainer,.customcsscontainer input").show();
        $(".first-level p,.customcsscontainer input,.customcsscontainer label").show();
        $(".second-level,.third-level,.fourth-level,.fifth-level").css('display', 'none')
        $(".second-level,third-level,.fourth-level,.fifth-level").hide();


      } else {
        items.each(function () {
          var block;
          block = $(this);
          // console.log( $(this).attr('greatgreatgrandparentname'))
          // console.log( $(this).attr('greatgrandparentname'))
          // console.log( $(this).attr('grandparentname'))
          // console.log( $(this).attr('parentname'))
          if (block.text().toLowerCase().indexOf(text) != 0) {
            block.hide();
          } else {
            block.show();
            console.log(block)
            $(".first-level li,.first-level a,.first-level ul,.customcsscontainer").show();

            $(".first-level p").hide();


          }
        });

      }
      $(".first-level").show();
    })
    this.getRequestIds()
    console.log(this.getRequestIds())

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
    }



  }
  onClickContinueBtn() {
    console.log("rchd inside cninue btn", this.reactiveForm.get('nestedCheckboxesList').get('domainApi'))

    // if ($(".customcsscontainer input:checkbox:checked").length > 0) { $("#thrdSectionChld").removeClass("overlay_parent"); $("#submitButton,#file1").removeClass("blockElements"); }
    // else { $("#thrdSectionChld").addClass("overlay_parent");    }
    // //this.modalRef.hide();
    // this.arrayObjectOfListIds = $(".customcsscontainer input:checkbox:checked").map(function () {
    //   return this.id
    // }).get()
    // console.log(this.arrayObjectOfListIds)
    //const formArray: FormArray = this.reactiveForm.get(this.responseData) as FormArray;
    // this.domainApiNumber = (this.fetchedDomainApi.replace(/[^0-9]/g, ''));
    this.domainApiNumber = this.fetchedDomainApi;

    console.log(this.domainApiNumber)
    var json = {
      ID: this.domainApiNumber
    };
    this.additionalFieldComingFromServer(json);
    console.log("json", json);

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
        console.log('err', err);
       // this.router.navigate(['error']);this.toastrmsg('error',
       this.toastrmsg('error',this.errorMsg);
      });

  }


  // ================================================================
  @ViewChild('BasicDetailsList') BasicDetailsList: ElementRef;
  @ViewChild('RequestedApiList') RequestedApiList: ElementRef;
  @ViewChild('businessBankingList') businessBankingList: ElementRef;
  @ViewChild('whitelistIpList') whitelistIpList: ElementRef;
  @ViewChild('checkboxes') checkboxes: ElementRef;
  @ViewChild('cartApiContainer', { read: ElementRef }) private cartApiContainer: ElementRef;
  @ViewChild('matInput', { read: ElementRef }) private matInput: ElementRef;




  // onClickOfCheckboxes() {
  //   alert(this.checkboxes.nativeElement.checked ? "it's checked" : "it's not checked")
  // }
  // checkValue(e) {
  //   //  this.checkboxes.forEach((element) => {
  //   console.log(JSON.stringify(this.checkboxes) + "hiii reached" + JSON.stringify(e));
  //   // alert(this.checkboxes.nativeElement)
  //   //  event.nativeElement.checked = false;
  //   //  });
  //   console.log(JSON.stringify(this.checkboxes.nativeElement))

  //   console.log(this.checkboxes.nativeElement.checked ? "it's checked" : "it's not checked")
  // }

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
    this.checksum = false; this.encryption = false; this.certificate = false; this.service = false; this.message = false;
    this.ifsc = false; this.virtualCode = false; this.ips = false; this.interAccNo = false; this.accName = false;
    this.authLevel = false; this.urn = false; this.env = false; this.valid = false; this.accept = false;
    this.recipient = false; this.mode = false; this.trans = false; this.amount = false; this.headers = false;
    this.uatTestingID = false;
    this.resetField();
  }
  multipleSelectAPI(e, isChecked: boolean) {
    this.forResetiingAdditionalFields();
    if ($(".customcsscontainer input:checkbox:checked").length) {
      $('.ContinueBtn').prop('disabled', false);
      $("#dynamic-list-check").css("display", "block");
      $("#scndSectionWhitelistIp").addClass("ng-valid");
      $("#scndSectionWhitelistIp").removeClass("ng-invalid");

    }
    else {
      $('.ContinueBtn').prop('disabled', true);
      $("#thrdSectionChld").addClass("overlay_parent");
      $("#dynamic-list-check").css("display", "none");
      $("#scndSectionWhitelistIp").addClass("ng-invalid");
      $("#scndSectionWhitelistIp").removeClass("ng-valid");
      $("#submitButton,#file1").addClass("blockElements")
    }
    if (isChecked) {
      this.selectedValue.push({
        "childName": e.target.getAttribute('value'),
        "parentName": e.target.getAttribute('parentName'),
        "grandParentName": e.target.getAttribute('grandParentName'),
        "greatGrandParentName": e.target.getAttribute('greatGrandParentName'),
        "greatGreatGrandParentName": e.target.getAttribute('greatGreatGrandParentName'),
        "id": e.target.getAttribute('id')
      });
      console.log(this.selectedValue)

    } else {

      let index = this.selectedValue.indexOf(e);
      console.log(e.target);
      this.selectedValue.splice(index, 1);
      console.log(this.selectedValue, "this.selectedValue");
    }

  }
  deleteRemoveObjectFromCart(e) {
    this.forResetiingAdditionalFields();
    console.log(e.target);

    console.log(this.selectedValue.length)
    console.log(e.target.getAttribute("id"));
    let deletedId = e.target.getAttribute("id");
    $("input[id=" + e.target.getAttribute("id") + "]").prop("checked", false);
    this.selectedValue = this.selectedValue.filter(function (obj) {
      console.log(obj.childName, e.target.getAttribute("class"))
      return obj.childName !== e.target.getAttribute("class");

    });

    console.log(this.selectedValue)
    if (this.selectedValue.length > 0) {
      this.arrayObjectOfListIds = $(".customcsscontainer input:checkbox:checked").map(function () {
        return this.id
      }).get()
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
          console.log('err', err);
          //this.router.navigate(['error']);
          this.toastrmsg('error',this.errorMsg);
        });
    }
    else {
      $('.ContinueBtn').prop('disabled', true);
      $("#thrdSectionChld").addClass("overlay_parent");
      $("#dynamic-list-check").css("display", "none");
      $("#scndSectionWhitelistIp").addClass("ng-invalid");
      $("#scndSectionWhitelistIp").removeClass("ng-valid");
      $("#submitButton,#file1").addClass("blockElements");

    }
  }

  onSubmitProductionForm(Prodconfirm) {

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

    let inputFields = {
      userName: localStorage.getItem("username"),
     
      domainName: this.reactiveForm.controls.nestedCheckboxesList.get("domain").value,
      refjiraId:this.reactiveForm.controls.basicDetailsSection.get("JiraId").value,
      domainApis: reactiveFromFieldValues.nestedCheckboxesList.domainApi,
      mName: reactiveFromFieldValues.basicDetailsSection.merchantName,
      desc: reactiveFromFieldValues.basicDetailsSection.description,
      spocEmail: reactiveFromFieldValues.basicDetailsSection.email_id,
      spocPhone: reactiveFromFieldValues.basicDetailsSection.contact_no,
      relManager: reactiveFromFieldValues.basicDetailsSection.r_m_maild_id,
      env: "PROD",
      // ips: "",
      // callbackUrl: "",
      AccountNo: reactiveFromFieldValues.whitelistIpSection.AccountNo ? reactiveFromFieldValues.whitelistIpSection.AccountNo : '',
      ClientCode: reactiveFromFieldValues.whitelistIpSection.clientCode ? reactiveFromFieldValues.whitelistIpSection.clientCode : '',
      //url: reactiveFromFieldValues.whitelistIpSection.url ? reactiveFromFieldValues.whitelistIpSection.url : '',
      url: urlValues.toString() ? urlValues.toString() : '',
      Ip: ipValues.toString() ? ipValues.toString() : '',
      Port: reactiveFromFieldValues.whitelistIpSection.port ? reactiveFromFieldValues.whitelistIpSection.port : '',
      Checksum: reactiveFromFieldValues.whitelistIpSection.Checksum ? reactiveFromFieldValues.whitelistIpSection.Checksum : '',
      Encryption: reactiveFromFieldValues.whitelistIpSection.Encryption ? reactiveFromFieldValues.whitelistIpSection.Encryption : '',
      Certificate: reactiveFromFieldValues.whitelistIpSection.Certificate ? reactiveFromFieldValues.whitelistIpSection.Certificate : '',
      web: reactiveFromFieldValues.whitelistIpSection.web ? reactiveFromFieldValues.whitelistIpSection.web : '',
      message: reactiveFromFieldValues.whitelistIpSection.message ? reactiveFromFieldValues.whitelistIpSection.message : '',
      IFSC_Code: reactiveFromFieldValues.whitelistIpSection.IFSC_Code ? reactiveFromFieldValues.whitelistIpSection.IFSC_Code : '',
      virtualCode: reactiveFromFieldValues.whitelistIpSection.virtualCode ? reactiveFromFieldValues.whitelistIpSection.virtualCode : '',
      refundCode: reactiveFromFieldValues.whitelistIpSection.refundCode ? reactiveFromFieldValues.whitelistIpSection.refundCode : '',
      Account_no: reactiveFromFieldValues.whitelistIpSection.Account_no ? reactiveFromFieldValues.whitelistIpSection.Account_no : '',
      Acc_name: reactiveFromFieldValues.whitelistIpSection.Acc_name ? reactiveFromFieldValues.whitelistIpSection.Acc_name : '',
      Auth_level: reactiveFromFieldValues.whitelistIpSection.Auth_level ? reactiveFromFieldValues.whitelistIpSection.Auth_level : '',
      Urn: reactiveFromFieldValues.whitelistIpSection.Urn ? reactiveFromFieldValues.whitelistIpSection.Urn : '',
      Acc_env: reactiveFromFieldValues.whitelistIpSection.Acc_env ? reactiveFromFieldValues.whitelistIpSection.Acc_env : '',
      Acc_validation: reactiveFromFieldValues.whitelistIpSection.Acc_validation ? reactiveFromFieldValues.whitelistIpSection.Acc_validation : '',
      Acc_acceptance: reactiveFromFieldValues.whitelistIpSection.Acc_acceptance ? reactiveFromFieldValues.whitelistIpSection.Acc_acceptance : '',
      Rec_mail: reactiveFromFieldValues.whitelistIpSection.Rec_mail ? reactiveFromFieldValues.whitelistIpSection.Rec_mail : '',
      Acc_mode: reactiveFromFieldValues.whitelistIpSection.Acc_mode ? reactiveFromFieldValues.whitelistIpSection.Acc_mode : '',
      Acc_trans: reactiveFromFieldValues.whitelistIpSection.Acc_trans ? reactiveFromFieldValues.whitelistIpSection.Acc_trans : '',
      Acc_amount: reactiveFromFieldValues.whitelistIpSection.Acc_amount ? reactiveFromFieldValues.whitelistIpSection.Acc_amount : '',
      Acc_headers: reactiveFromFieldValues.whitelistIpSection.header ? reactiveFromFieldValues.whitelistIpSection.header : '',
      Acc_uatTestingID: reactiveFromFieldValues.whitelistIpSection.uatTestingID ? reactiveFromFieldValues.whitelistIpSection.uatTestingID : '',
      file1: reactiveFromFieldValues.whitelistIpSection.file1
    };
    console.log(inputFields);
    //console.log(reactiveFromFieldValues.value.Ip);

    const formData = new FormData();
    formData.append("userName", inputFields["userName"]); //1
    formData.append("domainName", inputFields["domainName"]);//2
    formData.append("domainApis", inputFields["domainApis"]);//3
    formData.append("mName", inputFields["mName"]);//4
    formData.append("desc", inputFields["desc"]);//5
    formData.append("spocEmail", inputFields["spocEmail"]);//6
    formData.append("spocPhone", inputFields["spocPhone"]);//7
    formData.append("relManager", inputFields["relManager"]);//8
    formData.append("env", inputFields["env"]);//9
    formData.append("AccountNo", inputFields["AccountNo"]);//10
    formData.append("ClientCode", inputFields["ClientCode"]);//11
    formData.append("url", inputFields["url"]);//12
    formData.append("Ip", inputFields["Ip"]);//13
    formData.append("Port", inputFields["Port"]);//14
    formData.append("Checksum", inputFields["Checksum"]);//15
    formData.append("Encryption", inputFields["Encryption"]);//16
    formData.append("Certificate", inputFields["Certificate"]); //17
    formData.append("web", inputFields["web"]);//17
    formData.append("message", inputFields["message"]);//18
    formData.append("IFSC_Code", inputFields["IFSC_Code"]);//19
    formData.append("virtualCode", inputFields["virtualCode"]);//20
    formData.append("refundCode", inputFields["refundCode"]);//21
    formData.append("Account_no", inputFields["Account_no"]);//22
    formData.append("Acc_name", inputFields["Acc_name"]);//23
    formData.append("Auth_level", inputFields["Auth_level"]);//24
    formData.append("Urn", inputFields["Urn"]);//25
    formData.append("Acc_env", inputFields["Acc_env"]);//26
    formData.append("Acc_validation", inputFields["Acc_validation"]);//27
    formData.append("Acc_acceptance", inputFields["Acc_acceptance"]);//28
    formData.append("Rec_mail", inputFields["Rec_mail"]);//29
    formData.append("Acc_mode", inputFields["Acc_mode"]);//30
    formData.append("Acc_trans", inputFields["Acc_trans"]);//31
    formData.append("Acc_amount", inputFields["Acc_amount"]);//32


    // formData.append("refundCode", inputFields["refundCode"]);
    // formData.append("callbackUrl", inputFields["callbackUrl"]);
    


   
    // formData.append("Acc_headers", inputFields["Acc_headers"]);
    // formData.append("Acc_uatTestingID", inputFields["Acc_uatTestingID"]);
    console.log(formData);
    let a: any = (<HTMLInputElement>document.getElementById("file1")).files;
    console.log("a", a);
    for (let k = 0; k < a.length; k++) {
      formData.append("file1", a[k]); //33
      console.log(a[k], "oooooooooo")
      console.log(formData)
    }
    // Appended three new elements

    formData.append("refJIRAID", inputFields["refjiraId"]);//34
    formData.append("Headers", inputFields["Acc_headers"]);//35
    formData.append("TestingID", inputFields["Acc_uatTestingID"]);//36
    formData.forEach((value, key) => {
      console.log(key + " " + value)
    });

    // Jira Service
    //https://developerapi.icicibank.com:8443/api/v2/jira-UAT
    //https://developerapi.icicibank.com:8443/api/v2/jira
    this.HttpClient.post<any>(
      "https://developerapi.icicibank.com:8443/api/v2/jira",
      formData
    ).subscribe(
      res => {
        console.log(res, formData);
        // alert(res.jiraId)
        // this.toastrmsg('success', res.jiraId + " has been created");
        this.modalRef = this.modalService.show(Prodconfirm, {
          backdrop: "static"
        });
        this.confirmMsgProd = res.jiraId;

        console.log(this.confirmMsgProd)
        if (res.success === "true") {
          //File upload service
          var formData = new FormData();
          let b: any = (<HTMLInputElement>document.getElementById("file1")).files;
          for (let k = 0; k < b.length; k++) {
            console.log(b, k)
            console.log(b[k])
            console.log(res.jiraId, res)

            formData.append(res.jiraId, b[k]);
          }
          this.HttpClient.post<any>(
            "https://developer.icicibank.com/fileUpload",
            formData
          ).subscribe(
            res => {
              console.log(res);
              console.log(res.jiraId, "rchd");
            },
            err => {
              console.log('err', err);
              // this.router.navigate(['error']);
              this.toastrmsg('error',this.errorMsg);
            },
          );
        }
      },
      err => {
        console.log('err', err);
      //  this.router.navigate(['error']);
      this.toastrmsg('error',this.errorMsg);
      },
    );


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
    this.reactiveForm = new FormGroup({
      'basicDetailsSection': new FormGroup({
        "JiraId": new FormControl("Approved/Complete UAT Request ID"),
        "merchantName": new FormControl(),
        "description": new FormControl(),
        "email_id": new FormControl(),
        "contact_no": new FormControl(),
        "r_m_maild_id": new FormControl(),
      }),
      "nestedCheckboxesList": new FormGroup({
        "nestedList": new FormArray([]),
        "nestedCheckboxFilter": new FormControl(),
        "domain": new FormControl(),
        "domainApi": new FormControl(),

      }),
      "whitelistIpSection": new FormGroup({
        "AccountNo": new FormControl(),
        "Acc_name": new FormControl(),
        "Account_no": new FormControl(),
        "clientCode": new FormControl(),
        "url": new FormArray([
          new FormControl(null, [Validators.pattern(regURL)]),
        ]),
        "Checksum": new FormControl('Select Checksum'),
        "Encryption": new FormControl('Select Encryption'),
        "Certificate": new FormControl('Certificate'),
        "web": new FormControl('Select Service Type'),
        "message": new FormControl('Select Communication Method'),
        "header": new FormControl(),
        "uatTestingID": new FormControl(),
        "IFSC_Code": new FormControl('Select IFSC Code'),
        "virtualCode": new FormControl(),
        "refundCode": new FormControl(),
        "interAccNo": new FormControl(),
        "accName": new FormControl(),
        "Auth_level": new FormControl(),
        "Urn": new FormControl(),
        "Acc_env": new FormControl('Select Environment'),
        "Acc_validation": new FormControl('Select Amount Validation'),
        "Acc_acceptance": new FormControl('Select Acceptance Mode'),
        "Rec_mail": new FormControl(),
        "Acc_mode": new FormControl(),
        "Acc_trans": new FormControl(),
        "Acc_amount": new FormControl('Select Amount'),
        "ip": new FormArray([
          // <FormArray>this.reactiveForm.get('whitelistIpSection').get('ipRows'),Validators.required
          new FormControl(null, [Validators.required, Validators.pattern(ipReg)]),
        ]),

        "port": new FormControl(),
        "refJIRAID": new FormControl(),
        "file1": new FormControl(null, [Validators.required]),
        "checkBox": new FormControl(false, [Validators.requiredTrue])
      }),

    })

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

  ngAfterViewInit() {
    console.log(this.BasicDetailsList, "2", this.RequestedApiList, "3", this.businessBankingList, "4", this.whitelistIpList,
      this.checkboxes)
    console.log(this.reactiveForm);

    var d1 = this.cartApiContainer.nativeElement;
    console.log(d1)

  }

  createCart() {
    console.log(this.reactiveForm.controls);


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



  getRequestIds() {
   let username = localStorage.getItem("username");
    console.log(username)
    // const headers = new HttpHeaders().set(
    //   "Content-Type",
    //   "application/x-www-form-urlencoded"
    // );

    // let options = {
    //   method: "POST",
    //   headers: new HttpHeaders().set(
    //     "Content-Type",
    //     "application/x-www-form-urlencoded"
    //   )
    // };
    console.log("reached", this.list)
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token": localStorage.getItem("jwt")
    });
    console.log(headers)


    let options = new RequestOptions({ headers: headers });
    console.log(options)


    let body = new URLSearchParams();
    body.set("username", username);
    this.http.post(
      // this.http.post(
      "https://developer.icicibank.com/rest/fetch-jiraid",
      body.toString(),
      options
    ).subscribe((data: any) => {
      // res => {
      console.log(data.json())

      this.list = data.json();
      if(this.list.length>0){
        console.log(" jira id available")
        var datalist = this.list;
      }
      else{
        var datalist ;
        console.log("no approved jira id available")
      }

      console.log(this.list)
     

     

      console.log("for pushing")

      console.log(datalist["JiraId"], 'JiraId')

    },
      err => {
        this.list = [];
        //this.router.navigate(['error']);
        this.toastrmsg('error',this.errorMsg);
      }
    );
  }
  changeItem(JiraId) {
    this.forResetiingAdditionalFields();
    this.selectedJiraId = JiraId;
    console.log(this.reactiveForm.controls.basicDetailsSection.get("JiraId").value);
  
    for (var i in this.list) {
      console.log(i);
      if (this.list[i]["JiraId"] == JiraId) {
        console.log(this.list[i]["JiraId"], "=====", JiraId, "======", i);
        console.log(this.list[i]["MerchantName"]);
        this.fetchedDomainApi = this.list[i]["DomainApi"];
        this.reactiveForm.controls.basicDetailsSection.patchValue({
          "JiraId": this.list[i]["JiraId"],
          "merchantName": this.list[i]["MerchantName"],
          "description": this.list[i]["Description"],
          "email_id": this.list[i]["SpocEmail"],
          "contact_no": this.list[i]["SpocPhone"],
          "r_m_maild_id": this.list[i]["RelManager"]
        });
        this.reactiveForm.controls.nestedCheckboxesList.patchValue({
          "domain": this.list[i]["Domain"],
          "domainApi": this.list[i]["DomainApi"]
        });
        break;
      }
    }
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
  nextTab($e){
    $e.preventDefault();
    // $('"#nav-tab").tabs a[href="#tab2"]').tab('show');
    this.setProgress(2);
    $('#nav-tab a[href="#tab2"]').tab('show');
    // $("#nav-tab").tabs("option", "active", $("#nav-tab").tabs('option', 'active')+1 );
  }

  setProgress(id){
 
     
  if(id == 1 && this.reactiveForm.get('basicDetailsSection').invalid==false){
    this.currentProgress1 = 0;
    this.currentProgress2 = 0;
    this.currentProgress3 = 0;
    this.step_no = 1;
  }else if(id == 2 && this.reactiveForm.get('basicDetailsSection').invalid==false){
    this.currentProgress1= 100;
    this.currentProgress2 = 0;
    this.currentProgress3 = 0;
    this.step_no = 2;
  }else if(id == 3 && this.reactiveForm.get('basicDetailsSection').invalid==false){
    this.currentProgress2= 100;
    this.step_no = 3;
    this.onClickContinueBtn();
  }else if(id == 4 && this.reactiveForm.get('basicDetailsSection').invalid==false){
    this.currentProgress3= 100;
    this.step_no = 3;
  }

}

}
