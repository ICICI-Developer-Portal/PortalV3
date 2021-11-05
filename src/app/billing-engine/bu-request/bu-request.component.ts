import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillingEngineService } from 'src/app/services/billing-engine.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-bu-request',
  templateUrl: './bu-request.component.html',
  styleUrls: ['./bu-request.component.css']
})

export class BuRequestComponent implements OnInit {
  appList:any = [];
  appDetail:any=[];
  getRatePlan:any=[];
  modalRef: BsModalRef;
  name;
  status;
  createdby;


  constructor(    private router: Router,
    private route: ActivatedRoute,
    private fetchData: BillingEngineService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService) { }
  // getBEngineUserRequests
  ngOnInit() {
    
    let json= {
      bUserId  : localStorage.getItem("username")
    }
    console.log(json)
    this.fetchData.getBEngineUserRequests(json).subscribe((data: any) => {
       this.appList= JSON.parse( data._body);
      console.log(  this.appList)
      this.spinnerService.hide();
       },
       err => {
         this.spinnerService.hide();
         console.log('err', err);
         
       });
  }
  
  openModal(viewDetail: TemplateRef<any>,id) {
    console.log(id);
    this.appDetail =  this.appList[id];
    this.modalRef= this.modalService.show(viewDetail, { backdrop: "static",class: 'modal-lg'});
    
    
  }
}
/* "reqId": "BE-10004",
        "appId": "107",
        "appName": "EasyPay",
        "status": "approved",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 6, 2021 1:37:42 PM",
        "merchantName": "s",
        "productName": "ss",
        "bucketValuesJson": "{}",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no" */
