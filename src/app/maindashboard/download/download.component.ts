import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
// import 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { saveAs } from 'file-saver';
//declare var require;
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  dataSource: any;
  p: any = '';
  role: string;
  certificate: any;
  //showurl:Boolean;
  constructor(
    private adm: LoginService,
    private spinnerService: Ng4LoadingSpinnerService,
  ) {
    this.request_data();
  }

  ngOnInit() {}

  request_data() {
    /*
    { //success
  "docId": "5",
  "docName": "doc5",
  "docUrl": "https://developer.icicibank.com/#/index",
  "userName": "user5",
  "timestamp": "Jun 11, 2020 1:17:31 PM"
}//Failure
{
    "message": "Document detais Notfound",
    "data": null,
    "status_code": 0,
    "status": false,
    "jwttoken": null
  }*/
  try {
    this.spinnerService.show();
    let _json = {"docId":"1"};
    console.log("getDocDetails request == "+ JSON.stringify(_json));
    this.adm.getDocDetails(_json).subscribe((data: any) => {
      var response = JSON.parse(data._body);
        console.log("getDocDetails == "+ JSON.stringify(response));
      if(response && response.docName && response.docUrl){

        var obj = JSON.parse(response);
        this.dataSource = obj;
        this.spinnerService.hide();

      }else if(response && response.data == null && response.message ){
          alert(response.message);
      }else{
        console.log("else == "+ JSON.stringify(response));
      }
     
    },
    err => {
      console.log('err', err);
     // this.router.navigate(['error']);
    });

  }catch(e){
    console.log('Exception =', e);
  }
    
  }

  //supporting .sql,.cer (not supporting .png, .docx)
  downloadCertificate(url) {
    var json = {
      filePath: url,
    };

    var fileName = url.substring(url.lastIndexOf('/') + 1);

    this.adm.downloadCertificate(json).subscribe((data: any) => {
      this.certificate = data._body;
      console.log(data._body);
      var blob = new Blob([this.certificate], {
        type: 'text/plain',
      });
      saveAs(blob, fileName);
    });
  }
}
