import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MerchantOnboardingService } from 'src/app/services/merchant-onboarding.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Console } from 'console';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

    

declare var $: any;



@Component({
  selector: 'app-merchant-onboarding-page',
  templateUrl: './merchant-onboarding-page.component.html',
  styleUrls: ['./merchant-onboarding-page.component.css'],
  providers: [DatePipe],
})
export class MerchantOnboardingPageComponent implements OnInit {
  reactiveForm: FormGroup;
  maxDate:any;
  minDate:any;
  productDetail:any = [];
  productApiService:any = {};
  apiServiceUrlList:any = [];
  apiService: any ;
  apiUrl: any ;
  buUsername;
  buEmail;
  buName;
  IPList: boolean = false;

  IPLists: boolean = false;
  showMode: boolean = false;

  checkboxValues:any ="Select";

  constructor(private router: Router,
    private merchantSrvc: MerchantOnboardingService,
    private spinnerService: Ng4LoadingSpinnerService,
    private  formBuilder: FormBuilder,
    private HttpClient: HttpClient,
    public datepipe: DatePipe,
   ) {
    /* this.dateInput= datepipe.transform(Date.now(),'dd-MMMM-yyyy');*/
    this.maxDate= datepipe.transform(new Date(),'yyyy-MM-dd'); 
    }

  ngOnInit() {
    let reset="";
    this.form(reset)
    //getProductDetail
    this.spinnerService.show();
    this.merchantSrvc.getProductDetail( ).subscribe((data: any) => {
      let response = JSON.parse( data._body);
      this.productDetail = response;
      for (let i in response){
        let key = response[i].apiProductName;
        this.productApiService[key] = response[i].apiProducts;
      }
      this.spinnerService.hide();
      console.log("response=="+ response);
     },
     err => {
       this.spinnerService.hide();
       console.log('err', err);
       
     }); 
     //Prepopulate the field
     this.buEmail = localStorage.getItem("email");
     this.buName = localStorage.getItem("Firstname");
     this.buUsername = localStorage.getItem("username");
     this.reactiveForm.get(['basicDetailsSection','buID']).setValue(this.buUsername);
     this.OnBUIDchange(this.buUsername);

     var checkList = document.getElementById('list1');
 
     $(".anchor").click(function(){
      if (checkList.classList.contains('visible'))
      checkList.classList.remove('visible');
    else
      checkList.classList.add('visible');
     })
  }

  initipRows() {
    return this.formBuilder.group({
      IPList: ['']
    });
  }
  /**
   * add and remove additional IP
   */

  addNewIPField() {
    const control = <FormArray>this.reactiveForm.get('basicDetailsSection').get('IPList');
    console.log(control.at(0));
    if (control.length <= 19) {
      control.push(new FormControl(null, [Validators.required, Validators.pattern('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')]))
    } else { }
  }

  deleteRow(i: number) {
    console.log(i);
    const control = <FormArray>this.reactiveForm.get('basicDetailsSection').get('IPList');

    control.removeAt(i);

  }
  form(reset){
    const ipReg = '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$';

    this.reactiveForm = new FormGroup({
      'basicDetailsSection': new FormGroup({
         "buID":new FormControl('',[Validators.required]),     
        "BusinessUserName":new FormControl('',[Validators.required]),  
        "BusinessUserHeadID":new FormControl('',[Validators.required]),  
        "BusinessUserEmail":new FormControl('',[Validators.required,Validators.email]),  
        "merchantName": new FormControl('',[Validators.required]),  
        "Decryption": new FormControl(''),  
        "DecryptionKey": new FormControl(''),  
        "RelationshipManager": new FormControl('',[Validators.required]),  
        "RequestDate": new FormControl(''),  
        "Domain": new FormControl('',[Validators.required]),  
        "DomainAPI": new FormControl(''),  //,[Validators.required]
        "IPList":new FormArray([
          // <FormArray>this.reactiveForm.get('basicDetailsSection').get('ipRows'),Validators.required
          new FormControl(null, [ Validators.pattern(ipReg)]),//Validators.required,
        ]),

        "CallbackURL":new FormControl(''),  
        "APIURL": new FormControl('',[Validators.required]),  
        "Certificate":  new FormControl('',[Validators.required]),  
        "Remarks": new FormControl(''),  
        "APIName": new FormControl(''),  
        "Mode":new FormControl(''),
        "nDa":new FormControl('', [Validators.required]),
        "ClientCode": new FormControl('1234'),
        "MerchantId": new FormControl('',[Validators.required]),
        "MerchantEmail":new FormControl('',[Validators.required,Validators.email])
        
       })
  })

  }

