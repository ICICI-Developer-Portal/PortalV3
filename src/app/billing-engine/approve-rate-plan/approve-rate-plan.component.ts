import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';

import { BillingEngineService } from 'src/app/services/billing-engine.service';

@Component({
  selector: 'app-approve-rate-plan',
  templateUrl: './approve-rate-plan.component.html',
  styleUrls: ['./approve-rate-plan.component.css']
})
export class ApproveRatePlanComponent implements OnInit {

  ApproveRateForm: FormGroup;

  id:any;
  appDetail:any;
  appProducts:any = [];
  apiProductBucket :any =[];
  ratePlans : any = [];
   arr1 =[];
   status;
   apiProduct;
  


    setratePlanText;
    setratePlanValue;
   setratePlanStatus;
   appData:any = {};
  
    constructor(
      private route: ActivatedRoute,
      private fetchData: BillingEngineService,
      private spinnerService: Ng4LoadingSpinnerService,
      private formBuilder: FormBuilder
      ) { 
      
    
      this.route.params.subscribe(params => {
        this.id = params['id'];
        console.log(this.id);

        this.appData= this.fetchData.getAppData();
      });
    }
  
    ngOnInit() {
  
     
      this.spinnerService.show();
      let json= {
        appId : this.id
      }
     
      this.fetchData.getAppDetail(json).subscribe((data: any) => {
          let response = JSON.parse( data._body);
          this.appDetail = response;
          // product value may change
          console.log(response)
          let products = response.credentials[0].apiProducts;
          console.log(products)
          for( let i in products){
            console.log( products, response.attributes)   
            for(let j in response.attributes){ 
              console.log(response.attributes[j].name , products[i].apiProduct)
              if(response.attributes[j].name == products[i].apiproduct){
                let o = JSON.parse(response.attributes[j].value);
                console.log( o)            

                for(let key in o){
                  let tempObj = {
                    name: key,
                    value:o[key],
                    appProduct:products[i].apiproduct
                  }
                  this.apiProductBucket.push(tempObj)
                 
                }
                
              }
           
    

            if(response.attributes[j].name=="Rate_Plan_Status"){​​​​​​​​

                console.log(JSON.parse(response.attributes[j].value))
                this.setratePlanValue=JSON.parse(response.attributes[j].value);
                this.setratePlanText=this.setratePlanValue[0].name;
                this.setratePlanStatus=this.setratePlanValue[0].status;
                console.log(this.setratePlanValue[0].status)
 
              }​​​​​​​​ 


              
            }

            this.appProducts.push(products[i].apiproducts);

            
          }
         console.log("this.apiProductBucket="+ JSON.stringify(this.apiProductBucket))
          this.spinnerService.hide();
         },
         err => {
           this.spinnerService.hide();
           console.log('err', err);
           
         });


         
         //get rate plan
      let reset="";
     this.form(reset)
    }

    form(reset){
    this.ApproveRateForm = new FormGroup({
      'ApproveRateplan': new FormGroup({

      "approveRateplan":  new FormControl(),})
     
})
}

  
onSubmit($event) {
      let approvalVal = this.ApproveRateForm.value.ApproveRateplan.approveRateplan;

      let attr = {
        "name":localStorage.getItem('appName'),
        "attributes":  this.appDetail.attributes
        
      };
      for(let i in attr.attributes){
        if(attr.attributes[i].name == "Rate_Plan_Status" ){
          let temp =JSON.parse(attr.attributes[i].value);
          let ratePlan = [];
          let tempObj = {
            id:temp[0].id,
            name:temp[0].name,
            status:approvalVal
          }
          ratePlan.push(tempObj)

          attr.attributes[i].value = JSON.stringify(ratePlan);
          break;
        }
      }
      
      let json = {
        appName : this.appData.appName,
        email :  this.appData.developerId,//this.userProfileData.email,
        appId : this.id ,
        status :approvalVal,
        developerId: this.appData.developerId,//this.userProfileData.email,
        attributes :JSON.stringify(attr)
        
      };
     
      this.spinnerService.show();
     this.fetchData.saveRatePlan(json).subscribe((data: any) => {
       let response = JSON.parse( data._body);
       console.log(response);
       alert("Rate plan updated successfuly.");
       this.spinnerService.hide();
      },
      err => {
        this.spinnerService.hide();
        alert("Rate plan update failed");
        console.log('err', err);
        
      }); 
   }

  
  
  
  
  
/*   onSubmit($event) {
    console.log("sbdbsdh",this.ApproveRateForm.value);
   } */
   
   
   
   }
  
  
  
  
  
  
  
  
  
  
  
  
 
  