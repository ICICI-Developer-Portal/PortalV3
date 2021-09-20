import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillingEngineService } from 'src/app/services/billing-engine.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buh-app-dashboard',
  templateUrl: './buh-app-dashboard.component.html',
  styleUrls: ['./buh-app-dashboard.component.css']
})
export class BuhAppDashboardComponent implements OnInit {
  appList:any = [];
  appDetail:any=[];
  getRatePlan:any=[];

  name;
  status;
  createdby;
 

  beuh=[
    {
        "reqId": "BE-10004",
        "appId": "102",
        "appName": "EasyPay",
        "status": "pending",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 6, 2021 1:36:51 PM",
        "merchantName": "sss",
        "productName": "ss",
        "bucketValuesJson": "{}",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
        "appId": "104",
        "appName": "EasyPay",
        "status": "pending",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 6, 2021 1:37:02 PM",
        "merchantName": "ss",
        "productName": "ss",
        "bucketValuesJson": "{}",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
        "appId": "105",
        "appName": "EasyPay",
        "status": "pending",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 6, 2021 1:37:08 PM",
        "merchantName": "s",
        "productName": "ss",
        "bucketValuesJson": "{}",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
        "appId": "110",
        "appName": "EasyPayfdfd",
        "status": "pending",
        "developerId": "sample@sample.com",
        "captureDt": "Sep 17, 2021 8:21:43 PM",
        "merchantName": "gsvcvv",
        "productName": "sgcvvc",
        "bucketValuesJson": "sg",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
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
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
        "appId": "108",
        "appName": "EasyPay",
        "status": "pending",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 10, 2021 4:01:01 PM",
        "merchantName": "ss",
        "productName": "ss",
        "bucketValuesJson": "{}",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
        "appId": "109",
        "appName": "EasyPay",
        "status": "pending",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 10, 2021 4:21:07 PM",
        "merchantName": "gsvcvv",
        "productName": "sgcvvc",
        "bucketValuesJson": "sg",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
        "appId": "106",
        "appName": "EasyPay",
        "status": "approved",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 6, 2021 1:37:25 PM",
        "merchantName": "ss",
        "productName": "ss",
        "bucketValuesJson": "{}",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    }
]



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fetchData: BillingEngineService,
    private spinnerService: Ng4LoadingSpinnerService,
    ) { 

    }

  ngOnInit() {
   
      //  let json= {
      //   appId : localStorage.getItem("username")
      // }
      // this.fetchData.getBEngineHeadRequests(json).subscribe((data: any) => {
      //   let res= JSON.parse( data._body);
      //   console.log( res)
      //   this.spinnerService.hide();
      //    },
      //    err => {
      //      this.spinnerService.hide();
      //      console.log('err', err);
           
      //    });
  }


  getRatePlanApprovalPending(){
    this.spinnerService.show();
    this.fetchData.getRatePlanPending().subscribe((data: any) => {
        this.getRatePlan = JSON.parse( data._body);
        console.log( this.getRatePlan)
        this.spinnerService.hide();
         },
         err => {
           this.spinnerService.hide();
           console.log('err', err);
           
         });
  }

  getRatePlanPage(appId,i){

    this.fetchData.setAppData(this.getRatePlan[i]);
    this.router.navigate(["approveRatePlan/" + appId]);
  }

  getBEngineHeadRequests
}