  saveMerchantData($event){
    console.log(this.reactiveForm.value);

    this.spinnerService.show();


    let json= {
      "buID":this.reactiveForm.value.basicDetailsSection.buID,    
      "BusinessUserName":this.reactiveForm.value.basicDetailsSection.BusinessUserName,  
      "BusinessUserHeadID":this.reactiveForm.value.basicDetailsSection.BusinessUserHeadID,  
      "BusinessUserEmail":this.reactiveForm.value.basicDetailsSection.BusinessUserEmail,  
      "merchantName": this.reactiveForm.value.basicDetailsSection.merchantName,  
      "Decryption": this.reactiveForm.value.basicDetailsSection.Decryption,  
      "DecryptionKey":this.reactiveForm.value.basicDetailsSection.DecryptionKey,  
      "RelationshipManager": this.reactiveForm.value.basicDetailsSection.RelationshipManager,  
      "RequestDate": Date.now(),  //this.reactiveForm.value.basicDetailsSection.RequestDate
      "Domain": this.reactiveForm.value.basicDetailsSection.Domain,  
      "DomainAPI": this.apiService,  
      "IPList": this.reactiveForm.value.basicDetailsSection.IPList,  
      "CallbackURL":this.reactiveForm.value.basicDetailsSection.CallbackURL,  
      "APIURL": this.apiUrl,  
      "Certificate":  "",  
      "Remarks": this.reactiveForm.value.basicDetailsSection.Remarks,  
      "APIName": this.reactiveForm.value.basicDetailsSection.APIName,  
      "Mode": this.reactiveForm.value.basicDetailsSection.Mode,
      "nDa": this.reactiveForm.value.basicDetailsSection.nDa,
      "ClientCode": this.reactiveForm.value.basicDetailsSection.ClientCode,
      "MerchantId": this.reactiveForm.value.basicDetailsSection.MerchantId,
      "MerchantEmail":this.reactiveForm.value.basicDetailsSection.MerchantEmail,  
    }
    if(json["Domain"] == "EazyPay" && json["CallbackURL"] == ''){

      alert("Callback URL is mandatory for EazyPay product");
      return false;
      
    }
     if(json["Domain"] == "CIB" && json["Mode"] == ''){

      alert("Encryption method is mandatory for CIB product");
      return false;
      
    } 
    const formData = new FormData();
    /* bUserId=CUST0578 
bUserName=Naresh
bUserEmail=arva.naresh1@wipro.com
bUserHId=BH01
merchantName=EasyPay
description=EasyPay Desc// no mapping
relationManagerId=Avik
requestDate=08-May-2021
apiProduct=CIB
apiProductServices=1521
ipList=192.168.43.189,166.62.28.147
callBackUrl=sample.com
ndaSign=true
apiUrl=deveportal.icicibank.com
certificate=@"/C:/Users/Naresh/Downloads/780.key (Attachment)
remarks=No
apiName=Payments
encryptRequired=yes
clientCode=ICICI_PRIVATE_KEY
merchantId=ICICI_PRIVATE_KEY
encryptMode=hybrid_generic
status=pending 
 */
    formData.append("bUserId", json["buID"]); //1
    formData.append("bUserName", json["BusinessUserName"]); //2
    formData.append("bUserHId", json["BusinessUserHeadID"]); //1
    formData.append("bUserEmail", json["BusinessUserEmail"]); //2
    formData.append("merchantName", json["merchantName"]); //1
    formData.append("encryptRequired", json["Decryption"]); //1
    formData.append("relationManagerId", json["RelationshipManager"]); //2
    formData.append("requestDate", this.datepipe.transform(new Date(json["RequestDate"]),'dd-MMM-yyyy')); //1
    formData.append("apiProduct", json["Domain"]); //2
    formData.append("apiProductServices", json["DomainAPI"]); //1
    formData.append("ipList", json["IPList"]); //2
    formData.append("callBackUrl", json["CallbackURL"]); //1
    formData.append("apiUrl", json["APIURL"]); //2

    let a: any = (<HTMLInputElement>document.getElementById("Certificate")).files;
   
    for (let k = 0; k < a.length; k++) {
     
      formData.append("certificate", a[k]); //34

    }
    formData.append("remarks", json["Remarks"]); //2
    formData.append("apiName", json["APIName"]); //1
    formData.append("encryptMode", json["Mode"]); //2
    formData.append("status", "Pending"); 
    // Unused request key
    formData.append("ndaSign","true"); 
    formData.append("clientCode", json["ClientCode"]); 
    formData.append("merchantId", json["MerchantId"]); 
    formData.append("description",""); 
    formData.append("merchantEmail",json["MerchantEmail"]); 


   

    this.HttpClient.post<any>(

    //  "https://developer.icicibank.com/rest/merchantOnboard",
      "https://developer.icicibank.com/rest/saveMerchantOnboard",

      formData

    ).subscribe(

      res => {
        console.log(res);
        if (res.status == true || res.status == "true") {
          alert(res.message);
          this.router.navigate(["onboardedMerchantList/"+json["buID"]]);

        } else{
          alert(res.message);
        }
        this.spinnerService.hide();
      },

      err => {
        console.log('err', err);
        this.spinnerService.hide();
      });
   
     
      }
      selectChangeHandler(event){
        
        let val =  event.target.value;
        this.apiServiceUrlList = this.productApiService[val];
        if(val == "CIB"){
          this.showMode = true;
        }else{
          this.showMode = false;
        }
      }
  
