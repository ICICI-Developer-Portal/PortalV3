import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/services";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
// import 'rxjs/Rx';
import { Http, Headers, Response } from "@angular/http";
import { saveAs } from "file-saver";
import { Router } from '@angular/router';
//declare var require;

@Component({
  selector: "app-onboardingrequests",
  templateUrl: "./onboardingrequests.component.html"
})
export class OnboardingrequestsComponent implements OnInit {
  dataSource: any;
  p: any = "";
  role: string;
  certificate: any;
  //showurl:Boolean;
  constructor(
    private adm: LoginService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router:Router,
  ) {
    this.request_data();
  }

  ngOnInit() {}

  request_data() {
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
      this.dataSource = obj;
      this.spinnerService.hide();
    },
    err => {
      console.log('err', err);
      this.router.navigate(['error']);
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
      this.router.navigate(['error']);
    },);
  }
}
