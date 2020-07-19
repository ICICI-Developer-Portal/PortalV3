import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  //styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  dataSource: any;
  p : any = "";
  constructor(private adm:LoginService,private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    ) { 
    this.request_data();
    this.spinnerService.show();
  }

  ngOnInit() {
  }
  
     request_data(){ 
      this.adm.Onboardrequests()
      .subscribe(
          (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);
          this.dataSource=obj;
          this.spinnerService.hide();
          },
          err => {
            console.log('err', err);
            this.router.navigate(['error']);
          },
      );  
   }

}
