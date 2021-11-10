import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MerchantOnboardingService } from 'src/app/services/merchant-onboarding.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-approve-onboarded-merchant-request',
  templateUrl: './approve-onboarded-merchant-request.component.html',
  styleUrls: ['./approve-onboarded-merchant-request.component.css']
})
export class ApproveOnboardedMerchantRequestComponent implements OnInit {
  id:any;
  reqDetailArr:any = [];
  reqResponse:any=[];
  response;
  productDetail;
  key;
  productApiService;
  p: any = 1;
  pageOfItems: Array<any>;
config: any;
collection = { count: 10, data: [] };
  
    constructor(private router: Router,
      private route: ActivatedRoute,
      private merchantSrvc: MerchantOnboardingService,
      private spinnerService: Ng4LoadingSpinnerService,
      private  formBuilder: FormBuilder) { 
        this.id = localStorage.getItem("username");
       // this.id = "118302";
      }
  
    ngOnInit() {
      this.spinnerService.show();
 
     this.merchantSrvc.getProductDetail( ).subscribe((data: any) => {
      this.response = JSON.parse( data._body);
     this.productDetail = this.response;
     console.log(this.response)
     for (let i in this.response){
     console.log(this.response[i].apiProductName)

       this.key = this.response[i].apiProductName;
       this.productApiService[this.key] = this.response[i].apiProducts;
       
     }
     this.spinnerService.hide();
     console.log("this.response=="+ this.response);
    },
    err => {
      this.spinnerService.hide();
      console.log('err', err);
      
    });

      //=============
      let json = {
        buHId : this.id
      }
      this.spinnerService.show();
      this.merchantSrvc.getBUHRequests(json ).subscribe((data: any) => {
        let response = JSON.parse( data._body);
        this.spinnerService.hide();
        this.reqDetailArr = response;
        this.reqResponse = response;
       },
       err => {
         this.spinnerService.hide();
         console.log('err', err);
         
       }); 
    }
    
    showDetailPage(id){
      console.log(id);
      this.merchantSrvc.setMerchantData(this.reqDetailArr[id]);
      this.router.navigate(["MerchantDetail"]);
    }
    onChangeProduct(event){
      let val = event.target.value;
      if(val == "All"){
        this.reqDetailArr = this.reqResponse;
      }else{
        this.reqDetailArr = this.reqResponse.filter(
          item => item.domain === val);
      }
  
  }
  onChangeStatus(event){
   
     let val = event.target.value;
     if(val == "All"){
       this.reqDetailArr = this.reqResponse;
     }else{
       this.reqDetailArr = this.reqResponse.filter(
         item => (item.status).toLowerCase() === val.toLowerCase());
     }
     
     }
}