import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MerchantOnboardingService } from 'src/app/services/merchant-onboarding.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { saveAs } from "file-saver";
declare var $: any;

@Component({
  selector: 'app-onboarded-merchant-request',
  templateUrl: './onboarded-merchant-request.component.html',
  styleUrls: ['./onboarded-merchant-request.component.css']
})
export class OnboardedMerchantRequestComponent implements OnInit {
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
    private spinnerService: Ng4LoadingSpinnerService,
    private  formBuilder: FormBuilder,
    private modalService: BsModalService) { 

      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
    }

  ngOnInit() {

    if (localStorage.getItem("role") === "BUH") {
      this.showBUH = true;
    
    }
    if (localStorage.getItem("role") === "BU") {
      this.showBU = true;
    
    }this.getBUrequestDetails();
  
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
  }

  getBUrequestDetails(){
    let json = {
      bUserId: this.id
    }
    this.spinnerService.show();

    this.merchantSrvc.getBURequests(json ).subscribe((data: any) => {
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
    this.router.navigate(["/MerchantDetail"]);
  }
  navigateToOnboarding(){
    this.router.navigate(["/MerchantOnboarding"]);
  }
  openModal(viewDetail: TemplateRef<any>,id) {
    console.log(id);
    this.onboardedMerchantData = this.reqDetailArr[id];
    // console.log( this.onboardedMerchantData)
    this.apiUrl = this.onboardedMerchantData.apiUrl.split(',');
    // console.log(this.apiUrl)
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
      saveAs(blob, filename+"_ICICI_PUBLIC_CERT");
    },
    err => {
      console.log('err', err);
     
    });
  }
  ForProduct(required){
    console.log(required)
    // var searchText = required.currentTarget.value.toLowerCase();
    $('select[name="Status"] option:selected').prop("selected", false)

    var searchText = required.toLowerCase();
    console.log(searchText)
    $.each($(".table tbody .Product"), function() {
      console.log($(this).parent())
      if(required=="Select Product"){
          $(this).parent().show(); 
      }
      else{
        if($(this).text().toLowerCase().indexOf(searchText) === -1)
          //  $(this).hide();
    
           $(this).parent().hide();

        else
           $(this).parent().show();   }             
    });}



    ForStatus(required){

    var searchText = required.toLowerCase();

    
    $('select[name="Product"] option:selected').prop("selected", false)
    $.each($(".table tbody .Status"), function() {
      console.log($(this).parent())
      if(required=="Select Status"){
        $(this).parent().show();       }
      else{
        if($(this).text().toLowerCase().indexOf(searchText) === -1)
          //  $(this).hide();
    
           $(this).parent().hide();

        else
             $(this).parent().show();   }             
    });
 
  }
  onChangeProduct(event){
    let val = event.target.value;
    if(val == "All"){
      this.reqDetailArr = this.reqResponse;
    }else{
      this.reqDetailArr = this.reqResponse.filter(
        item => item.domain === val);
    }
    
    /* var target = $event.target || $event.srcElement || $event.currentTarget;
    console.log( target.attributes.class =="Product")
   this.selectedOption = $event.target.options[$event.target.options.selectedIndex].text;
   console.log(this.selectedOption)
    // console.log($('select[name="Status"] option:selected').attr('class'))
    // console.log($('select[name="Product"] option:selected').attr('class'))
this.ForProduct( this.selectedOption); */


    }
    onChangeStatus(event){
     /*  var target = $event.target || $event.srcElement || $event.currentTarget;
      // console.log( target.attributes.class =="Product")
     this.selectedOption = $event.target.options[$event.target.options.selectedIndex].text;
     console.log(this.selectedOption)
      console.log($('select[name="Status"] option:selected').attr('class'))
      console.log($('select[name="Product"] option:selected').attr('class'))
  this.ForStatus( this.selectedOption); */
      let val = event.target.value;
      if(val == "All"){
        this.reqDetailArr = this.reqResponse;
      }else{
        this.reqDetailArr = this.reqResponse.filter(
          item => (item.status).toLowerCase() === val.toLowerCase());
      }
      
      }

      
pageChanged(event){
  console.log(event)
  this.config.currentPage = event;
  console.log( this.config.currentPage)
  console.log( this.config.data)
  console.log( this.emailList);
  //   this.config)

  this.getBUrequestDetails();


}

getDateRange(value) {
  
  const fromDate = value.fromDate
  const toDate = value.toDate
  this.reqDetailArr = this.reqResponse.filter(e=>e.DOB > fromDate && e.DOB < toDate ) ;
}

}