      onServiceChange(event){
     /*Start here  */
        let that = this;
        let _apiUrl = [];
        this.checkboxValues = $('input[name="apiService"]:checked').map( function () {
          let val =  $(this).val(); 
        let serviceName = that.apiServiceUrlList[val].apiName;
        let serviceURL=that.apiServiceUrlList[val].apiUATUrl;
        _apiUrl.push(serviceURL);
          return serviceName; 
      })
      .get()
      .join(', ');
        console.log(this.checkboxValues)
        this.apiService = this.checkboxValues;
        this.apiUrl = _apiUrl.toString();
        console.log(this.apiUrl);

        this.reactiveForm.get(['basicDetailsSection','APIURL']).setValue(_apiUrl.toString());
   /* End here */
      }



      OnBUIDchange(val){
  
       this.reactiveForm.get(['basicDetailsSection','BusinessUserName']).setValue(this.buName);
       this.reactiveForm.get(['basicDetailsSection','BusinessUserEmail']).setValue(this.buEmail);
      
        let json ={
          bUserId:val
        }  
        this.spinnerService.show();
        this.merchantSrvc.getBEUserHeadId(json).subscribe((data: any) => {
          let response = JSON.parse( data._body);
          this.spinnerService.hide();
          if(response.status == true && response.data != null){
            this.reactiveForm.get(['basicDetailsSection','BusinessUserHeadID']).setValue(response.data);
      
          }else{
              console.log(response.message);
          }
          console.log("response=="+ response.data);
         },
         err => {
           this.spinnerService.hide();
           console.log('err', err);
          });
       
      }
      navigateToHistory(){
        this.router.navigate(["onboardedMerchantList/"+localStorage.getItem("username")]);
      }
    
    }

