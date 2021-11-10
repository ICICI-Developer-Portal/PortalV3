import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loanand-card',
  templateUrl: './loanand-card.component.html',
  //styleUrls: ['./loanand-card.component.css']
})
export class LoanandCardComponent implements OnInit {

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
