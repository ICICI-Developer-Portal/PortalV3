import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-loan-top-up',
  templateUrl: './loan-top-up.component.html',
  //styleUrls: ['./loan-top-up.component.css']
})
export class LoanTopUpComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
