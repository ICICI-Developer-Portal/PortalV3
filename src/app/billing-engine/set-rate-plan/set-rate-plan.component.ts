import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';

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

  constructor(
    private route: ActivatedRoute,
    private fetchData: BillingEngineService,
    private spinnerService: Ng4LoadingSpinnerService,
    private formBuilder: FormBuilder
    ) { 
      this.setRateForm = new FormGroup({
        formArrayName: this.formBuilder.array([])
      })
  
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
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
        // product value may change
        let products = response.credentials[0].apiProducts;
        for( let i in products){
          this.appProducts.push(products[i].apiproduct);
        }
        if(this.appProducts.length>0){
          this.getProductAttributes(this.appProducts[0],0);
        }
        this.spinnerService.hide();
       },
       err => {
         this.spinnerService.hide();
         console.log('err', err);
         
       });
       //get rate plan
      
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


  getProductAttributes(productName,index){
    if(productName == "IMPS"){
      this.appProducts_imps =true;
    }
    let json1= {
   
      apiProductName : productName//"IMPS"productName
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
      for(let j in rates){
        $("#"+rates[j].label).val(rates[j].rate);
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
   "name":localStorage.getItem('appName'),
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
    appName : localStorage.getItem('appName'),
    email : this.userProfileData.email,
    appId : this.id ,
    status :"pending",
    developerId:this.userProfileData.email,
    merchantName:this.userProfileData.userName,
    productName:this.appProducts.toString(),
    bucketValues:bucketString.toString(),
    attributes :JSON.stringify(attr)
    
  };
 
    this.spinnerService.show();
    this.fetchData.saveRatePlan(json).subscribe((data: any) => {
      let response = JSON.parse( data._body);
      alert("Rate plan set success.");
      console.log(response);
      this.spinnerService.hide();
    },
    err => {
      this.spinnerService.hide();
      console.log('err', err);

    }); 


}

 
 }

 

  
 