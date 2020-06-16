import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANTS } from '../../../config/application-constant';
import { DatePipe } from '@angular/common';
import { ToasterService, Toast } from 'angular2-toaster';

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
  /** @class MisComponent
   * @constructor
   */
  constructor(
    private adm: LoginService,
    private formbuilder: FormBuilder,
    private router: Router,
    public datepipe: DatePipe,
    private toasterService: ToasterService,
  ) {
   this.dateInput= datepipe.transform(Date.now(),'dd-MMM-yy');

  }
  /** on page load
   * @class MisComponent
   * @method ngOnInit
   */
  ngOnInit() {
    this.username = localStorage.getItem("username");
    //var companyName = 'Niveus Solutions';
    this.misForm = this.formbuilder.group({
      companyName: ['', [Validators.required]],
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
  getCompanyName(companyName) {
    this.adm.getCompanyName(companyName).subscribe(data => {
      if (data.status === 200) {
        this.companyNamesDetails = data;
        this.companyNames = JSON.parse(this.companyNamesDetails._body);
      }
    },
    err => {
      console.log('err', err);
      this.router.navigate(['error']);
    },);
  }
//download csv file
