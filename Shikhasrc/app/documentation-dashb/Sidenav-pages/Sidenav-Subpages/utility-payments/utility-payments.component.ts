import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-utility-payments',
  templateUrl: './utility-payments.component.html',
  //styleUrls: ['./utility-payments.component.css']
})
export class UtilityPaymentsComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
