import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANTS } from '../../../../config/application-constant';
import { DatePipe } from '@angular/common';
import { ToasterService, Toast } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Observable } from 'rxjs'
// import 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { saveAs } from 'file-saver';
//declare var require;
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-mis',
  templateUrl: './mis.component.html',
  styleUrls: ['./mis.component.css'],
  providers: [DatePipe],
})
export class MisComponent implements OnInit {
  companyNamesDetails: any;
  companyNames: any;
  dateInput: any;
  misForm: FormGroup;
  constants = CONSTANTS;
  username:any;
  Url:any;
  certificate: any;
  maxDate:any;
  minDate:any;

  /** @class MisComponent
   * @constructor
   */
  constructor(
    private adm: LoginService,
    private formbuilder: FormBuilder,
    private router: Router,
    public datepipe: DatePipe,
    private toasterService: ToasterService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
   this.dateInput= datepipe.transform(Date.now(),'dd-MMM-yyyy');
   let today = new Date()
   let priorDate = new Date().setDate(today.getDate()-20);
   this.minDate= datepipe.transform(new Date(priorDate),'yyyy-MM-dd');
   this.maxDate= datepipe.transform(Date.now(),'yyyy-MM-dd');

  }
  /** on page load
   * @class MisComponent
   * @method ngOnInit
   */
  ngOnInit() {
    //var companyName = 'Niveus Solutions';
    this.misForm = this.formbuilder.group({
      dateInput: ['', [Validators.required]],
    });
  }
  // get companyName() {
  //   return this.misForm.get('companyName');
  // }

  /** componay name autocomplete
   * @class MisComponent
   * @method getCompanyName
   */
  // getCompanyName(companyName) {
  //   this.adm.getCompanyName(companyName).subscribe(data => {
  //     if (data.status === 200) {
  //       this.companyNamesDetails = data;
  //       this.companyNames = JSON.parse(this.companyNamesDetails._body);
  //     }
  //   },
  //   err => {
  //     console.log('err', err);
  //     this.router.navigate(['error']);
  //   },);
  // }
//download csv file
downloadCertificate(url) {
  var json = {
    filePath: url,
  };

  var fileName = url.substring(url.lastIndexOf('/') + 1);
  
  this.adm.downloadCertificate(json).subscribe((data: any) => {
    this.certificate = data._body;
    console.log(data._body);
    // var blob = new Blob([this.certificate], {
    //   type: 'text/plain',
    // });
    // saveAs(blob, fileName);
     let csvHeader = this.certificate.data.csvHeader;
            let csvData = this.certificate(data, csvHeader);
            let blob = new Blob([csvData], { type: 'text/csv' });
            let dwldLink = document.createElement("a");
            let url= window.URL.createObjectURL(blob);
              let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
                if (isSafariBrowser) { //if Safari open in new window to save file with random filename.
                    dwldLink.setAttribute("target", "_blank");
                }
                dwldLink.setAttribute("href", url);
                dwldLink.setAttribute("download", "Enterprise.csv");
                dwldLink.style.visibility = "hidden";
                document.body.appendChild(dwldLink);
                dwldLink.click();
                document.body.removeChild(dwldLink); 
  },
  err => {
    console.log('err', err);
    this.router.navigate(['error']);
  },);
  error => {
    let err = JSON.parse(error._body);
    this.toasterService.pop('error', 'Error!', err.message);
}
}
  /** submit company name and date
   * @class MisComponent
   * @method submit
   */
  
  
  submit() {
    try {
      let selectedDate = this.misForm.get('dateInput').value;
      this.dateInput = this.datepipe.transform(new Date(selectedDate),'dd-MMM-yyyy');
      let _json = {
        
      "userName":localStorage.getItem('username'),
      "fileDate":this.dateInput
    }
    console.log(JSON.stringify(_json));
    this.spinnerService.show();
    this.adm.getMisFile(_json).subscribe((data: any) => {
      this.spinnerService.hide();
      let response = data;
      if(response && response.url){
        this.spinnerService.show();
        let pwa= window.open(response.url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          this.spinnerService.hide();
            alert( 'Please disable your Pop-up blocker and try again.');
        }
     
      }
      else if(response && response.data == null && response.message){ 
        this.toastrmsg("Error",response.message);
       // alert(response.message);
      }else{
        console.log("getMisFile =="+JSON.stringify(data));
        console.log("file downloaded");
      }
      },
      err => {
        this.spinnerService.hide();
        console.log('err', err);
       // this.router.navigate(['error']);
      },() => {console.info('File downloaded successfully');
      this.spinnerService.hide();});
      // this.spinnerService.show();
    } catch {
      //this.toastrmsg('error', console.error());
    }
  }

  toastrmsg(type, title) {
    var toast: Toast = {
      type: type,
      title: title,
      showCloseButton: true
    };
    this.toasterService.pop(toast);
  }
  /** logout from application
   * @class MisComponent
   * @method logout
   */
  logout() {
    localStorage.removeItem('username');
    sessionStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    //localStorage.removeItem('nodeId');
    this.adm.sendUserId('');

    // this.adm.LogoutPortal().subscribe(
    //   res => {
    //     this.router.navigate(['/index']);
    //   },
    //   err => {
    //     this.router.navigate(['/index']);
    //   },
    // );
  }
}
