import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-loanmanagement',
  templateUrl: './loanmanagement.component.html',
  //styleUrls: ['./loanmanagement.component.css']
})
export class LoanmanagementComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
