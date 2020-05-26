import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-deposit',
  templateUrl: './account-deposit.component.html',
  //styleUrls: ['./account-deposit.component.css']
})
export class AccountDepositComponent implements OnInit {

  constructor() {
    // if(localStorage.getItem('IsReload')=='true')
    // {
    //   window.location.reload(true);
    //   localStorage.setItem('IsReload','false');
    // }
   }

  ngOnInit() {
    
  }

}
