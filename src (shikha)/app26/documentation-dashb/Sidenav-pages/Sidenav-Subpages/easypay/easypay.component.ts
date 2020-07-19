import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-easypay',
  templateUrl: './easypay.component.html',
  //styleUrls: ['./easypay.component.css']
})
export class EasypayComponent implements OnInit {

  constructor() { }
  constants = CONSTANTS;
  ngOnInit() {
  }

}
