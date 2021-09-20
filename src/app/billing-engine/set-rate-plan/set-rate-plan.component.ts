import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MerchantOnboardingService } from 'src/app/services/merchant-onboarding.service';

import { BillingEngineService } from 'src/app/services/billing-engine.service';
declare var $: any;

@Component({
  selector: 'app-set-rate-plan',
  templateUrl: './set-rate-plan.component.html',
  styleUrls: ['./set-rate-plan.component.css']
})
export class SetRatePlanComponent implements OnInit {
  setRateForm: FormGroup;

  id:any;
  appDetail:any;
  appProducts:any = [];
  apiProductBucket :any =[];
  ratePlans : any = [];
  arr1 =[];
  planId:any;
  planName:any;
  bucketValuesArray:any=[];
  userProfileData:any;
  imps_plan: any = [];
  appProducts_imps:boolean = false;
  apprRejtFlag:boolean = false;
  requestStatus:any="";
  setratePlanText:any="";
  impsPredefinedPlan:boolean = false;
  appName:any;

  BusinessUserHeadID;
  buUsername;
  buEmail;
  buName;
  constructor(
    private route: ActivatedRoute,
    private merchantSrvc: MerchantOnboardingService,

    private fetchData: BillingEngineService,
    private spinnerService: Ng4LoadingSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
    ) { 
      this.setRateForm = new FormGroup({
        formArrayName: this.formBuilder.array([])
      })
  
    this.route.params.subscribe(params => {
      let param =  params['id'].split("&");
      this.id = param[0];
      this.appName = param[1];
      console.log(this.id+"==="+this.appName);
    });
    this.userProfileData= this.fetchData.getUserData();
  }
  

  ngOnInit() {

    this.getRatePlane();
    this.spinnerService.show();
    let json= {
      appId : this.id
    }
    this.fetchData.getAppDetail(json).subscribe((data: any) => {
        let response = JSON.parse( data._body);
        this.appDetail = response;
        let apprRejtFlag = false;
        // In case rate plan is approved or rejected bucket would be in readmode only
        for(let i in response.attributes){ 
          if(response.attributes[i].name == "Rate_Plan_Status"){
           let p = JSON.parse(response.attributes[i].value); 
            if(p[0].status == "approved" || p[0].status == "rejected"){
              apprRejtFlag =  true;
              this.apprRejtFlag = true;
              this.requestStatus = p[0].status;
              this.setratePlanText=p[0].name;
            }

            break;
          }
          
        }
        // product value may change || if rate plane is not set or send for  review then it will be editable
        let products = response.credentials[0].apiProducts;
        for( let i in products){
          this.appProducts.push(products[i].apiproduct);
        }
        // if rate plan status is approved or rejected by BUH then show the bucket info in read mode
        if(!apprRejtFlag){
          if(this.appProducts.length>0){
            this.getProductAttributes(this.appProducts[0],0);
          }
        }else{
          for( let i in products){  
            for(let j in response.attributes){ 
              if(response.attributes[j].name == products[i].apiproduct){
                let o = JSON.parse(response.attributes[j].value);
                for(let key in o){
                  let tempObj = {
                    name: key,
                    value:o[key],
                    appProduct:products[i].apiproduct
                  }
                  this.apiProductBucket.push(tempObj)
                 
                }
                
              }
            }
          }
          // build form 
          this.buildForm();
        }
       
        this.spinnerService.hide();
       },
       err => {
         this.spinnerService.hide();
         console.log('err', err);
         
       });
       //get rate plan
     
       this.buEmail = localStorage.getItem("email");
       this.buName = localStorage.getItem("Firstname");
       this.buUsername = localStorage.getItem("username");
         console.log( this.setRateForm.controls);

       this.OnBUIDchange(this.buUsername)
      this.imps_plan = [
        {id:"imps_plan_a",
        displayName: "IMPS_Plan_A",
        rates:[
          {
            label:"IMPS_Bucket1",
            rate:"1.75",
            range:"1"
          },
          {
            label:"IMPS_Bucket2",
            rate:"4",
            range:"1-1k",
          },
          {
            label:"IMPS_Bucket3",
            rate:"4",
            range:"1000-25k"
          },
          {
            label:"IMPS_Bucket4",
            rate:"8",
            range:">25k"
          }
        ]},
        {id:"imps_plan_b",
        displayName: "IMPS_Plan_B",
        rates:[
          {
            label:"IMPS_Bucket1",
            rate:"1.5",
            range:"1"
          },
          {
            label:"IMPS_Bucket2",
            rate:"1.5",
            range:"1-1k",
          },
          {
            label:"IMPS_Bucket3",
            rate:"2.5",
            range:"1000-25k"
          },
          {
            label:"IMPS_Bucket4",
            rate:"6.5",
            range:">25k"
          }
        ]},
        {id:"custome_plan",
        displayName: "Custome_Plan",
        rates:[
          {
            label:"IMPS_Bucket1",
            rate:"",
            range:"1"
          },
          {
            label:"IMPS_Bucket2",
            rate:"",
            range:"1-1k",
          },
          {
            label:"IMPS_Bucket3",
            rate:"",
            range:"1000-25k"
          },
          {
            label:"IMPS_Bucket4",
            rate:"",
            range:">25k"
          }
        ]}
      ];
       
  }

  
  getRatePlane(){
    
      this.spinnerService.show();
      this.fetchData.getRatePlane().subscribe((data: any) => {
        let response = JSON.parse( data._body);
        this.ratePlans = response.ratePlan;
        this.spinnerService.hide();
      },
      err => {
        this.spinnerService.hide();
        console.log('err', err);
        
      }); 
  }
  OnBUIDchange(val){
  console.log(val)  
     let json ={
       bUserId:val
     }  
     this.spinnerService.show();
     this.merchantSrvc.getBEUserHeadId(json).subscribe((data: any) => {
       let response = JSON.parse( data._body);
       this.spinnerService.hide();
       console.log("yes")
       if(response.status == true ){
         this.BusinessUserHeadID =response.data;
         console.log("yes",  this.BusinessUserHeadID)
          this.setRateForm.get(['BusinessUserHeadID']).setValue(response.data);
   
       }else{
         //  console.log(response.message);
       }
     //  console.log("response=="+ response.data);
      },
      err => {
        this.spinnerService.hide();
        console.log('err', err);
       });
    
   }

