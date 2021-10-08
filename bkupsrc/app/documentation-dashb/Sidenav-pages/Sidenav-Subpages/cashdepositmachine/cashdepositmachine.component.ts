import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-cashdepositmachine',
  templateUrl: './cashdepositmachine.component.html',
  //styleUrls: ['./cashdepositmachine.component.css']
})
export class CashdepositmachineComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
