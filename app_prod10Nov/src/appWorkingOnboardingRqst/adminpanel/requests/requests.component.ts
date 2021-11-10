import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  //styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  dataSource: any;
  p : any = "";
  constructor(private adm:LoginService,private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    private toasterService: ToasterService
    ) { 
    this.request_data();
    this.spinnerService.show();
  }

  ngOnInit() {
  }
  
  
  
request_data(){ 
   //   this.adm.Onboardrequests() JiraForAdmin
   this.adm.JiraForAdmin() 
      .subscribe(
          (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);
          let tempArr = [];
          obj.forEach( (myObject, index) => {
            //console.log(myObject)
            if(myObject.JiraStatus!=404){
              
              tempArr.push( myObject);
            
            }
           
          });
          this.dataSource = tempArr;
         // this.dataSource=obj;
          this.spinnerService.hide();
          },
          err => {
            console.log('err', err);
          //  this.router.navigate(['error']);
          this.toastrmsg('error',"Something went wrong. Please try again in some time.");
          },
      );  
   }
   toastrmsg(type ,title) {
    var toast: Toast = {
      type: type,
      title:"",
      body:title,
      showCloseButton: true 
    }; 
    this.toasterService.pop(toast);
  }

}
