import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-merchant-onboarding',
  templateUrl: './merchant-onboarding.component.html'
  
})
export class MerchantOnboardingComponent implements OnInit {

  constructor(private router:Router, private adm:LoginService, private toasterService: ToasterService) { }

  ngOnInit() {
  }

  toastrmsg(type ,title) {
    var toast: Toast = {
      type: type,
      title:title,
      showCloseButton: true 
    }; 
    this.toasterService.pop(toast);
  }


  Save_merchantonboarding(SelectDomain:any,corporateBanking:any,payLaterApi:any,creditCardApi:any,paymentUPI1Api:any,paymentUPI2Api:any,retailBankingApi:any,MerchantName:any,Description:any,SinglePointofContactEmailID:any,SinglePointofContactNumber:any,ICICIBankRelationshipManager:any,enviornmentSelect:any,IPsToBeWhitelisted:any,CallbackURL:any,ImportanceSelect:any,Photofile:any){
    
    //try{  
    var json={
      "freeText1": SelectDomain,
      "freeText2":MerchantName,
      "freeText3":Description,
      "freeText4":IPsToBeWhitelisted,
      "freeText5": CallbackURL,
      "file1": Photofile,
      "spoc":SinglePointofContactEmailID 
    } 
     this.adm.Merchant_onboarding(json)
     .subscribe(
       (data:any) => {
         var response= data._body; 
         var obj=JSON.parse(response);
         if(obj.status==true )
         { 
          this.toastrmsg('success', "Successfully Create jira Account.");
         }
         else{ }
          
       },
       err => {
         console.log('err', err);
         this.router.navigate(['error']);
       },    
    );  
  //}catch{ }  
  }
  

}
