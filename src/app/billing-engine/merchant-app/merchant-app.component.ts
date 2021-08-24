import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BillingEngineService } from 'src/app/services/billing-engine.service';


@Component({
  selector: 'app-merchant-app',
  templateUrl: './merchant-app.component.html',
  styleUrls: ['./merchant-app.component.css']
})
export class MerchantAppComponent implements OnInit {
  reactiveForm: FormGroup;
  userProfileData;
  userApp:any = [];
  userAppDetail:any;
  credentials:any=[];
  data;
  constructor(private fetchData: BillingEngineService,
    private spinnerService: Ng4LoadingSpinnerService,
    private  formBuilder: FormBuilder,
    private router: Router,
    ) {
   
  }

  ngOnInit() {
   
     this.userProfileData= this.fetchData.getUserData();
     this.userApp = this.userProfileData.apps;
      console.log( this.userApp);
      let reset="";
      this.form(reset)
      for (var item in  this.userApp) { 
       // block of statements 
       this.getAppDetail( this.userApp[item]);
       console.log(item)
  }
}

  form(reset){
    this.reactiveForm = new FormGroup({
      "appName":  new FormControl(),
      "Callback": new FormControl(),
      "Description": new FormControl(),
      "CustomValue":  new FormGroup({
     "nestedList": new FormArray([]),
  }),
})

  }

getAttributes(jsonData1){
 
  this.fetchData.getProductAttributes(jsonData1).subscribe((data: any) => {
    this.data = "";
    let response = data._body;
    this.data = JSON.parse(data._body)
    console.log(this.data)

  },
    err => {

      console.log('err', err);
    });
}
  onSubmit($event){
    console.log(this.reactiveForm.value);
    let json= {
      email: this.userProfileData.email,
      appName:this.reactiveForm.controls.appName.value
    }

    //need to chck with heena ::: which api need to hit for submission
    // this.fetchData.getRateplanStatus(json).subscribe((data: any) => {
    //   let response = JSON.parse( data._body);
    //   console.log(response)
    //   console.log(data._body)
    //  },
    //  err => {
    //    console.log('err', err);
       
    //  });
    }
 
  //fetch app detail
  getAppDetail(app){  
    
   
    let json= {
      email: this.userProfileData.email,
      appName:app
    }
    this.spinnerService.show();
    this.fetchData.getMerchantAppDetail(json).subscribe((data: any) => {
        let response = JSON.parse( data._body);
        this.userAppDetail = response;
        this.credentials =  this.userAppDetail.credentials;
        localStorage.setItem('appName',app);
        this.spinnerService.hide();
       },
       err => {
         this.spinnerService.hide();
         console.log('err', err);
         
       });
     
      }
    
      setRatePlanPage(appId){

        this.router.navigate(["setRatePlan/" + appId]);
      }

      
      // attributes api 
     // ::::once  edit app form will submit ==>>
     // ::::this data will be populated in set rate page 

}
