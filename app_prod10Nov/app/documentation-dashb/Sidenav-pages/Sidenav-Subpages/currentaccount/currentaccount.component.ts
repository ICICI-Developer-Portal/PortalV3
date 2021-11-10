import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-currentaccount',
  templateUrl: './currentaccount.component.html',
  //styleUrls: ['./currentaccount.component.css']
})
export class CurrentaccountComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
