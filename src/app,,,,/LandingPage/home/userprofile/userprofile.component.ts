import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { LoginService } from 'src/app/services';
import { ToasterService, Toast } from 'angular2-toaster';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  //styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  modalRef: BsModalRef;
  email: any;
  firstname: any;
  lastname: any;
  username: any;
  profilephoto: any;
  ChangepasswForm: FormGroup;
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  constructor(private spinnerService: Ng4LoadingSpinnerService,private formbuilder:FormBuilder,private router:Router,private modalService: BsModalService, private adm:LoginService,private toasterService: ToasterService) {
    this.user_data();
   }

  ngOnInit() {
    this.ChangepasswForm=this.formbuilder.group({
      old_pwd:["",[Validators.required,Validators.pattern(this.pwdPattern)]],
      new_pwd:["",[Validators.required,Validators.pattern(this.pwdPattern)]],
    });
  }
  get old_pwd() { return this.ChangepasswForm.get('old_pwd'); }
  get new_pwd() { return this.ChangepasswForm.get('new_pwd'); }


  toastrmsg(type ,title) {
    var toast: Toast = {
      type: type,
      title:title,
      showCloseButton: true 
    }; 
    this.toasterService.pop(toast);
  }

  // User profile get data
  user_data() {
    var json = {
      "id":localStorage.getItem('id'),
      "username":localStorage.getItem('username')
  };  
    this.spinnerService.show();
   this.adm.Usergetdata(json)
   .subscribe(
     (data:any) => {
       var response= data._body; 
       var obj=JSON.parse(response);
       this.spinnerService.show();
       this.email=obj.data.email;
       this.firstname=obj.data.firstname;
       this.lastname=obj.data.lastname;
       this.username=obj.data.username
       this.profilephoto=obj.data.profile_photo
       if(obj.status==true)
       {   
        this.spinnerService.hide();
       }
       else
       {
       } 
     },
     err => {
       console.log('err', err);
       this.router.navigate(['error']);
     },
  );  
  
  }

  save_userdata(firstname1:any,lastname1:any,email1:any,profile_photo1:any){
    if(firstname1==''){
      this.toastrmsg('error',"Enter First Name");  
      return; 
     }
     else if(lastname1==''){
      this.toastrmsg('error',"Enter Last Name");  
      return; 
     }
     else if(email1==''){
      this.toastrmsg('error',"Enter Email");  
      return; 
     }
    var json={
    "id":localStorage.getItem('id'),
    "firstname":firstname1,
    "lastname":lastname1,
    "profile_photo":profile_photo1,
    "old_pwd":'',
    "new_pwd":'',
    "username":localStorage.getItem('username')
  }
    this.spinnerService.show();
    this.adm.SaveUserdata(json) 
    .subscribe(
      (data:any) => {
        //alert(this.UpdateStockistFrom.value);
        var response= data._body;  
        var obj = JSON.parse(response); 
       if(obj.status==true)
       {   
          this.toastrmsg('success', "Successfully Updated");
          this.spinnerService.hide();
          this.router.navigate(['/dashboard'])
       }
       else
       {
           this.toastrmsg('error', obj.message);
       } 
 
      },
      err => {
        console.log('err', err);
        this.router.navigate(['error']);
      },
      
   );


   }

// Change Password
      Change_passw(){
        try{
          var json = {
            "id":localStorage.getItem('id'),
            "username":localStorage.getItem('username')
          };  
        // this.ChangepasswForm.value.id=localStorage.getItem('id');
        this.adm.ChangePassw(json)
        .subscribe(
          (data:any) => {
            var response= data._body; 
            var obj=JSON.parse(response);
            if(obj.status==true)
            {   
                this.toastrmsg('success', "Password Change Successfully");
                this.modalRef.hide();
            }
            else
            {
                this.toastrmsg('error', obj.message);
            } 
          },
          err => {
            console.log('err', err);
            this.router.navigate(['error']);
          },
        );  
        
        }
        catch{}
      }
  // End region

  // Check Password
  CheckPassw(){
    try{
    //this.ChangepasswForm.value.id=localStorage.getItem('id');
    var json = {
      "old_pwd":this.ChangepasswForm.value.old_pwd,
      "id":localStorage.getItem('id'),
      "username":localStorage.getItem('username')
    }
    this.adm.ChangePassw(json)
    .subscribe(
      (data:any) => {
        var response= data._body; 
        var obj=JSON.parse(response);
        if(obj.status==true)
        {   
          this.Change_passw();
            //this.toastrmsg('success', obj.message);
        }
        else
        {
            this.toastrmsg('error','Please enter correct old password');
        } 
      },
      err => {
        console.log('err', err);
        this.router.navigate(['error']);
      },
    );  
    
    }
    catch{}
  }
// End region


  // modal for change password
  openModal(changepassw: TemplateRef<any>) {
    this.modalRef = this.modalService.show(changepassw, { backdrop:'static' });
  }

  cancel(){
    this.router.navigate(['/dashboard'])
  }



}
