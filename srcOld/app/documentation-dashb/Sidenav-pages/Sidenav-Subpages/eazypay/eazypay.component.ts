import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-eazypay',
  templateUrl: './eazypay.component.html',
  //styleUrls: ['./eazypay.component.css']
})
export class EazypayComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
