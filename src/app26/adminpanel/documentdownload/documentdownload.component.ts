import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
// import 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentdownload',
  templateUrl: './documentdownload.component.html',
  // styleUrls: ['./documentdownload.component.css']
})
export class DocumentdownloadComponent implements OnInit {
  dataSource: any;
  p: any = '';
  role: string;
  certificate: any;
  APIListV: string; 
  appNameList =[];
  JiraID:any=[];
  searchText;
  filter : any = "";
  public settings = {};
  //showurl:Boolean;
  constructor(
    private adm: LoginService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
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
  //supporting .crt,.zip,pdf,.txt,png,jpeg,jpg,pem,xlsx,.cer
  downloadCertificate(url) {
    var json = {
      filePath: url,
    };

    var fileName = url.substring(url.lastIndexOf('/') + 1);
    var fileType = url.substring(url.lastIndexOf('.') + 1);

    this.adm.downloadCertificate(json).subscribe((data: any) => {
      this.certificate = data._body;
      console.log(data._body);
      if(fileType === "pdf"){
      var blob = new Blob([this.certificate], {
        type: "application/pdf"
      });
      saveAs(blob, fileName);
    }
    if(fileType === "cer" || fileType === "crt" || fileType ==="txt" || fileType === "pem"){
      var blob = new Blob([this.certificate], {
        type: 'text/plain',
      });
      saveAs(blob, fileName);
    }
    if(fileType === "png"){
      var blob = new Blob([this.certificate], {
        type: 'image/png',
      });
      saveAs(blob, fileName);
    }
    if(fileType === "jpeg" || fileType === "jpg"){
      var blob = new Blob([this.certificate], {
        type: 'image/jpeg',
      });
      saveAs(blob, fileName);
    }
    if(fileType === "xlsx"){
      var blob = new Blob([this.certificate], {
        type: ' application/vnd.ms-excel',
      });
      saveAs(blob, fileName);
    }
    if(fileType === "zip"){
      var blob = new Blob([this.certificate], {
        type: 'application/zip',
      });
      saveAs(blob, fileName);
    }
    },
    err => {
      console.log('err', err);
      this.router.navigate(['error']);
    },);
  }

}
