import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-corporateinternetbanking',
  templateUrl: './corporateinternetbanking.component.html',
  //styleUrls: ['./corporateinternetbanking.component.css']
})
export class CorporateinternetbankingComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
