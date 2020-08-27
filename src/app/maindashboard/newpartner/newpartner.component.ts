import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
@Component({
  selector: 'app-newpartner',
  templateUrl: './newpartner.component.html',
  styleUrls: ['./newpartner.component.css']
})
export class NewpartnerComponent implements OnInit {
  signupForm3: FormGroup;
  
  signupForm: FormGroup;

  /** @class MisComponent
   * @constructor
   */
  constructor(
    private adm: LoginService,
    private formbuilder: FormBuilder,
    private router: Router,
    private toasterService: ToasterService,
  ) {
  

  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });



      this.signupForm = this.formbuilder.group({
        name: ["", [Validators.required]],
        mobileNo: ["", [Validators.required]],
        emailId: ["", [Validators.required]],
        location: [""],
        remarks: [""]
      });
  }

  get name() {
    return this.signupForm.get("name");
  }
  get mobileNo() {
    return this.signupForm.get("mobileNo");
  }
  get emailId() {
    return this.signupForm.get("emailId");
  }
  get location() {
    return this.signupForm.get("location");
  }
  get remarks() {
    return this.signupForm.get("remarks");
  }

  submit() {
    try {
     
      let _json = {
        name: this.signupForm.value.name,
        mobileNo:this.signupForm.value.mobileNo,
        emailId:this.signupForm.value.emailId,
        location: this.signupForm.value.location,
       remarks: this.signupForm.value.remarks
    }
    console.log(JSON.stringify(_json));
    
    this.adm.createConnectedPartner(_json).subscribe((data: any) => {
     
      let response = JSON.parse(data._body);
      console.log(JSON.stringify(response));
      if(response &&  response.status_code == 201 && response.message ){
        this.toastrmsg('success', response.message);
      }else{
        this.toastrmsg('error', response.message);
      }
      
      },
      err => {
        console.log('err', err);
       // this.router.navigate(['error']);
      });
     
    } catch {
      //this.toastrmsg('error', console.error());
    }
  }
  toastrmsg(type, title) {
    var toast: Toast = {
      type: type,
      title:"",
      body: title,
      showCloseButton: true
    };
    this.toasterService.pop(toast);
  }
}

