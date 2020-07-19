import { Component, OnInit, TemplateRef, ViewChild, ViewChildren, ElementRef, QueryList, EventEmitter, Output, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { interval as observableInterval,Observable } from "rxjs";
import { takeWhile, scan, tap,map, startWith } from "rxjs/operators";
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
import { NestedListFilterPipePipe } from 'src/app/maindashboard/nested-list-filter-pipe.pipe';

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
  confirmMsg: any;
  showTab = 1;
  apiGreenCheck: string = "invalid";
  confirmMsgProd: any;
  showError: string = "hidden";
  addFalse:boolean=true;
  selectedDay: string = '';
  paymentMode:any[] = [ "Cash","ICICI Cheque" ,"ICICI DD","Non-ICICI Cheque","Non-ICICI DD","Debit Authorization","Other"];
  yesNo:any[] = [ "Yes","No"];
  serviceTypeOption:any[] = [ "WADL","REST","SOAP","Other"];
  comTypeOption:any[] = [ "XML","XML as a string","JSON"];
  ifscCodeOption:any[] = [ "ICIC0000103","ICIC0000104","ICIC0000106"];
  environmentOption:any[] = [ "UAT","CUG","Production"];
  certificateOption:any[] = [ "Java Key Store","IIS SSL (Should be 4096 bits/Public certificate is also required)"];
  callbackURLInfo:any="The URL should start with https.\n We accept only '.cer' and '.txt' formats.\n For Isurepay we require two webservice URLs";
  isemail_check: boolean = false;
  isemail_reg_check: string = "";
  selectedValue = [];

  /** Add var for search field */
  myControl = new FormControl();
  APIAutocompletDataSource:any[] = [];
  filteredOptions: Observable<string[]>;
  searchedItem:any;
  searchedFieldValue:any;

  /** Add var for cart Item */
  cartArray:any[]=[{
    apiId:"1",
    apiName:"test api one",
    parentName:"Domain name>>Sub-domen name"
  },
  {
    apiId:"2",
    apiName:"test api two",
    parentName:"Domain name>>Sub-domen name"
  }];
  /** end here */
  constructor(private HttpClient: HttpClient,
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
      this.get_domain_and_apis();
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
    $('body').on('click','.deleteRemoveObject', function () {
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
  }
  /** Remove item from cart */
  removeFromCart(apiId){
    console.log(123);
    console.log(apiId);
  }
  
  selectChangeHandler (event: any) {
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
    if(control.length<=9){ 
     control.push(new FormControl(null, [Validators.required,Validators.pattern('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')]))
    }else{}   
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

    if(control.length<=9){ 
     control.push(new FormControl(null, [Validators.pattern(regURL)]));
    }else{}   
  }
  deleteURLRow(i: number) {
    console.log(i);
    const control = <FormArray>this.reactiveForm.get('whitelistIpSection').get('url');
    control.removeAt(i);

  }
  resetField(){
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
ifIPpatternNotmatches(){
  const control = <FormArray>this.reactiveForm.get('whitelistIpSection').get('ip').value;

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
          this.ifFieldisVisible(this.additionalParams[i]);
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
          this.message = true;
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

  // addIPs() {

  //   var count = $('.countIp').length;
  //   console.log(this.count)
  //   if (count <= 9) {
  //     console.log(count, "$$$$$$$$$$$$$")
  //     var addinput = $("<div class='form-group col-md-6 countIp'><div class='width_100prcnt'><label for='contract'>IP</label></div><div class='col-md-11'><div class='row'><div class='input-group '><input aria-describedby='basic-addon2' aria-label='IP' class='form-control ipValues' placeholder='Your IP' type='text'><div class='input-group-append'><span _ngcontent-c1 class='input-group-text add-ip-addon dynamic' id='basic-addon2" + count + "' (click)='removeInputField()'>-</span></div></div></div></div></div>");
  //     addinput.insertAfter("#addIPUnique");
  //     $("#countexceeder").remove();
  //     count++;

  //   }
  //   else {
  //     if ($("#countexceeder").length < 1) {
  //       $("<span style='color: #ae282e;'  id='countexceeder'>You can add maximum 10 IP</span>").insertAfter(".addErrorclasafter");

  //     }
  //   }

  //   //$("#addIPUnique").append("<div class='form-group col-md-6' *ngIf='ip'><div class='width_100prcnt'><label for='contract'>IP</label></div><input class='form-control col-md-11' placeholder='Your IP' formControlName='ip' type='text' />");
  // }

  // adding ip Field.......via $$$


  // ================================================================
  @ViewChild('BasicDetailsList') BasicDetailsList: ElementRef;
  @ViewChild('RequestedApiList') RequestedApiList: ElementRef;
  @ViewChild('businessBankingList') businessBankingList: ElementRef;
  @ViewChild('whitelistIpList') whitelistIpList: ElementRef;
  //@ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  @ViewChild('checkboxes') checkboxes: ElementRef;
  //@ViewChild('cartApiContainer') cartApiContainer: ElementRef;
 // @ViewChild('cartApiContainer') cartApiContainer: ElementRef;
  //@ViewChild('cartApiContainer') public cartApiContainer: ElementRef;
  @ViewChild('cartApiContainer', {read: ElementRef}) private cartApiContainer: ElementRef;
  @ViewChild('matInput', {read: ElementRef}) private matInput: ElementRef;




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
  // selectedDomainName: string = '';

  // //event handler for the select element's change event
  // selectChangeHandler(event: any) {
  //   //update the ui
  //   this.parentDataDomainName = event.target.value;
  //   console.log(this.parentDataDomainName)

  // }
  multipleSelectAPI(e, isChecked: boolean){
    this.accNo = false;
    this.clientCode = false;
    this.url = false;
    this.ip = false;
    this.port = false;
    this.checksum = false;
    this.encryption = false;
    this.certificate = false;
    this.service = false;
    this.message = false;
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
   
    //alert(e.checked)
    
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
    

        }

   

        if(isChecked) {
          this.selectedValue.push({
          "childName": e.target.getAttribute('value'),
          "parentName" :e.target.getAttribute('parentName'),
          "grandParentName":e.target.getAttribute('grandParentName'),
          "greatGrandParentName": e.target.getAttribute('greatGrandParentName'),
          "greatGreatGrandParentName": e.target.getAttribute('greatGreatGrandParentName'),
          "id": e.target.getAttribute('id')
        });
          console.log(this.selectedValue)

        } else {
  
          let index = this.selectedValue.indexOf(e);
          console.log(e.target);
          this.selectedValue.splice(index,1);
          console.log(this.selectedValue,"this.selectedValue");
  
               
        }
          
}
deleteRemoveObjectFromCart(e){
  alert("hii")
console.log(e.target);

console.log(this.selectedValue)
console.log(e.target.getAttribute("id"));
$("input[id=" + e.target.getAttribute("id") + "]").prop("checked",false);
  this.selectedValue = this.selectedValue.filter(function( obj ) {
    console.log( obj.childName , e.target.getAttribute("class"))
    return obj.childName !== e.target.getAttribute("class");
});
console.log(this.selectedValue)
}
findIndexToUpdate(type) { 
  return type.maintenancetype === this;
}
  onSubmitUATForm(Prodconfirm) {

    let ipValues = [];
    let urlValues= [];
    
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
      AccountNo: reactiveFromFieldValues.whitelistIpSection.AccountNo ? reactiveFromFieldValues.whitelistIpSection.AccountNo : '',
      ClientCode: reactiveFromFieldValues.whitelistIpSection.ClientCode ? reactiveFromFieldValues.whitelistIpSection.ClientCode : '',
      //url: reactiveFromFieldValues.whitelistIpSection.url ? reactiveFromFieldValues.whitelistIpSection.url : '',
      url:urlValues.toString() ? urlValues.toString() : '',
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
      Acc_uatTestingID: reactiveFromFieldValues.whitelistIpSection.TestingID ? reactiveFromFieldValues.whitelistIpSection.TestingID : '',
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
    formData.append("refundCode", inputFields["refundCode"]);
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
    if(value == "URL"){
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
        "merchantName": new FormControl(edit ? edit.merchantName : null, Validators.required),
        "description": new FormControl(edit ? edit.description : null, Validators.required),
        "email_id": new FormControl(edit ? edit.email_id : null, [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
        "contact_no": new FormControl(edit ? edit.contact_no : null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
        "r_m_maild_id": new FormControl(edit ? edit.r_m_maild_id : null, [Validators.required]),
      }),
      "nestedCheckboxesList": new FormGroup({
        "nestedList": new FormArray([]),
        "nestedCheckboxFilter": new FormControl(),
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
        "ip":  new FormArray([ 
          // <FormArray>this.reactiveForm.get('whitelistIpSection').get('ipRows'),Validators.required
          new FormControl(null, [Validators.required,Validators.pattern(ipReg)]),
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
     var d1 = this.cartApiContainer.nativeElement;
     console.log(d1)
    console.log(this.matInput.nativeElement.value);

      
     
    // d1.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
     
   // this.cartApiContainer.nativeElement.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
  }
  /**
   * Start search API 
   */
  
   // To get Domain List
   get_domain_and_apis() {
    this.adm.domain_and_apis().subscribe((data: any) => {
      var obj = JSON.parse(data._body);
      var domain = [];
      for (let i in obj) { 
        let sub_domain = obj[i].sub_domain;
        for (let j in sub_domain){
          if(sub_domain[j].api && sub_domain[j].api.length>0){
            domain= domain.concat(sub_domain[j].api);
          }
          
        }
      }
      this.APIAutocompletDataSource = domain;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
	  console.log("this.APIAutocompletDataSource" + JSON.stringify(this.APIAutocompletDataSource));
    },
    err => {
      console.log('err', err);
      //this.router.navigate(['error']);
    },);
  }
  private _filter(value: string): any[] {
    console.log(value);
    
  //  console.dir(value);

    // const convrtedstring=value.toString();
    // console.log(typeof convrtedstring);
    const filterValue = value.toLowerCase();
    // const filterValue1 = value.toString();
    // const filterValue2 = filterValue1.toLowerCase();

    console.dir(filterValue);

    //console.log( this.APIAutocompletDataSource.filter(option => option['name'].toLowerCase().includes(value)));
    // console.log(JSON.stringify(filterValue1));
    // console.log(filterValue2);
    

    // console.log(JSON.stringify(filterValue));


    return this.APIAutocompletDataSource.filter(option => option['name'].toLowerCase().includes(filterValue));
  }
  /*selectAPICheckbox(event:any){
    console.log(event);
  }*/
  createCart(){
    console.log(this.reactiveForm.controls);

    console.log(this.matInput.nativeElement.value);
    console.log(this.matInput.nativeElement);

    console.log( this.cartApiContainer)

    this.cartApiContainer.nativeElement.insertAdjacentHTML('beforeend', '<label _ngcontent-c1="" style="padding-top: 10px; padding-left: 10px; padding-bottom: 5px; padding-right: 10px; border: 1px solid gainsboro; margin-bottom: 0px;"><span _ngcontent-c1="">Domain</span><span _ngcontent-c1="">&gt; Sub Domain</span><span _ngcontent-c1=""> &gt;&gt; '+this.matInput.nativeElement.value+'</span><span _ngcontent-c1="" class="pull-right deleteRemoveObject" style="cursor: pointer;" >✖</span></label>');
   
  }
//   removeObject(i) {
//   //  let elementList = this.elRef.nativeElement.querySelectorAll('button');
//     alert(i);
//     console.log(i.target);
//     i.target.parentNode.remove();
   
// }
  displayAPIName(api:any): string {
    if(api && api.ApiId){
        this.searchedItem = api.ApiId;
        
        console.log("You have selected API " +api.name + " Id="+this.searchedItem );
      //  this.cartApiContainer.nativeElement.insertAdjacentHTML('beforeend', '<div class="two">'+api.name +'</div><p> Id='+this.searchedItem+' </p');
console.log( this.cartApiContainer,event.target)
this.searchedFieldValue=api.name ;
console.log(this.searchedFieldValue);

    }
    return api && api.name ? api.name : '';
  }

}
