import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillingEngineService } from 'src/app/services/billing-engine.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bu-request',
  templateUrl: './bu-request.component.html',
  styleUrls: ['./bu-request.component.css']
})

export class BuRequestComponent implements OnInit {
  appList:any = [];
  appDetail:any=[];
  getRatePlan:any=[];

  name;
  status;
  createdby;


  constructor(    private router: Router,
    private route: ActivatedRoute,
    private fetchData: BillingEngineService,
    private spinnerService: Ng4LoadingSpinnerService,) { }
  // getBEngineUserRequests
  ngOnInit() {
    
    let json= {
      bUserId  : localStorage.getItem("username")
    }
    console.log(json)
    this.fetchData.getBEngineUserRequests(json).subscribe((data: any) => {
       this.getRatePlan= JSON.parse( data._body);
      console.log(  this.getRatePlan)
      this.spinnerService.hide();
       },
       err => {
         this.spinnerService.hide();
         console.log('err', err);
         
       });
  }

}