  getProductAttributes(productName,index){
    if(productName == "IMPS"){
      this.appProducts_imps =true;
    }
    //this.appProducts_imps =true;
    let json1= {
   
      apiProductName : productName //"IMPS"productName
    }
    this.fetchData.getProductAttributes(json1).subscribe((data: any) => {
      let response = JSON.parse( data._body);
      for(let i in response.attribute){ 
        if(response.attribute[i].name == "product_kvm"){
         let p = response.attribute[i].value.split(",");   
         for(let i in p){
           let tempObj = {
             name: p[i],
             value:"",
             appProduct:productName
           }
           this.apiProductBucket.push(tempObj)
           console.log(this.apiProductBucket)
           this.buildForm();
         }
        
        // this.apiProductBucket=p;
        }
      }
      if(this.appProducts.length> (index+1)){
        let newIndex = (index+1);
        this.getProductAttributes(this.appProducts[newIndex],newIndex);
      }
     },
     err => {
       this.spinnerService.hide();
       console.log('err', err);
       
     });

  }
  selectChangeHandler(e){
    this.planId = e.target.value;
    let selectedOptions = e.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    this.planName = selectedOptions[selectedIndex].text;
  }
  selectChangeHandler2(e){
      console.log(e.target.value);
      
      let i  = e.target.value;
      let rates = this.imps_plan[i].rates;
      this.planId = this.imps_plan[i].id;;
      this.planName = this.imps_plan[i].displayName;
      for(let j in rates){
        if(this.planName == "IMPS_Plan_A" || this.planName == "IMPS_Plan_B"){
          $("#"+rates[j].label).val(rates[j].rate);
          $("#"+rates[j].label).attr("readonly",true);
        }else{
          $("#"+rates[j].label).val(rates[j].rate);
          $("#"+rates[j].label).attr("readonly",false);
        }
        
      }
     
      
      

  }
  buildForm() {
    console.log(this.apiProductBucket);
   const controlArray = this.setRateForm.get('formArrayName') as FormArray;
   Object.keys(this.apiProductBucket).forEach(i => {
         controlArray.push(
         this.formBuilder.group({
         name: new FormControl({ name: this.apiProductBucket[i]["name"] ,
         value: this.apiProductBucket[i]["value"],
         appProduct: this.apiProductBucket[i]["appProduct"] }),
         })
         );
         });
   console.log(controlArray.controls);
 }

onSubmit(event) {
  let Flag_BE_name = false;
  let Flag_setRatePlan = false;

  let ratePlan = [];
  let tempObj = {
    id:this.planId,
    name:this.planName,
    status:"pending"
  }
  ratePlan.push(tempObj)

  let attr = {
   "name":this.appName,
   "attributes":  this.appDetail.attributes
    
  };
  for(let i in attr.attributes){
    switch(attr.attributes[i].name) { 
      case "BE_Business_User": { 
        attr.attributes[i].value = localStorage.getItem('email');
        Flag_BE_name = true;
         break; 
      } 
      case "Rate_Plan_Status": { 
        attr.attributes[i].value = JSON.stringify(ratePlan);
        Flag_setRatePlan = true;
         break; 
      } 
      default: { 
         //statements; 
         break; 
      } 
   } 
  }
  if(!Flag_BE_name){
    let obj = {
      "name": "BE_Business_User",
      "value": localStorage.getItem('email')
    }
    attr.attributes.push(obj);
  }
  if(!Flag_setRatePlan){
    let obj = {
      "name": "Rate_Plan_Status",
      "value": JSON.stringify(ratePlan)
    }
    attr.attributes.push(obj);
  }
 
  let tempJson = {}
  //iterating the formarray for creating the packet in required format
   this.setRateForm.get('formArrayName').value.forEach((element, index) => {
      if(index!=0){
          let id=$("#"+this.setRateForm.get('formArrayName').value[index].name.name).attr("id");
        //creating the array of object
        let prd = this.setRateForm.get('formArrayName').value[index].name.appProduct;
        let bucketLbl = this.setRateForm.get('formArrayName').value[index].name.name;
        let bucketVal = $("#"+id).val()
         
      if(prd in tempJson ){
        tempJson[prd][bucketLbl]= bucketVal;
      }else{
        tempJson[prd] ={};
        tempJson[prd][bucketLbl]= bucketVal;
      }
        
      }
   });
   let bucketString = [];
    for(let key in tempJson){
      let f = false;
      for(let i in attr.attributes){
        if(attr.attributes[i].name == key){
          attr.attributes[i].value = JSON.stringify(tempJson[key]);
          f = true;
        }
      }
        if(!f){
            let product = {​
              "name": key,
              "value": JSON.stringify(tempJson[key])
              } ;
              attr.attributes.push(product);
        
        }
        bucketString.push(JSON.stringify(tempJson[key]));
     
    }
//userProfileData.userName
  let json = {
    appName : this.appName,
    email : this.userProfileData.email,
    appId : this.id ,
    status :"pending",
    developerId:this.userProfileData.email,
    merchantName:this.userProfileData.userName,
    productName:this.appProducts.toString(),
    bucketValues:bucketString.toString(),
    // buId:"BAN255141",
    // buhId:"BAN255139",
    buId: this.buName,
    buhId:this.BusinessUserHeadID,
    buh_remarks:"",
    attributes :JSON.stringify(attr)
    
  };
 
    this.spinnerService.show();
    this.fetchData.saveRatePlan(json).subscribe((data: any) => {
      let response = JSON.parse( data._body);
      alert("Rate plan set success.");
      console.log(response);
      this.spinnerService.hide();
      this.router.navigate(['/merchants']);///merchants
    },
    err => {
      this.spinnerService.hide();
      console.log('err', err);

    }); 


}

 
 }

 

  
 