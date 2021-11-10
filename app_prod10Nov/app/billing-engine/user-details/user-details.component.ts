import { Component, OnInit,OnDestroy  } from '@angular/core';
import { BillingEngineService } from 'src/app/services/billing-engine.service';
import { Subscription } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {formatDate } from '@angular/common';





@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit  {
  today= new Date();
  todaysDataTime = '';
  dataRcvr: Array<any>;
  userProfileData;

  message:string;
  subscription: Subscription;


  constructor(private fetchData: BillingEngineService,
    private spinnerService: Ng4LoadingSpinnerService) {
      this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

   
  }
 
  ngOnInit() {
   
    // get profile data 
    this.userProfileData= this.fetchData.getUserData();
     console.log( this.userProfileData);

  }

  newMessage() {
    this.fetchData.changeMessage("Hello from Sibling")
    
    
  }
  onSubmitBody(data){

  }


}
