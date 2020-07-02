import { Component, OnInit, TemplateRef, ViewChild, ViewChildren, ElementRef, QueryList, EventEmitter, Output, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardService } from 'src/app/services/dashboard.service';
import { VariablesService } from 'src/app/services/Variables.service';
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
declare var $: any;


@Component({
  selector: 'app-uatonboarding-dashboard-page',
  templateUrl: './uatonboarding-dashboard-page.component.html',
  styleUrls: ['./uatonboarding-dashboard-page.component.css']
})
export class UATonboardingDashboardPageComponent implements OnInit {
  showMe: boolean = false;
  modalRef: BsModalRef;

  ipInput: string;
  count: number;
  reactiveForm: FormGroup;
  submitted = false;
  responseData: [];
  menuArray: any[];
  showMore = 'show More'
  hidden: boolean;
  css: boolean;
  clicked = 0;
  objOnB: any;
  apiArr: any = [];
  idArr: any = [];
  selectedCheckboxValue: [];
  arrayObjectOfListIds = [];
  arrayObjectOfValue = [];
  logged_in: Boolean = false;
  additionalParams: any;
  Ecollection_Show: Boolean = false;
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
  commModel: boolean = false;
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
  confirmMsg: any;
  showTab = 1;
  apiGreenCheck: string = "invalid";
  confirmMsgProd: any;
  showError: string = "hidden";
  addFalse:boolean=true;
  // ====================================
  // get formArr() {
  //   var cntls= this.reactiveForm.controls;
  //   console.log(this.reactiveForm.get('whitelistIpSection').get('ipRows').controls)
  //   console.log(cntls.ipRows)


  //   console.log(this.reactiveForm.controls)
  //   return this.reactiveForm.get('whitelistIpSection').get('ipRows') as FormArray;
  // }
  // $

  initipRows() {
    return this.formbuilder.group({
      ip: ['']
    });
  }

  // addNewIPField() {
  //   const control = <FormArray>this.reactiveForm.get('whitelistIpSection').get('ipRows');
  //   console.log(control.length);
  //   console.log(control);
  //   console.log(control.at(0));
  //   if(control.length<=9){ 
  //    control.push(new FormControl(null, [Validators.required,Validators.pattern('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')]))
  //   }else{}   
  // }

  // deleteRow(i: number) {
  //   console.log(i);
  //   const control = <FormArray>this.reactiveForm.get('whitelistIpSection').get('ipRows');
  //   control.removeAt(i);

  // }


  addNewIPField() {
    const control = <FormArray>this.reactiveForm.get('additionalField').get('ip');
    console.log(control.length);
    console.log(control);
    console.log(control.at(0));
    if(control.length<=9){ 
     control.push(new FormControl(null, [Validators.required,Validators.pattern('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')]))
    }else{}   
  }

  deleteRow(i: number) {
    console.log(i);
    const control = <FormArray>this.reactiveForm.get('additionalField').get('ip');
    control.removeAt(i);
  }
  resetField(){
    const control = <FormArray>this.reactiveForm.get('additionalField').get('ip');
    
      while (control.length > 1) {
        control.removeAt(1)
      }
      control.reset();
  }

  // ====================================


  select(i) {
    this.clicked = i;
    alert(i)
  }
  isChecked: any;
  toggle() {
    this.hidden = !this.hidden;
    this.css = !this.css;
  }
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

