import { Injectable } from '@angular/core';

@Injectable()
export class VariablesService {
    onBoarding:OnBoarding;

    constructor(){
        this.onBoarding = new OnBoarding();
    }

    setonBoarding(onBoarding){
        this.onBoarding=onBoarding;
    }

    getonBoarding():OnBoarding{  
        return this.onBoarding;
    }
}

export class OnBoarding{
    txtMerchantName:any='';
    txtDescription:any=''; 
    txtContactEmail:any='';
    txtContactNumber:any='';
    txtRelManager:any ='';
    txtDomainType:any='';
    txtSubDomain:any='';
    txtIPAddress:any='';
    txtCallbackURL:any='';
    txtFile :any='';

    AccountNo:any='';
    CmsClientCode:any='';
    url:any='';
    Ip:any='';
    Port:any='';
    Checksum:any='';
    Encryption:any='';
    Certificate:any='';
    web:any='';
    message:any='';
    ModeOffered:any='';
    noOftransaction:any='';
    transactionLimit:any='';
    ammountField:any='';
    URN1:any='';
    URN2:any='';
    DiscText:any='';
    IFSC_Code:any='';
    vertualCode:any='';
    refundCode:any='';
    Account_no:any='';
 

}



