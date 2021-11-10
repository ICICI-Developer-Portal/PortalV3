import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-recurringdeposit',
  templateUrl: './recurringdeposit.component.html',
  //styleUrls: ['./recurringdeposit.component.css']
})
export class RecurringdepositComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