    this.router.navigate(["/index"]);
  }
  HWI_link(id) {
    this.showTab = id;
    //this.active ='#F06321';
  }
  onClickContinueBtn() {
    if ($(".customcsscontainer input:checkbox:checked").length > 0) { $("#thrdSectionChld").removeClass("overlay_parent"); $("#submitButton,#file1").removeClass("blockElements"); }
    else { $("#thrdSectionChld").addClass("overlay_parent");    }
    //this.modalRef.hide();
    this.arrayObjectOfListIds = $(".customcsscontainer input:checkbox:checked").map(function () {
      return this.id
    }).get()
    console.log(this.arrayObjectOfListIds)
    const formArray: FormArray = this.reactiveForm.get(this.responseData) as FormArray;
    var json = {
      ID: this.arrayObjectOfListIds.join(),
    };
    console.log("json", json.ID);
    this.adm.getUATFromData(json).subscribe((data: any) => {
      console.log(data);
      var response = data._body;
      var obj = JSON.parse(response);
      console.log("obj reached", obj);
      localStorage.setItem('nodevalue', obj.API_NAME)
      this.additionalParams = obj.ADDITIONAL_DETAILS.split(",");
      localStorage.setItem('additonalFields', this.additionalParams)

      for (var i = 0; i < this.additionalParams.length; i++) {
        console.log(this.additionalParams[i]);

        if (this.additionalParams[i].match("Account Number")) {
          this.accNo = true;
        }
        if (this.additionalParams[i].match("Client Code")) {
          this.clientCode = true;
        }
        if (this.additionalParams[i].match("URL")) {
          this.url = true;
        }
        if (this.additionalParams[i].match("IP")) {
          this.ifFieldisVisible(this.additionalParams[i]);
          this.ip = true;
        }
        if (this.additionalParams[i].match("Port")) {
          this.port = true;
        }
        if (this.additionalParams[i].match("Checksum")) {
          this.checksum = true;
        }
        if (this.additionalParams[i].match("Encryption")) {
          this.encryption = true;
        }
        if (this.additionalParams[i].match("Certificate")) {
          this.certificate = true;
        }
        if (this.additionalParams[i].match("Service Type")) {
          this.service = true;
        }
        if (this.additionalParams[i].match("Communication Method")) {
          this.commModel = true;
        }
        if (this.additionalParams[i].match("IFSC Code")) {
          this.ifsc = true;
        }
        if (this.additionalParams[i].match("Virtual Code")) {
          this.virtualCode = true;
        }
        if (this.additionalParams[i].match("IPS Refund Code")) {
          this.ips = true;
        }
        if (this.additionalParams[i].match("Intermediate Account Number")) {
          this.interAccNo = true;
        }
        if (this.additionalParams[i].match("Account Name")) {
          this.accName = true;
        }
        if (this.additionalParams[i].match("Authorization Level")) {
          this.authLevel = true;
        }
        if (this.additionalParams[i].match("URN")) {
          this.urn = true;
        }
        if (this.additionalParams[i].match("Environment")) {
          this.env = true;
        }
        if (this.additionalParams[i].match("Validation Mode")) {
          this.valid = true;
        }
        if (this.additionalParams[i].match("Acceptance Mode")) {
          this.accept = true;
        }
        if (this.additionalParams[i].match("Recipient Mail ID")) {
          this.recipient = true;
        }
        if (this.additionalParams[i].match("Mode Offered")) {
          this.mode = true;
        }
        if (this.additionalParams[i].match("Transaction Limit")) {
          this.trans = true;
        }
        if (this.additionalParams[i].match("Amount")) {
          this.amount = true;
        }
        if (this.additionalParams[i].match("Headers")) {
          console.log(this.additionalParams[i], "hiii")
          this.headers = true;
        }
        if (this.additionalParams[i].match("TestingID")) {
          this.uatTestingID = true;
        }
      }
      console.log("final", this.additionalParams);
    },
      err => {
        console.log('err', err);
        this.router.navigate(['error']);
      });

  }

  addIPs() {

    var count = $('.countIp').length;
    console.log(this.count)
    if (count <= 9) {
      console.log(count, "$$$$$$$$$$$$$")
      var addinput = $("<div class='form-group col-md-6 countIp'><div class='width_100prcnt'><label for='contract'>IP</label></div><div class='col-md-11'><div class='row'><div class='input-group '><input aria-describedby='basic-addon2' aria-label='IP' class='form-control ipValues' placeholder='Your IP' type='text'><div class='input-group-append'><span _ngcontent-c1 class='input-group-text add-ip-addon dynamic' id='basic-addon2" + count + "' (click)='removeInputField()'>-</span></div></div></div></div></div>");
      addinput.insertAfter("#addIPUnique");
      $("#countexceeder").remove();
      count++;

    }
    else {
      if ($("#countexceeder").length < 1) {
        $("<span style='color: #ae282e;'  id='countexceeder'>You can add maximum 10 IP</span>").insertAfter(".addErrorclasafter");

      }
    }

    //$("#addIPUnique").append("<div class='form-group col-md-6' *ngIf='ip'><div class='width_100prcnt'><label for='contract'>IP</label></div><input class='form-control col-md-11' placeholder='Your IP' formControlName='ip' type='text' />");
  }

  // adding ip Field.......via $$$


  // ================================================================
  @ViewChild('BasicDetailsList') BasicDetailsList: ElementRef;
  @ViewChild('RequestedApiList') RequestedApiList: ElementRef;
  @ViewChild('businessBankingList') businessBankingList: ElementRef;
  @ViewChild('whitelistIpList') whitelistIpList: ElementRef;
  //@ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  @ViewChild('checkboxes') checkboxes: ElementRef;
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
      //  document.querySelector( data).scrollIntoView({behavior:"smooth"});
      //this.scrollIntoView({behavior:"smooth"});
      // this.scrollToTop(this.BasicDetailsList)
      this.BasicDetailsList.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      // this.BasicDetailsList.nativeElement.scrollTo(0);
    }
    else if (data == "RequestedApiList") {
      //   data.scrollIntoView({behavior:"smooth"});
      this.RequestedApiList.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
    else if (data == "businessBankingList") {
      // data.scrollIntoView({behavior:"smooth"});
      this.businessBankingList.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
    else if (data == "whitelistIpList") {
      this.whitelistIpList.nativeElement.scrollIntoView({ behavior: "smooth" });
    }

    ;
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
  //merchantName = new FormControl('');

  constructor(private HttpClient: HttpClient,
    private formbuilder: FormBuilder,
    private objOnBoarding: VariablesService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private adm: LoginService,
    private toasterService: ToasterService,
    private dashboardService: DashboardService,) {
    this.adm.getUserId().subscribe(data => {
      this.logged_in =
        data != "" && data != null && data != undefined ? true : false;
    });

  }
  // requested api dropdown
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
  selectedDomainName: string = '';

  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    this.parentDataDomainName = event.target.value;
    console.log(this.parentDataDomainName)

  }
  multipleSelectAPI(e){
  
  if ($(".customcsscontainer input:checkbox:checked").length) {
    $('.ContinueBtn').prop('disabled', false);
    //alert(($(".customcsscontainer input:checkbox:checked").length))
    //  $("#thrdSectionChld").removeClass("overlay_parent")
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
    
    this.accNo = false;
    this.clientCode = false;
    this.url = false;
    this.ip = false;
    this.port = false;
    this.checksum = false;
    this.encryption = false;
    this.certificate = false;
    this.service = false;
    this.commModel = false;
    this.ifsc = false;
    this.virtualCode = false;
    this.ips = false;
    this.interAccNo = false;
    this.accName = false;
    this.authLevel = false;
    this.urn = false;
    this.env = false;
    this.valid = false;
    this.accept = false;
    this.recipient = false;
    this.mode = false;
    this.trans = false;
    this.amount = false;
    this.headers = false;
    this.uatTestingID = false;
    this.resetField();
        }
      
         
  
}
  onSubmitUATForm(Prodconfirm) {

    var values = [];
    $('.countIp .form-control').each(function () {
      values.push(this.value);
      console.log(values);
    });
    console.log(values);
    console.log(values.toString())
    let reactiveFromFieldValues = this.reactiveForm.value;
    console.log(reactiveFromFieldValues)
    console.log(reactiveFromFieldValues.basicDetailsSection.merchantName)

    console.log(localStorage.getItem("username"))
    let inputFields = {
      userName: localStorage.getItem("username"),
      domainName: localStorage.getItem("nodevalue"),
      domainApis: this.arrayObjectOfValue + '(' + this.arrayObjectOfListIds.toString() + ')',  //this.apiArr + '(' + this.idArr + ')',
      mName: reactiveFromFieldValues.basicDetailsSection.merchantName,
      desc: reactiveFromFieldValues.basicDetailsSection.description,
      spocEmail: reactiveFromFieldValues.basicDetailsSection.email_id,
      spocPhone: reactiveFromFieldValues.basicDetailsSection.contact_no,
      relManager: reactiveFromFieldValues.basicDetailsSection.r_m_maild_id,
      env: "UAT",
      // ips: "",
      // callbackUrl: "",
      AccountNo: reactiveFromFieldValues.additionalField.AccountNo ? reactiveFromFieldValues.additionalField.AccountNo : '',
      ClientCode: reactiveFromFieldValues.additionalField.ClientCode ? reactiveFromFieldValues.additionalField.ClientCode : '',
      url: reactiveFromFieldValues.additionalField.url ? reactiveFromFieldValues.additionalField.url : '',
      Ip: values.toString() ? values.toString() : '',
      Port: reactiveFromFieldValues.additionalField.port ? reactiveFromFieldValues.additionalField.port : '',
      Checksum: reactiveFromFieldValues.additionalField.Checksum ? reactiveFromFieldValues.additionalField.Checksum : '',
      Encryption: reactiveFromFieldValues.additionalField.Encryption ? reactiveFromFieldValues.additionalField.Encryption : '',
      Certificate: reactiveFromFieldValues.additionalField.Certificate ? reactiveFromFieldValues.additionalField.Certificate : '',
      web: reactiveFromFieldValues.additionalField.web ? reactiveFromFieldValues.additionalField.web : '',
      message: reactiveFromFieldValues.additionalField.message ? reactiveFromFieldValues.additionalField.message : '',
      IFSC_Code: reactiveFromFieldValues.additionalField.IFSC_Code ? reactiveFromFieldValues.additionalField.IFSC_Code : '',
      virtualCode: reactiveFromFieldValues.additionalField.virtualCode ? reactiveFromFieldValues.additionalField.virtualCode : '',
      refundCode: reactiveFromFieldValues.additionalField.refundCode ? reactiveFromFieldValues.additionalField.refundCode : '',
      Account_no: reactiveFromFieldValues.additionalField.Account_no ? reactiveFromFieldValues.additionalField.Account_no : '',
      Acc_name: reactiveFromFieldValues.additionalField.Acc_name ? reactiveFromFieldValues.additionalField.Acc_name : '',
      Auth_level: reactiveFromFieldValues.additionalField.Auth_level ? reactiveFromFieldValues.additionalField.Auth_level : '',
      Urn: reactiveFromFieldValues.additionalField.Urn ? reactiveFromFieldValues.additionalField.Urn : '',
      Acc_env: reactiveFromFieldValues.additionalField.Acc_env ? reactiveFromFieldValues.additionalField.Acc_env : '',
      Acc_validation: reactiveFromFieldValues.additionalField.Acc_validation ? reactiveFromFieldValues.additionalField.Acc_validation : '',
      Acc_acceptance: reactiveFromFieldValues.additionalField.Acc_acceptance ? reactiveFromFieldValues.additionalField.Acc_acceptance : '',
      Rec_mail: reactiveFromFieldValues.additionalField.Rec_mail ? reactiveFromFieldValues.additionalField.Rec_mail : '',
      Acc_mode: reactiveFromFieldValues.additionalField.Acc_mode ? reactiveFromFieldValues.additionalField.Acc_mode : '',
      Acc_trans: reactiveFromFieldValues.additionalField.Acc_trans ? reactiveFromFieldValues.additionalField.Acc_trans : '',
      Acc_amount: reactiveFromFieldValues.additionalField.Acc_amount ? reactiveFromFieldValues.additionalField.Acc_amount : '',
      Acc_headers: reactiveFromFieldValues.additionalField.headers ? reactiveFromFieldValues.additionalField.header : '',
      Acc_uatTestingID: reactiveFromFieldValues.additionalField.uatTestingID ? reactiveFromFieldValues.additionalField.uatTestingID : '',
      file1: reactiveFromFieldValues.whitelistIpSection.file1
    };
    console.log(inputFields);
    //console.log(reactiveFromFieldValues.value.Ip);

    const formData = new FormData();
    formData.append("userName", inputFields["userName"]);
    formData.append("domainName", inputFields["domainName"]);
    formData.append("domainApis", inputFields["domainApis"]);
    formData.append("mName", inputFields["mName"]);
    formData.append("desc", inputFields["desc"]);
    formData.append("spocEmail", inputFields["spocEmail"]);
    formData.append("spocPhone", inputFields["spocPhone"]);
    formData.append("relManager", inputFields["relManager"]);
    formData.append("env", inputFields["env"]);
    formData.append("ips", inputFields["ips"]);
    formData.append("callbackUrl", inputFields["callbackUrl"]);
    formData.append("AccountNo", inputFields["AccountNo"]);
    formData.append("ClientCode", inputFields["ClientCode"]);
    formData.append("url", inputFields["url"]);
    formData.append("Ip", inputFields["Ip"]);
    formData.append("Port", inputFields["Port"]);
    formData.append("Checksum", inputFields["Checksum"]);
    formData.append("Encryption", inputFields["Encryption"]);
    formData.append("Certificate", inputFields["Certificate"]);
    formData.append("web", inputFields["web"]);
    formData.append("message", inputFields["message"]);
    formData.append("IFSC_Code", inputFields["IFSC_Code"]);
    formData.append("virtualCode", inputFields["virtualCode"]);
    formData.append("refundCode", inputFields["refundCode"]);
    formData.append("Account_no", inputFields["Account_no"]);
    formData.append("Acc_name", inputFields["Acc_name"]);
    formData.append("Auth_level", inputFields["Auth_level"]);
    formData.append("Urn", inputFields["Urn"]);
    formData.append("Acc_env", inputFields["Acc_env"]);
    formData.append("Acc_validation", inputFields["Acc_validation"]);
    formData.append("Acc_acceptance", inputFields["Acc_acceptance"]);
    formData.append("Rec_mail", inputFields["Rec_mail"]);
    formData.append("Acc_mode", inputFields["Acc_mode"]);
    formData.append("Acc_trans", inputFields["Acc_trans"]);
    formData.append("Acc_amount", inputFields["Acc_amount"]);
    formData.append("Acc_headers", inputFields["Acc_headers"]);
    formData.append("Acc_uatTestingID", inputFields["Acc_uatTestingID"]);


    console.log(formData);

    let a: any = (<HTMLInputElement>document.getElementById("file1")).files;
    console.log("a", a);
    for (let k = 0; k < a.length; k++) {
      formData.append("file1", a[k]);
      console.log(a[k], "oooooooooo")
      console.log(formData)
    }
    // Appended three new elements

    formData.append("refJIRAID", inputFields["Acc_refJIRAID"]);
    formData.append("Headers", inputFields["Acc_headers"]);
    formData.append("TestingID", inputFields["Acc_uatTestingID"]);
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
        //this.toastrmsg('success', res.jiraId + " has been created");
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
              this.router.navigate(['error']);
            },
          );
        }
      },
      err => {
        console.log('err', err);
        this.router.navigate(['error']);
      },
    );


  }
  //conditional validation
  ifFieldisVisible(value) {
    let reactiveFromFieldValues = this.reactiveForm.value;
    console.log(value);
    console.log(reactiveFromFieldValues.additionalField.ip);
    console.log(this.reactiveForm)
    console.log(this.reactiveForm.controls.additionalField)
    let c = this.reactiveForm.controls.additionalField;

    console.log(reactiveFromFieldValues.additionalField.ip)
    let ip = reactiveFromFieldValues.additionalField.ip;
    console.log(ip);

    if (value == "IP") {
      console.log(this.reactiveForm.get('additionalField'));
      console.log(this.reactiveForm.get('additionalField').get('ip'));
      let ipControl = this.reactiveForm.get('additionalField').get('ip');
      // ipControl.setValidators([this.ipValidator]);
      console.log(this.reactiveForm.get('additionalField'));
      this.reactiveForm.get('additionalField').get('ip')
      //reactiveFromFieldValues.additionalField.controls("IP").setValidators(null,[Validators.required, Validators.pattern('((25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)(,\n|,?$))')])
      // reactiveFromFieldValues.additionalField.addControl('ic', new FormControl(null,[Validators.required, Validators.pattern('((25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)(,\n|,?$))')]));
      console.log(reactiveFromFieldValues.additionalField);
    }
    console.log(value + "", 1);

  }
  //   validateIp(ip) {
  //     if ( ip == null || ip === '' ) {
  //       return true;
  //     }

  //     const parts = ip.split('.');
  //     if(parts.length !== 4) {
  //       return true;
  //     }

  //     for(let i = 0; i < parts.length; i++) {
  //       const part = parseInt(parts[i]);
  //       if(part < 0 || part > 255) {
  //         return true;
  //       }
  //     }

  //     if(ip.endsWith('.')) {
  //       return true;
  //     }

  //     return false;
  //   }
  //   ipValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //       // =============================================
  //       // ================================================
  //       let input = control.value;
  //       console.log(input)
  //       console.log(input.length)


  //       if(input.length>0){
  //         let arr = input.split(',');
  //         console.log(this.validateIp(input))

  //         console.log(this.validateIp)
  //         let wrongIps = arr.filter(this.validateIp(input));


  //       if(wrongIps.length>0){
  //         console.log(wrongIps);
  //         return{valid: false}
  //       }
  //       else{
  //         console.log(wrongIps);
  //         return{valid: true}
  //       }
  //       console.log(arr)
  //       console.log(arr)
  //       console.log(wrongIps)
  //     }
  //     else{

  //     }

  //       // ///////////////////////////////////////////////
  //       // ///////////////////////////////////////////////
  // }



  resetForm(edit) {
    this.reactiveForm = new FormGroup({

      'basicDetailsSection': new FormGroup({
        "merchantName": new FormControl(edit ? edit.merchantName : null, Validators.required),
        "description": new FormControl(edit ? edit.description : null, Validators.required),
        "email_id": new FormControl(edit ? edit.email_id : null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
        "contact_no": new FormControl(edit ? edit.contact_no : null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
        "r_m_maild_id": new FormControl(edit ? edit.r_m_maild_id : null, [Validators.required]),
      }),
      "nestedCheckboxesList": new FormGroup({
        "nestedList": new FormArray([])
      }),
      "additionalField": new FormGroup({
        "AccountNo": new FormControl(),
        "clientCode": new FormControl(),
        "url": new FormControl(),
        "Checksum": new FormControl(),
        "encryption": new FormControl(),
        "certificate": new FormControl(),
        "service": new FormControl(),
        "commModel": new FormControl(),
        "header": new FormControl(),
        "TestingID": new FormControl(),
        "IFSC_Code": new FormControl(),
        "virtualCode": new FormControl(),
        "ips": new FormControl(),
        "interAccNo": new FormControl(),
        "accName": new FormControl(),
        "authLevel": new FormControl(),
        "URN": new FormControl(),
        "env": new FormControl(),
        "Acc_validation": new FormControl(),
        "Acc_acceptance": new FormControl(),
        "Rec_mail": new FormControl(),
        "Acc_mode": new FormControl(),
        "Acc_trans": new FormControl(),
        "Acc_amount": new FormControl(),
        "ip":  new FormArray([ 
          // <FormArray>this.reactiveForm.get('whitelistIpSection').get('ipRows'),Validators.required
          new FormControl(null, [Validators.required,Validators.pattern('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')]),
        ]),
        "port": new FormControl(),
        "refJIRAID": new FormControl()
      }),
      'whitelistIpSection': new FormGroup({
     
        "file1": new FormControl(null, [Validators.required]),
        "checkBox": new FormControl(false, [Validators.requiredTrue])
      })
    })

  }
  ngOnInit() {
    this.logged_in = this.adm.check_log();

    console.log(this.dashboardService.getMenuTreeData())
    this.dashboardService.getMenuTreeData().subscribe((data: any) => {
      this.responseData = JSON.parse(data._body);
      console.log(this.responseData)
      this.menuArray = this.getMenuData(this.responseData);
      console.log(this.menuArray, "hhhhhhhhh  ")
    }
    );
    // ipvalidation
    // function validateIp(ip) {
    //   if ( ip == null || ip === '' ) {
    //   return true;
    // }

    // const parts = ip.split('.');
    // if(parts.length !== 4) {
    //   return true;
    // }

    // for(let i = 0; i < parts.length; i++) {
    //   const part = parseInt(parts[i]);
    //   if(part < 0 || part > 255) {
    //       return true;
    //   }
    // }

    // if(ip.endsWith('.')) {
    //   return true;
    // }

    // return false;
    // }

    // const input = '1.1.1.1,2.2.2.2,3.3.3.,4.4.4.256';
    // const arr = input.split(',');
    // const wrongIps = arr.filter(validateIp);


    // console.log(arr)
    // console.log(wrongIps)
    // ========


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
    $('body').on('click', 'span.dynamic', function () {
      var currentId = $(this).attr("id");
      $("#" + currentId).parent().parent().parent().parent().parent().remove();
      $("#countexceeder").remove();
    });



    //$(document).on('click', '.first-level li', function (e) {
    $(document).off().on('click', '.first-level li', function (e) {

     // $(".first-level li").unbind().click(function() {
      //  
      // alert(JSON.stringify($(this).parent().attr('class')))
      // $(this).children(".dropdownIcon").toggle();
      $(this).children(".display-none").toggle();
      e.stopPropagation();
      // $('.first-level li a').click(function(){
      // $(this).children('ul').stop().slideToggle(350);
      // $(this).toggleClass("open");
      // event.stopPropagation();
    });



    // ============================    

    // this.reactiveForm = this.formbuilder.group({
    //   ipRows: this.formbuilder.array([
    //       this.initipRows(),
    //   ])
    // });
    // ==============================
  }

  toastrmsg(type, title) {
    var toast: Toast = {
      type: type,
      title: title,
      showCloseButton: true
    };
    this.toasterService.pop(toast);
  }


  togglefrstList() {
    this.showMe = !this.showMe;
  }
  ngAfterViewInit() {
    console.log(this.BasicDetailsList, "2", this.RequestedApiList, "3", this.businessBankingList, "4", this.whitelistIpList,
      this.checkboxes)
    console.log(this.reactiveForm);
  }
  // ngAfterViewChecked() { }


}
