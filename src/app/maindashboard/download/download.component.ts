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
    this.spinnerService.show();
    //  this.role=localStorage.getItem('role')
    //   if(localStorage.getItem('role')=='admin'){
    //     this.showurl=true;
    //   }else{
    //   this.showurl=false;
    //   }
    this.adm.api_description(104).subscribe((data: any) => {
      var response = data._body;

      var obj = JSON.parse(response);
      this.dataSource = obj;
      this.spinnerService.hide();
    });
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
