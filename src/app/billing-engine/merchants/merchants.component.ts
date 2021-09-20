import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalService } from 'ngx-bootstrap';
import { BillingEngineService } from 'src/app/services/billing-engine.service';

declare var $: any;

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css']
})
export class MerchantsComponent implements OnInit   {
  public dataSender: Array<any>=[1,8,8,8] ;
  message:string;
  subscription: Subscription; 
   exampleParent: string;

  // Hello Parent Name!


  merchantList: any[];
  merchantDetail: any;
  items = [];
  
  pageOfItems: Array<any>;
  config: any;
  collection = { count: 10, data: [] };
  emailList : any[];
  merchantDetailList:any = [];
    data: any;
  
  constructor(private fetchData: BillingEngineService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private beSrvc: BillingEngineService,
    private toasterService: ToasterService,
    
    private changeDetector: ChangeDetectorRef) {
      this.fetchData.getDataFromComponent(this.dataSender);


    this.getData();
  }
  getData() {
    this.fetchData.getData().subscribe(
      (data) => {
        this.data = data;
        console.log(this.data )
      }
    );
  }

  ngOnInit() {

    let g_merchantList =  this.fetchData.getMerchantListData();
    if(g_merchantList == undefined || g_merchantList.length <= 0){
      this.getMerchantList();
    }else{
      this.merchantList = g_merchantList;
         this.config = {
           itemsPerPage: 10,
           currentPage: 1,
           totalItems: this.merchantList.length,
         };
        this.getMerchantData();
    }


    
  }
  getMerchantList(){
    let json = {};
    //this.spinnerService.show();
    this.beSrvc.getMerchantList(json).subscribe((data: any) => {
     this.spinnerService.hide();
         var response = data._body;
         this.merchantList = JSON.parse(response);
         this.config = {
           itemsPerPage: 10,
           currentPage: 1,
           totalItems: this.merchantList.length,
         };
         this.beSrvc.setMerchantListData(this.merchantList);
        this.getMerchantData();
      
   
        },
        err => {
         //this.spinnerService.hide();
          console.log('err', err);
          
        });
  }
 
  getMerchantData(){
    let jsonData;
    let g_merchantDetailList =  this.fetchData.getMerchantDetailData();
    if(g_merchantDetailList == undefined || g_merchantDetailList.length <= 0){
       jsonData = this.merchantList.slice(0,10);
       this.fetchMerchantDetail(jsonData);
    }else if(g_merchantDetailList[this.config.currentPage] == undefined || g_merchantDetailList[this.config.currentPage].length <= 0){
       if(this.config.currentPage==1){
            jsonData = this.merchantList.slice(0,10);
            this.fetchMerchantDetail(jsonData);
        }else{
            jsonData = this.merchantList.slice((this.config.currentPage*10),(this.config.currentPage*10)+10);
            this.fetchMerchantDetail(jsonData);
        } 
    }else{
      this.merchantDetail=g_merchantDetailList[this.config.currentPage];
    }

   
    
    
  }

 fetchMerchantDetail(jsonData){
    $(".overlay").show();
    this.beSrvc.getMerchantDetail(jsonData).subscribe((data: any) => {
    this.merchantDetail=[];
        this.merchantDetail = JSON.parse( data._body);
        this.merchantDetailList[this.config.currentPage]= this.merchantDetail
        this.beSrvc.setMerchantDetailData(this.merchantDetailList);
        $(".overlay").hide();
      },
      err => {
        $(".overlay").hide();
        console.log('err', err);
        
      });
 }
  

pageChanged(event){
  console.log(event)
  this.config.currentPage = event;
  console.log( this.config.currentPage)
  console.log( this.config.data)
  console.log( this.emailList);
  //   this.config)

  this.getMerchantData();


}

getDetailsOfMerchants(e){
  let index = e.target.getAttribute('data-index');
  this.beSrvc.setUserData(this.merchantDetail[index]);
  this.router.navigate(["/UserDetails"]);
 
}

SearchMerchantProfile(merchantId){
  $(".overlay").show();
  let json = [merchantId] ;
  this.beSrvc.getMerchantDetail(json).subscribe((data: any) => {
    let mDetail = JSON.parse( data._body);
    if(mDetail.length>0){
      this.beSrvc.setUserData(mDetail[0]);
      this.router.navigate(["/UserDetails"]);
    }else{
      alert("Record not found.Validate the merchant email");
    }
  
    $(".overlay").hide();
  },
  err => {
    $(".overlay").hide();
    console.log('err', err);
    
  });

}
}
