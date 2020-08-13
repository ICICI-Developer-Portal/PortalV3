import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesService } from 'src/app/services/Variables.service';
import { LoginService } from 'src/app/services';
import { ToasterService, Toast } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  responseData;

  constructor(private HttpClient: HttpClient,
    private adm: LoginService,
    private toasterService: ToasterService,
   
    private dashboardService: DashboardService) { }

  ngOnInit() {
    console.log("hiiii")
    let _json = {
     
      "userName" :localStorage.getItem('username'),
      "Token" : localStorage.getItem("jwt")
    }
    console.log("hiiii",_json)
    // console.log("hiiii",  this.adm.getTranscationHistory())
    this.adm.getTranscationHistory(_json).subscribe(
      (data:any) => {
        if(data ){
          console.log(JSON.parse(JSON.stringify(data)));
        }
      },

      err => {

        console.log('err', err);

       // this.router.navigate(['error']);

      },

  );
  }

  

}
