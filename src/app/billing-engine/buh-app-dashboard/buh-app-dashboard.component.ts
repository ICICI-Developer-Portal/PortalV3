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



 

  


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fetchData: BillingEngineService,
    private spinnerService: Ng4LoadingSpinnerService,
    ) { 

    }

  ngOnInit() {
   
       let json= {
        buHId : localStorage.getItem("username")
      }
      this.fetchData.getBEngineHeadRequests(json).subscribe((data: any) => {
         this.getRatePlan= JSON.parse( data._body);
        console.log(  this.getRatePlan)
        this.spinnerService.hide();
         },
         err => {
           this.spinnerService.hide();
           console.log('err', err);
           
         });
  }


  // getRatePlanApprovalPending(){
  //   this.spinnerService.show();
  //   this.fetchData.getRatePlanPending().subscribe((data: any) => {
  //       this.getRatePlan = JSON.parse( data._body);
  //       console.log( this.getRatePlan)
  //       this.spinnerService.hide();
  //        },
  //        err => {
  //          this.spinnerService.hide();
  //          console.log('err', err);
           
  //        });
  // }

  getRatePlanPage(appId,i){

    this.fetchData.setAppData(this.getRatePlan[i]);
    this.router.navigate(["approveRatePlan/" + appId]);
  }

  getBEngineHeadRequests
}

