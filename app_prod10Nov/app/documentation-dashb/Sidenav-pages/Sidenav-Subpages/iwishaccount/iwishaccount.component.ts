import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-iwishaccount',
  templateUrl: './iwishaccount.component.html',
  //styleUrls: ['./iwishaccount.component.css']
})
export class IwishaccountComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
