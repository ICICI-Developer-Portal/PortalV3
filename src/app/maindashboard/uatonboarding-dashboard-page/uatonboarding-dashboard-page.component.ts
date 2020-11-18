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
import {  catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import {
  
  HttpEventType,
  HttpErrorResponse
} from "@angular/common/http";
declare var $: any;


@Component({
  selector: 'app-uatonboarding-dashboard-page',
  templateUrl: './uatonboarding-dashboard-page.component.html',
  styleUrls: ['./uatonboarding-dashboard-page.component.css']
})
export class UATonboardingDashboardPageComponent implements OnInit {
  modalRef: BsModalRef;
  reactiveForm: FormGroup;
  responseData: [];
  menuArray: any[];
  arrayObjectOfListIds = [];
  arrayObjectOfDomain= [];
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
  selectedAPINAME = [];
  progress: number;

term:any;
errorMsg:any = "Something went wrong. Please try again in some time.";
  /** Add var for search field */
  myControl = new FormControl();
  APIAutocompletDataSource:any[] = [];
  filteredOptions: Observable<string[]>;
  searchedItem:any;
  searchedFieldValue:any;
  companyName:any;
  email:any;
  mobileNo:any;
  rm:any;
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
    private elementRef: ElementRef) {
    this.adm.getUserId().subscribe(data => {
      this.logged_in =
        data != "" && data != null && data != undefined ? true : false;
    });

  }
  ngOnInit() {
   

    console.log( localStorage.getItem("companyName"))
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
    $("#searchFilter").keyup(function () {
      var text = $("#searchFilter").val().toLowerCase();
      var items = $(".customcsscontainer label");
    
      if ($.trim($("#searchFilter").val()) == '') {
         console.log(items.length)
        $("").css("display","");
         // $(".first-level li,.first-level a,.first-level p,.customcsscontainer,.customcsscontainer input").show();
          $(".first-level p,.customcsscontainer input,.customcsscontainer label").show();
          $(".second-level,.third-level,.fourth-level,.fifth-level").css('display','none')
          $(".second-level,third-level,.fourth-level,.fifth-level").hide();
         

      } else {
        items.each(function() {
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
  additionalFieldComingFromServer(addtionalParams){

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
    console.log("rchd inside cninue btn")

    if ($(".customcsscontainer input:checkbox:checked").length > 0) { $("#thrdSectionChld").removeClass("overlay_parent"); $("#submitButton,#file1").removeClass("blockElements"); }
    else { $("#thrdSectionChld").addClass("overlay_parent");    }
    //this.modalRef.hide();
    this.arrayObjectOfListIds = $(".customcsscontainer input:checkbox:checked").map(function () {
      return this.id
    }).get()
    this.arrayObjectOfDomain = $(".customcsscontainer input:checkbox:checked").map(function () {
      return this.getAttribute("domainName")
    }).get()
  
    console.log(this.arrayObjectOfDomain.join())

    console.log(this.arrayObjectOfListIds.join())
    const formArray: FormArray = this.reactiveForm.get(this.responseData) as FormArray;
    var json = {
      ID: this.arrayObjectOfListIds.join(),
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

     this.additionalFieldComingFromServer( this.additionalParams)
      console.log("final", this.additionalParams);
    },
      err => {
        console.log('err', err);
      //  this.router.navigate(['error']);
      this.toastrmsg('error',this.errorMsg);
      });
  
  }


  // ================================================================
  @ViewChild('BasicDetailsList') BasicDetailsList: ElementRef;
  @ViewChild('RequestedApiList') RequestedApiList: ElementRef;
  @ViewChild('businessBankingList') businessBankingList: ElementRef;
  @ViewChild('whitelistIpList') whitelistIpList: ElementRef;
  @ViewChild('checkboxes') checkboxes: ElementRef;
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
  forResetiingAdditionalFields(){
    this.accNo    = false; this.clientCode = false; this.url         = false; this.ip         = false; this.port     = false;
    this.checksum = false; this.encryption = false; this.certificate = false; this.service    = false; this.message  = false;
    this.ifsc     = false; this.virtualCode= false; this.ips         = false; this.interAccNo = false; this.accName  = false; 
    this.authLevel= false; this.urn        = false; this.env         = false; this.valid      = false; this.accept   = false; 
    this.recipient = false;this.mode       = false; this.trans       = false; this.amount     = false; this.headers   = false; 
    this.uatTestingID= false;
    this.resetField();
  }
  multipleSelectAPI(e, isChecked: boolean){
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
        if(isChecked) {
          this.selectedValue.push({
          "childName": e.target.getAttribute('value'),
          "parentName" :e.target.getAttribute('parentName'),
          "grandParentName":e.target.getAttribute('grandParentName'),
          "greatGrandParentName": e.target.getAttribute('greatGrandParentName'),
          "greatGreatGrandParentName": e.target.getAttribute('greatGreatGrandParentName'),
          "id": e.target.getAttribute('id')
        });
        this.selectedAPINAME.push(
          e.target.getAttribute('value'));
          console.log(this.selectedAPINAME)
          console.log(this.selectedValue)

        } else {
  
          let index = this.selectedValue.indexOf(e);
          let index1= this.selectedAPINAME.indexOf(e);
          console.log(e.target);
          this.selectedValue.splice(index,1);
          this.selectedAPINAME.splice(index1,1);
          console.log(this.selectedValue,"this.selectedValue");                  
        }
          
}
deleteRemoveObjectFromCart(e){
  this.forResetiingAdditionalFields(); 
console.log(e.target);

console.log(this.selectedValue.length)
console.log(e.target.getAttribute("id"));
let deletedId=e.target.getAttribute("id");
$("input[id=" + e.target.getAttribute("id") + "]").prop("checked",false);
  this.selectedValue = this.selectedValue.filter(function( obj ) {
    console.log( obj.childName , e.target.getAttribute("class"))
    return obj.childName !== e.target.getAttribute("class");
    
});

console.log(this.selectedValue)
if(this.selectedValue.length>0){
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

   this.additionalFieldComingFromServer( this.additionalParams)
    console.log("final", this.additionalParams);
  },
    err => {
      console.log('err', err);
     // this.router.navigate(['error']);
     this.toastrmsg('error',this.errorMsg);
    });
}
else{
  $('.ContinueBtn').prop('disabled', true);
  $("#thrdSectionChld").addClass("overlay_parent");
  $("#dynamic-list-check").css("display", "none");
  $("#scndSectionWhitelistIp").addClass("ng-invalid");
  $("#scndSectionWhitelistIp").removeClass("ng-valid");   
  $("#submitButton,#file1").addClass("blockElements");
 
}
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
   
   let tempArr =this.arrayObjectOfDomain;
   const distinctArray = tempArr.filter((n, i) => tempArr.indexOf(n) === i);
    


    let inputFields = {
      userName: localStorage.getItem("username"),
      domainName: distinctArray.toString(),
      domainApis: this.arrayObjectOfValue  + this.arrayObjectOfListIds.toString() ,  //this.apiArr + '(' + this.idArr + ')',// this.selectedAPINAME.join(),  //this.apiArr + '(' + this.idArr + ')',
    
     // domainName: '(' +this.arrayObjectOfDomain.join()+ ')',
      //domainApis: this.arrayObjectOfValue + '(' + this.arrayObjectOfListIds.toString() + ')',  //this.apiArr + '(' + this.idArr + ')',
      domainApisName: this.selectedAPINAME.join(),  //this.apiArr + '(' + this.idArr + ')',
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
     // Encryption: reactiveFromFieldValues.whitelistIpSection.Encryption ? reactiveFromFieldValues.whitelistIpSection.Encryption : '',
     Encryption: reactiveFromFieldValues.whitelistIpSection.Encryption.value ? reactiveFromFieldValues.whitelistIpSection.Encryption.value : '',

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
      file1: reactiveFromFieldValues.whitelistIpSection.file1,
     
      
    };
    console.log(inputFields);
    //console.log(reactiveFromFieldValues.value.Ip);

    const formData = new FormData();
    formData.append("userName", inputFields["userName"]); //1
    formData.append("domainName", inputFields["domainName"]); //2
    formData.append("domainApis", inputFields["domainApis"]); //3
    formData.append("mName", inputFields["mName"]);  //4
    formData.append("desc", inputFields["desc"]); //5
    formData.append("spocEmail", inputFields["spocEmail"]); //6
    formData.append("spocPhone", inputFields["spocPhone"]); //7
    formData.append("relManager", inputFields["relManager"]); //8
    formData.append("env", inputFields["env"]); //9
    formData.append("AccountNo", inputFields["AccountNo"]); //10
    formData.append("ClientCode", inputFields["ClientCode"]); //11
    formData.append("url", inputFields["url"]); //12
    formData.append("Ip", inputFields["Ip"]);  //13
    formData.append("Port", inputFields["Port"]);  //14
    formData.append("Checksum", inputFields["Checksum"]);  //15
    formData.append("Encryption", inputFields["Encryption"]); //16
    formData.append("Certificate", inputFields["Certificate"]); //17
    formData.append("web", inputFields["web"]); //18
    formData.append("message", inputFields["message"]); //19
    formData.append("IFSC_Code", inputFields["IFSC_Code"]); //20
    formData.append("virtualCode", inputFields["virtualCode"]); //21
    formData.append("refundCode", inputFields["refundCode"]); //22
    formData.append("Account_no", inputFields["Account_no"]); //23
    formData.append("Acc_name", inputFields["Acc_name"]);//24
    formData.append("Auth_level", inputFields["Auth_level"]);//25
    formData.append("Urn", inputFields["Urn"]);//26
    formData.append("Acc_env", inputFields["Acc_env"]); //27
    formData.append("Acc_validation", inputFields["Acc_validation"]); //28
    formData.append("Acc_acceptance", inputFields["Acc_acceptance"]);//29
    formData.append("Rec_mail", inputFields["Rec_mail"]);//30
    formData.append("Acc_mode", inputFields["Acc_mode"]);//31
    formData.append("Acc_trans", inputFields["Acc_trans"]);//32
    formData.append("Acc_amount", inputFields["Acc_amount"]);//33
    // formData.append("Acc_headers", inputFields["Acc_headers"]);
    // formData.append("Acc_uatTestingID", inputFields["Acc_uatTestingID"]);





    // formData.append("refundCode", inputFields["refundCode"]);
    // formData.append("callbackUrl", inputFields["callbackUrl"]);
    // formData.append("AccountNo", inputFields["AccountNo"]);
    // formData.append("ClientCode", inputFields["ClientCode"]);
    // formData.append("url", inputFields["url"]);
    // formData.append("Ip", inputFields["Ip"]);
    // formData.append("Port", inputFields["Port"]);
    // formData.append("Checksum", inputFields["Checksum"]);
    // formData.append("Encryption", inputFields["Encryption"]);
    // formData.append("Certificate", inputFields["Certificate"]);
    // formData.append("web", inputFields["web"]);
    // formData.append("message", inputFields["message"]);
    // formData.append("IFSC_Code", inputFields["IFSC_Code"]);
    // formData.append("virtualCode", inputFields["virtualCode"]);
    // formData.append("refundCode", inputFields["refundCode"]);
    // formData.append("Account_no", inputFields["Account_no"]);
    // formData.append("Acc_name", inputFields["Acc_name"]);
    // formData.append("Auth_level", inputFields["Auth_level"]);
    // formData.append("Urn", inputFields["Urn"]);
    // formData.append("Acc_env", inputFields["Acc_env"]);
    // formData.append("Acc_validation", inputFields["Acc_validation"]);
    // formData.append("Acc_acceptance", inputFields["Acc_acceptance"]);
    // formData.append("Rec_mail", inputFields["Rec_mail"]);
    // formData.append("Acc_mode", inputFields["Acc_mode"]);
    // formData.append("Acc_trans", inputFields["Acc_trans"]);
    
    console.log(formData);
    let a: any = (<HTMLInputElement>document.getElementById("file1")).files;
    console.log("a", a);
    for (let k = 0; k < a.length; k++) {
      formData.append("file1", a[k]); //34
      console.log(a[k], "oooooooooo")
      console.log(formData)
    }
    // Appended three new elements
    // formData.append("Acc_amount", inputFields["Acc_amount"]);
    // formData.append("Acc_headers", inputFields["Acc_headers"]);
    // formData.append("Acc_uatTestingID", inputFields["Acc_uatTestingID"]);

    formData.append("refJIRAID", inputFields["Acc_refJIRAID"]);
    formData.append("Headers", inputFields["Acc_headers"]);
    formData.append("TestingID", inputFields["Acc_uatTestingID"]);
   /* formData.forEach((value, key) => {
      console.log(key + " " + value)
    });*/

    // Jira Service
    //https://developerapi.icicibank.com:8443/api/v2/jira-UAT
    //https://developerapi.icicibank.com:8443/api/v2/jira
    this.HttpClient.post<any>(
      "https://developer.icicibank.com/ROOT_UAT/rest/create-jira-new",
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
              this.toastrmsg('error',this.errorMsg);
            //  this.router.navigate(['error']);
            },
          );
        }
      },
      err => {
        console.log('err', err);
       // this.router.navigate(['error']);
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
        "email_id": new FormControl(edit ? edit.email_id : null, [Validators.required,Validators.email]),
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
 
  createCart(){
    console.log(this.reactiveForm.controls);

    console.log(this.matInput.nativeElement.value);
    console.log(this.matInput.nativeElement);

    console.log( this.cartApiContainer)

    this.cartApiContainer.nativeElement.insertAdjacentHTML('beforeend', '<label _ngcontent-c1="" style="padding-top: 10px; padding-left: 10px; padding-bottom: 5px; padding-right: 10px; border: 1px solid gainsboro; margin-bottom: 0px;"><span _ngcontent-c1="">Domain</span><span _ngcontent-c1="">&gt; Sub Domain</span><span _ngcontent-c1=""> &gt;&gt; '+this.matInput.nativeElement.value+'</span><span _ngcontent-c1="" class="pull-right deleteRemoveObject" style="cursor: pointer;" >✖</span></label>');
   
  }

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


}
