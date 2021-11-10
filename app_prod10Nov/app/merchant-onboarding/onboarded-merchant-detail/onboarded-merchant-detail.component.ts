import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MerchantOnboardingService } from 'src/app/services/merchant-onboarding.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common'

@Component({
  selector: 'app-onboarded-merchant-detail',
  templateUrl: './onboarded-merchant-detail.component.html',
  styleUrls: ['./onboarded-merchant-detail.component.css']
})
export class OnboardedMerchantDetailComponent implements OnInit {
  onboardedMerchantData:any = {};
  showBUH: boolean = false;
  showBU: boolean = false;
  apiUrl:any = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private merchantSrvc: MerchantOnboardingService,
    private spinnerService: Ng4LoadingSpinnerService,
    private  formBuilder: FormBuilder,
    private location: Location
    ) { 
      if (localStorage.getItem("role") === "BUH") {
        this.showBUH = true;
        this.showBU = false;
      }
      if (localStorage.getItem("role") === "BU") {
        this.showBU = true;
        this.showBUH = false;
      }
  
    }

  ngOnInit() {
    this.onboardedMerchantData= this.merchantSrvc.getMerchantData();
    this.apiUrl = this.onboardedMerchantData.apiUrl.split(',');
    console.log( this.onboardedMerchantData);
    
  }
  navigateBack():void {
    this.location.back()
  }
  approveRequestId(val,remarks):void {
    let json ={
      reqId :  this.onboardedMerchantData.reqId,
      status : val,
      remarksBUH : remarks
    }
    this.spinnerService.show();
    this.merchantSrvc.updateRequestStatus(json).subscribe((data: any) => {
      let response = JSON.parse( data._body);
      this.spinnerService.hide();
      console.log("response=="+ response);
      if(response.status == true){
        alert("Request "+val+" successfully !");
        this.router.navigate(["ApproveRequest"]);
      }else{
        alert(response.message);
      }
     },
     err => {
       this.spinnerService.hide();
       console.log('err', err);
       
     }); 
  }
  downloadfile(path){
    this.merchantSrvc.downloadFromURL(path).subscribe((data: any) => {
      console.log(data);
    },
    err => {
      console.log('err', err);
     
    });
  }
}
