import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  //styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  dataSource: any;
  p : any = "";
  constructor(private adm:LoginService,private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,private toasterService: ToasterService
    ) {
     this.approve_data(); 
     this.spinnerService.show();
    }

  ngOnInit() {
  }
  
     approve_data(){
        
        this.adm.approvals().subscribe(
        (data:any) => {
        var response= data._body; 
        var obj=JSON.parse(response);
        this.dataSource=obj;
        this.spinnerService.hide();
        },
        err => {
          console.log('err', err);
        //  this.router.navigate(['error']);
          this.toastrmsg('error',"Something went wrong. Please try again in some time.");
        },
    );  
    
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
