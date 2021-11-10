import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-corporate-bank',
  templateUrl: './corporate-bank.component.html',
  //styleUrls: ['./corporate-bank.component.css']
})
export class CorporateBankComponent implements OnInit {

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
