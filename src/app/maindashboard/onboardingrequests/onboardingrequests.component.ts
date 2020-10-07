import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/services";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
// import 'rxjs/Rx';
import { Http, Headers, Response } from "@angular/http";
import { saveAs } from "file-saver";
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
//declare var require;

@Component({
  selector: "app-onboardingrequests",
  templateUrl: "./onboardingrequests.component.html",
  styleUrls: ['./onboardingrequests.component.css']

})
export class OnboardingrequestsComponent implements OnInit {
  onoardingRequestTableData:any;
  dataSource: string[] = [];
  p: any = "";
  role: string;
  certificate: any;
  //showurl:Boolean;
  constructor(
    private adm: LoginService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router:Router,
    private toasterService: ToasterService,
  ) {
    this.request_data();
  }

  ngOnInit() {
    console.log("hi")
    
  }

  request_data() {
    console.log("jiii")
    
    this.spinnerService.show();
    //  this.role=localStorage.getItem('role')
    //   if(localStorage.getItem('role')=='admin'){
    //     this.showurl=true;
    //   }else{
    //   this.showurl=false;
    //   }
    this.adm.Onboardrequestsuser().subscribe((data: any) => {
      var response = data._body;

      var obj = JSON.parse(response);
      this.onoardingRequestTableData=obj;
      console.log(this.onoardingRequestTableData)
      console.log(this.onoardingRequestTableData.length)
      this.onoardingRequestTableData.forEach( (myObject, index) => {
        //console.log(myObject)
        if(myObject.JiraStatus!=404){
          console.log(myObject.JiraStatus)
          console.log(myObject)
          this.dataSource.push( myObject);
         // this.dataSource = this.onoardingRequestTableData;
          console.log( this.dataSource)
        }
      });

      console.log( this.dataSource)
   
     
      this.spinnerService.hide();
    },
    err => {
      console.log('err', err);
     // this.router.navigate(['error']);
      this.toastrmsg('error',"Something went wrong. Please try again in some time.");
      
    },);
  }

  //supporting .sql,.cer (not supporting .png, .docx)
  downloadCertificate(url) {
    var json = {
      filePath: url
    };

    var fileName = url.substring(url.lastIndexOf("/") + 1);

    this.adm.downloadCertificate(json).subscribe((data: any) => {
      this.certificate = data._body;
      console.log(data._body);
      var blob = new Blob([this.certificate], {
        type: "text/plain"
      });
      saveAs(blob, fileName);
    },
    err => {
      console.log('err', err);
     // this.router.navigate(['error']);
      this.toastrmsg('error',"Something went wrong. Please try again in some time.");
    },);
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
