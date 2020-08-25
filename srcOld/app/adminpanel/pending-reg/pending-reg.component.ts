import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToasterService, Toast } from 'angular2-toaster';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-reg',
  templateUrl: './pending-reg.component.html',
  //styleUrls: ['./pending-reg.component.css']
})
export class PendingRegComponent implements OnInit {
  dataSource: any;
  p : any = "";

  constructor( private toasterService: ToasterService,private adm:LoginService,private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    ) {
    this.approve_data(); 
    this.spinnerService.show();
   }

  ngOnInit() {
  }

  toastrmsg(type ,title) {
    var toast: Toast = {
      type: type,
      title:title,
      showCloseButton: true 
    }; 
    this.toasterService.pop(toast);
  }

  approve_data(){
        
    this.adm.GetPendingReg().subscribe(
    (data:any) => {
    var response= data._body; 
    var obj=JSON.parse(response);
    this.dataSource=obj;
    //this.approveuser=obj.UserName;
    this.spinnerService.hide()
    },
    err => {
      console.log('err', err);
      this.router.navigate(['error']);
    },
); 
}

approve_Reg(approveUser:any){  
  var json={
    'username':approveUser,
    'approverUser':localStorage.getItem("username")
   }
  this.adm.ApproveReg(json).subscribe(
  (data:any) => {
  var response= data._body; 
  var obj=JSON.parse(response);
  if(obj.status==true){
    this.toastrmsg('success','User approve Successfully');
  }else{
    this.toastrmsg('error',obj.message);
  }
  },
  err => {
    console.log('err', err);
    this.router.navigate(['error']);
  },
); 
}


}
