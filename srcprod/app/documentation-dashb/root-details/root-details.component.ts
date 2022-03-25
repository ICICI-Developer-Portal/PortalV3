import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
declare var $: any;
@Component({
  selector: 'app-root-details',
  templateUrl: './root-details.component.html',
  // styleUrls: ['./sidenavpages.component.css']
})
export class RootDetailsComponent implements OnInit {
  id: any;
  tabName: any;
  description: any;
  obj: any;
  rootId: any;
  /** get branch node details
   * @class RootDetailsComponent
   * @constructor
   */
  constructor(
    private route: ActivatedRoute,
    private adm: LoginService,
    private ngxXml2jsonService: NgxXml2jsonService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private spinnerService: Ng4LoadingSpinnerService,
    private router:Router,
    private toasterService: ToasterService,
  ) {
    this.route.params.subscribe(params => {
      this.rootId = params['id'];
      this.newApp();
    });
  }

  ngOnInit() {
   

  }
  /** To send data to next page
   * @class RootDetailsComponent
   * @method newApp
   */
  newApp() {
    this.spinnerService.show();
    this.adm.api_description(this.rootId).subscribe((data: any) => {
      var response = data._body;
      this.spinnerService.hide();
      this.obj = JSON.parse(response);
      this.tabName = this.obj[0].TAB_NAME;
      this.description = this.obj[0].DESCRIPTION;
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
