import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-personal-loan',
  templateUrl: './personal-loan.component.html',
  //styleUrls: ['./personal-loan.component.css']
})
export class PersonalLoanComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;
  ngOnInit() {}
}
