import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  //styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

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
