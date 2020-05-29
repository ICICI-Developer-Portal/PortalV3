import { Component, OnInit, TemplateRef,ViewChild, ElementRef, EventEmitter,Output,Input  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DashboardService } from 'src/app/services/dashboard.service';
import { VariablesService } from 'src/app/services/Variables.service';
import { LoginService } from 'src/app/services';


import { ToasterService, Toast } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormControl,Validators ,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var showProdTabEnv: any; // just change here from arun answer.
declare var openProdCurrentTabEnv: any;
import { formatDate } from '@angular/common';
import { CONSTANTS } from 'config/application-constant';
import { PATTERNS } from 'config/regex-pattern';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-uatonboarding-dashboard-page',
  templateUrl: './uatonboarding-dashboard-page.component.html',
  styleUrls: ['./uatonboarding-dashboard-page.component.css']
})
export class UATonboardingDashboardPageComponent implements OnInit {

  reactiveForm : FormGroup;
  submitted = false;
  

  responseData: any;
  menuArray: any[];
  showMore = 'show More'
  hidden: boolean;
  css:boolean;
  toggle(){
  this.hidden = !this.hidden;
  this.css = !this.css;
   }
  parentDataDomainName:string;
  childData:string;
  @ViewChild('BasicDetailsList') BasicDetailsList: ElementRef;
  @ViewChild('RequestedApiList') RequestedApiList: ElementRef;
  @ViewChild('businessBankingList') businessBankingList: ElementRef;
  @ViewChild('whitelistIpList') whitelistIpList: ElementRef;
  
 
  parentMethod(data){
    console.log(data,"yessss");console.log("agn",data,"yess", "#"+data);
    this.childData=data;
    console.log("document.querySelector",document.querySelector);
    if(data=="BasicDetailsList"){
      console.log(this);  
    //  document.querySelector( data).scrollIntoView({behavior:"smooth"});
      //this.scrollIntoView({behavior:"smooth"});
     // this.scrollToTop(this.BasicDetailsList)
      this.BasicDetailsList.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
     // this.BasicDetailsList.nativeElement.scrollTo(0);
    }
    else if(data=="RequestedApiList"){
   //   data.scrollIntoView({behavior:"smooth"});
   this.RequestedApiList.nativeElement.scrollIntoView({behavior:"smooth"});
    }
    else if(data=="businessBankingList"){
     // data.scrollIntoView({behavior:"smooth"});
      this.businessBankingList.nativeElement.scrollIntoView({behavior:"smooth"});
    }
    else if(data=="whitelistIpList"){
      this.whitelistIpList.nativeElement.scrollIntoView({behavior:"smooth"});
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
  merchantName = new FormControl('');

  modalRef: BsModalRef;
  constructor(  private HttpClient: HttpClient,
                private formbuilder: FormBuilder,
                private objOnBoarding: VariablesService,
                private spinnerService: Ng4LoadingSpinnerService,
                private modalService: BsModalService,
                private router: Router,
                private adm: LoginService,
                private toasterService: ToasterService,
                private dashboardService: DashboardService, ) { 
 
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
selectChangeHandler (event: any) {
  //update the ui
  this.parentDataDomainName = event.target.value;
  console.log(this.parentDataDomainName)

}
onSubmit(){
console.log( this.reactiveForm)
}
  ngOnInit() {
    console.log( this.dashboardService.getMenuTreeData())
    this.dashboardService.getMenuTreeData().subscribe((data: any) => {
      this.responseData = JSON.parse(data._body);
      console.log( this.responseData)
      this.menuArray = this.getMenuData(this.responseData);
      console.log(  this.menuArray, "hhhhhhhhh  " )
    });
// testing......
    this.reactiveForm =new FormGroup({
      'basicDetailsSection' : new FormGroup({
      "merchantName": new FormControl(null, Validators.required),
      "description":new FormControl(null, Validators.required),       
      "email_id":new FormControl(null,[Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      "contact_no":new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
      "r_m_maild_id":new FormControl(null,[Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    })
    })
  }
  ngAfterViewInit(){
    console.log(this.BasicDetailsList,"2",this.RequestedApiList,"3",this.businessBankingList,"4",this.whitelistIpList)
  }
  // ngAfterViewChecked() { }


}
 