import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoginService } from 'src/app/services';
declare var $: any;
@Component({
  selector: 'app-manage-user-role',
  templateUrl: './manage-user-role.component.html',
  styleUrls: ['./manage-user-role.component.css']
})
export class ManageUserRoleComponent implements OnInit {
  modalRef: BsModalRef;
  username:any;
  user_role:any;
  userDetail:any;
  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private formbuilder:FormBuilder,
    private router:Router,
    private modalService: BsModalService,
     private adm:LoginService,
     private toasterService: ToasterService) { }

  ngOnInit() {
    this.getUserList();
  }
  selectChangeHandler(e){
    this.user_role = e.target.val;

  }
  Change_role(uname,role){

    if (uname == "") {
      alert("Username required");
      return;
    } else if (role == "") {
      alert("Select role");
      return;
    }else{
      this.updateUserRole(uname,role);
    }
    
  }
  openModal(changepassw: TemplateRef<any>, uname) {
    this.username = uname;
  
    this.modalRef = this.modalService.show(changepassw, { backdrop:'static' });
    $("#username2").val(uname);
  }
  getUserList(){
    try {
      var json = {
        pincode: "1112125"
      };
      this.spinnerService.show();
      this.adm.getUserList().subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        console.log(obj);
      },
      err => {
        console.log('err', err);
        //this.router.navigate(['error']);
      },);
    } catch {
      console.log("error", console.error());
    }
  }
  getUserRoleData(uname){
    if (uname == "") {
      alert("Username required");
      return;
    }
    try {
      var json = {
        admin_username :localStorage.getItem("username"),
        username :uname,
        Token : localStorage.getItem("jwt")
      };
      this.spinnerService.show();
      this.adm.getUserRoleData(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        this.userDetail = obj.data;
        console.log(obj);
      },
      err => {
        console.log('err', err);
        //this.router.navigate(['error']);
      },);
    } catch {
      console.log("error", console.error());
    }
  }
  updateUserRole(uname,role){
    try {
      var json = {
        admin_username :localStorage.getItem("username"),
        username :uname,
        role :role,
        Token : localStorage.getItem("jwt")
      };
      this.spinnerService.show();
      this.adm.updateUserRole(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        console.log(obj);
        alert(obj.message);
      },
      err => {
        console.log('err', err);
        //this.router.navigate(['error']);
      },);
    } catch {
      console.log("error", console.error());
    }
  }

}
