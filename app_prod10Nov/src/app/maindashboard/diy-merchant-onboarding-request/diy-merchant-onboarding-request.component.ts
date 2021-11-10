import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MerchantOnboardingService } from 'src/app/services/merchant-onboarding.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { saveAs } from "file-saver";
import { LoginService } from 'src/app/services';
declare var $: any;
@Component({
  selector: 'app-diy-merchant-onboarding-request',
  templateUrl: './diy-merchant-onboarding-request.component.html',
  styleUrls: ['./diy-merchant-onboarding-request.component.css']
})
export class DiyMerchantOnboardingRequestComponent implements OnInit {
  id:any;
  reqDetailArr:any = [];
  modalRef: BsModalRef;
  onboardedMerchantData:any;
  apiUrl:any = [];
  showBUH: boolean = false;
  showBU: boolean = false;
  selectedOption;
  response;
  key;
  checkboxValues;
  productDetail;
  productApiService;
  reqResponse:any=[];
  p: any = 1;
  
  merchantList: any[];
  merchantDetail: any;
  items = [];
  
  pageOfItems: Array<any>;
  config: any;
  collection = { count: 10, data: [] };
  emailList : any[];
  merchantDetailList:any = [];
    data: any;
  
  
    constructor(private router: Router,
      private route: ActivatedRoute,
      private merchantSrvc: MerchantOnboardingService,
      private loginSrvc: LoginService,
      private spinnerService: Ng4LoadingSpinnerService,
      private  formBuilder: FormBuilder,
      private modalService: BsModalService) { 
  
        this.route.params.subscribe(params => {
          this.id = params['id'];
        });
      }
  
    ngOnInit() {
     
      let json = {
        productName : "Composite",
        approverId : localStorage.getItem("username")
        
       }

      this.spinnerService.show();
      this.loginSrvc.isDIYRequestApprover(json).subscribe((data: any) => {
       let response = JSON.parse( data._body);
         console.log(response)
         if(response.status){
          this.getProductlist();
          this.getDiyOnboardingReq();
         }else{
           alert("No request found. "+response.message);
         }
     
      this.spinnerService.hide();
     },
     err => {
       this.spinnerService.hide();
       console.log('err', err);
       
     });
      
    }
    getProductlist(){
      this.spinnerService.show();
       this.merchantSrvc.getProductDetail( ).subscribe((data: any) => {
        this.response = JSON.parse( data._body);
        this.productDetail = this.response;
          console.log(this.response)
       for (let i in this.response){
        console.log(this.response[i].apiProductName);
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
    }
  
    getDiyOnboardingReq(){
      let json = {
        apiProduct: "Composite"
      }
      this.spinnerService.show();
      this.loginSrvc.getDiyMerchantOnboardingReq(json ).subscribe((data: any) => {
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
    approveDiyOnboardingReq(reqId,remark,status){

      if(status == undefined || status == ""){
        alert("Please select the status");
        return false;
      }


      let json = {
        reqId :reqId,
        status : status,
        remarksBUH : remark

      }
      console.log(json);
      this.spinnerService.show();
      this.loginSrvc.approveDiyMerchantOnboardingReq(json ).subscribe((data: any) => {
        let response = JSON.parse( data._body);
        this.spinnerService.hide();
        if(response.status){
          alert(response.message);
        }else{
          alert(response.message);
        }
        //this.reqDetailArr = response;
       // this.reqResponse = response;
        
       },
       err => {
         this.spinnerService.hide();
         console.log('err', err);
         
       });
    }
   
    
    openModal(viewDetail: TemplateRef<any>,id) {
      console.log(id);
      this.onboardedMerchantData = this.reqDetailArr[id];
      console.log(this.onboardedMerchantData);
      this.apiUrl = [];
      if( this.onboardedMerchantData.apiName){
        this.apiUrl = this.onboardedMerchantData.apiName.split(',');
      }
    
      this.modalRef= this.modalService.show(viewDetail, { backdrop: "static",class: 'modal-lg'});
      
      
    }
    downloadfile(path,filename){
      this.merchantSrvc.downloadFromURL(path).subscribe((data: any) => {
        console.log(data);
        let certificate = data._body;
        console.log(data._body);
        var blob = new Blob([certificate], {
          type: "text/plain"
        });
        saveAs(blob, filename+"_file");
      },
      err => {
        console.log('err', err);
       
      });
    }
    downloadDocument(jiraID,type,url) {
      var json = {
        jiraid: jiraID,
        type:type
      };
  
      var fileName = url.substring(url.lastIndexOf("/") + 1);
  
      this.loginSrvc.customDownload(json).subscribe((data: any) => {
        let certificate = data._body;
        console.log(data._body);
        var blob = new Blob([certificate], {
          type: "text/plain"
        });
        saveAs(blob, fileName);
      },
      err => {
        console.log('err', err);
       // this.router.navigate(['error']);
       // this.toastrmsg('error',"Something went wrong. Please try again in some time.");
      },);
    }
    closeMe(){
      this.getDiyOnboardingReq();
      this.modalRef.hide();
    }
    navigateToOnboarding(){}
    onChangeProduct(e){}
    onChangeStatus(e){}
  }
  