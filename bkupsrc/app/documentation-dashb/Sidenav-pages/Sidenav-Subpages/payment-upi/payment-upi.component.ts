import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-payment-upi',
  templateUrl: './payment-upi.component.html',
  //styleUrls: ['./payment-upi.component.css']
})
export class PaymentUPIComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
