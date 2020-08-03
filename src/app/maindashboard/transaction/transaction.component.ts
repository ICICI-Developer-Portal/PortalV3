import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(private HttpClient: HttpClient,
   
    private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  

}
