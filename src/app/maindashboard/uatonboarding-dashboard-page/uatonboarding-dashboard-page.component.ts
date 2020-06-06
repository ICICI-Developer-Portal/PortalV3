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
  nestedCheckboxesList: boolean = false;
  confirmMsg: any;





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

  onClickContinueBtn() {
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
      this.additionalParams = obj.ADDITIONAL_DETAILS.split(",");
      for (var i = 0; i < this.additionalParams.length; i++) {
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
      }
      console.log("final", this.additionalParams);
    },
      err => {
        console.log('err', err);
        this.router.navigate(['error']);
      });

  }
  onCheckChange(event) {
    if ($(".customcsscontainer input:checkbox:checked").length > 0) {
      $('.ContinueBtn').prop('disabled', false);
      console.log(this.reactiveForm);

    }
    else {
      $('.ContinueBtn').prop('disabled', true);
      console.log(this.reactiveForm);
    }
    const formArray: FormArray = this.reactiveForm.get(this.responseData) as FormArray;

    /* Selected */
    if (event.target.checked) {

      console.log(event.target.value, "==========", event.target.id)
      // Add a new control in the arrayForm
      this.arrayObjectOfListIds.push((event.target.id));

      this.arrayObjectOfValue.push((event.target.value));
      console.log(this.arrayObjectOfListIds)
      console.log(this.arrayObjectOfValue)
      // console.log(new FormControl(event.target.id))

      //    this.arrayObjectOfListIds = this.internalArr.toString();
      // console.log(this.idArr);
      // this.internalArr = [];
      // console.log("id array", this.idArr);
      // formArray.push(new FormControl(event.target.id));
      var json = {
        ID: this.arrayObjectOfListIds.join(),
      };


    }
    /* unselected */
    else {

      console.log(event)
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {

          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });

    }
  }

  // ================================================================
  @ViewChild('BasicDetailsList') BasicDetailsList: ElementRef;
  @ViewChild('RequestedApiList') RequestedApiList: ElementRef;
  @ViewChild('businessBankingList') businessBankingList: ElementRef;
  @ViewChild('whitelistIpList') whitelistIpList: ElementRef;
  //@ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  @ViewChild('checkboxes') checkboxes: ElementRef;
  onClickOfCheckboxes() {
    alert(this.checkboxes.nativeElement.checked ? "it's checked" : "it's not checked")
  }
  checkValue(e) {
    //  this.checkboxes.forEach((element) => {
    console.log(JSON.stringify(this.checkboxes) + "hiii reached" + JSON.stringify(e));
    // alert(this.checkboxes.nativeElement)
    //  event.nativeElement.checked = false;
    //  });
    console.log(JSON.stringify(this.checkboxes.nativeElement))

    console.log(this.checkboxes.nativeElement.checked ? "it's checked" : "it's not checked")
  }

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
    private dashboardService: DashboardService, ) {
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
  onSubmitUATForm() {
    // alert("hiii")
    let reactiveFromFieldValues = this.reactiveForm.value;
    console.log(reactiveFromFieldValues)
    console.log(localStorage.getItem("username"))
    let inputFields = {
      userName: localStorage.getItem("username"),
      domainName: localStorage.getItem("nodeValue"),
      domainApis: this.apiArr + '(' + this.idArr + ')',
      mName: reactiveFromFieldValues.merchantName,
      desc: reactiveFromFieldValues.description,
      spocEmail: reactiveFromFieldValues.email_id,
      spocPhone: reactiveFromFieldValues.contact_no,
      relManager: reactiveFromFieldValues.r_m_maild_id,
      env: "UAT",
      // ips: "",
      // callbackUrl: "",
      AccountNo: reactiveFromFieldValues.AccountNo ? reactiveFromFieldValues.AccountNo : '',
      ClientCode: reactiveFromFieldValues.ClientCode ? reactiveFromFieldValues.ClientCode : '',
      url: reactiveFromFieldValues.url ? reactiveFromFieldValues.url : '',
      Ip: reactiveFromFieldValues.Ip ? reactiveFromFieldValues.Ip : '',
      Port: reactiveFromFieldValues.Port ? reactiveFromFieldValues.Port : '',
      Checksum: reactiveFromFieldValues.Checksum ? reactiveFromFieldValues.Checksum : '',
      Encryption: reactiveFromFieldValues.Encryption ? reactiveFromFieldValues.Encryption : '',
      Certificate: reactiveFromFieldValues.Certificate ? reactiveFromFieldValues.Certificate : '',
      web: reactiveFromFieldValues.web ? reactiveFromFieldValues.web : '',
      message: reactiveFromFieldValues.message ? reactiveFromFieldValues.message : '',
      IFSC_Code: reactiveFromFieldValues.IFSC_Code ? reactiveFromFieldValues.IFSC_Code : '',
      virtualCode: reactiveFromFieldValues.virtualCode ? reactiveFromFieldValues.virtualCode : '',
      refundCode: reactiveFromFieldValues.refundCode ? reactiveFromFieldValues.refundCode : '',
      Account_no: reactiveFromFieldValues.Account_no ? reactiveFromFieldValues.Account_no : '',
      Acc_name: reactiveFromFieldValues.Acc_name ? reactiveFromFieldValues.Acc_name : '',
      Auth_level: reactiveFromFieldValues.Auth_level ? reactiveFromFieldValues.Auth_level : '',
      Urn: reactiveFromFieldValues.Urn ? reactiveFromFieldValues.Urn : '',
      Acc_env: reactiveFromFieldValues.Acc_env ? reactiveFromFieldValues.Acc_env : '',
      Acc_validation: reactiveFromFieldValues.Acc_validation ? reactiveFromFieldValues.Acc_validation : '',
      Acc_acceptance: reactiveFromFieldValues.Acc_acceptance ? reactiveFromFieldValues.Acc_acceptance : '',
      Rec_mail: reactiveFromFieldValues.Rec_mail ? reactiveFromFieldValues.Rec_mail : '',
      Acc_mode: reactiveFromFieldValues.Acc_mode ? reactiveFromFieldValues.Acc_mode : '',
      Acc_trans: reactiveFromFieldValues.Acc_trans ? reactiveFromFieldValues.Acc_trans : '',
      Acc_amount: reactiveFromFieldValues.Acc_amount ? reactiveFromFieldValues.Acc_amount : '',
      file1: reactiveFromFieldValues.file1
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

    console.log(formData);

    let a: any = (<HTMLInputElement>document.getElementById("file1")).files;
    console.log("a", a);
    for (let k = 0; k < a.length; k++) {
      formData.append("file1", a[k]);
      console.log(a[k], "oooooooooo")
      console.log(formData)
    }
    
  
   
    //Jira Service
    this.HttpClient.post<any>(
      "https://developerapi.icicibank.com:8443/api/v2/jira",
      formData
    ).subscribe(
      res => {
        console.log(res, formData);
       // alert(res.jiraId)
        this.toastrmsg('success', res.jiraId+" has been created");
        if (res.success === "true") {
          //File upload service
          var formData = new FormData();
          let b: any = (<HTMLInputElement>document.getElementById("file1"))
            .files;
          for (let k = 0; k < b.length; k++) {
            formData.append(res.jiraId, b[k]);
          }
          this.HttpClient.post<any>(
            "https://developer.icicibank.com/fileUpload",
            formData
          ).subscribe(
            res => {
              console.log(res);
              // alert(res.jiraId);
            },
            err => {
              console.log('err', err);
              this.router.navigate(['error']);
            },
          );
        }

     //   console.log(res["message"]);
        //console.log(res["message"].substring(51, 44));
       
        // this.modalRef = this.modalService.show( {
        //   backdrop: "static"
        // });
        // this.confirmMsg = res["message"];
        // this.confirmMsg = this.confirmMsg;
        // this.confirmMsg = this.confirmMsg.substring(51, 44);
        //this.modalRef4.hide();
      },
      err => {
        console.log('err', err);
        this.router.navigate(['error']);
      },
    );


  }

  //  
  // 
  // uat form inputbox
  // 
  // 
  resetForm(edit) {
    this.reactiveForm = new FormGroup({
      'basicDetailsSection': new FormGroup({
        "merchantName": new FormControl(edit ? edit.merchantName : null, Validators.required),
        "description": new FormControl(edit ? edit.description : null, Validators.required),
        "email_id": new FormControl(edit ? edit.email_id : null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
        "contact_no": new FormControl(edit ? edit.contact_no : null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
        "r_m_maild_id": new FormControl(edit ? edit.r_m_maild_id : null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      }),
      "nestedCheckboxesList": new FormGroup({
        "nestedList": new FormArray([])
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



    // testing......
    let edit = ''
    this.resetForm(edit);
    $(document).on('click', 'li.expandable', function (e) {
      $(this).children('ul').toggle();
      // $('li.expandable').click(function() {
      //  alert("hii")
      //  
      e.preventDefault();

      return false;
      //  if($(this).children('ul').is(":visible")){
      //   //alert("1")
      //   $(this).children('ul').css({"display":"none"}) 
      //   }
      //   else{ // alert("12")
      //     $(this).children('ul').css({"display":"block"}) 
      //   }
    });
    $(document).on('click', '#checkbox', function (e) {
      var valid;
      if (!$("#checkbox").is(":checked")) {
        //alert("none checked");
        $("#checkbox-error").show({ "display": "block" });

      }
      else {
        $("#checkbox-error").hide();
        return valid;
      }

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
  }
  // ngAfterViewChecked() { }


}
