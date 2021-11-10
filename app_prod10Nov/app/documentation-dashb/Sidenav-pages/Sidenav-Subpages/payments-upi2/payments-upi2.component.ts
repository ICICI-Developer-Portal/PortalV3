import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-payments-upi2',
  templateUrl: './payments-upi2.component.html',
  //styleUrls: ['./payments-upi2.component.css']
})
export class PaymentsUPI2Component implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
