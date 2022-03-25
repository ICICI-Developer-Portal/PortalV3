import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-utilitypayment',
  templateUrl: './utilitypayment.component.html',
  //styleUrls: ['./utilitypayment.component.css']
})
export class UtilitypaymentComponent implements OnInit {

  constructor() { }
  constants = CONSTANTS;

  ngOnInit() {
  }

}
