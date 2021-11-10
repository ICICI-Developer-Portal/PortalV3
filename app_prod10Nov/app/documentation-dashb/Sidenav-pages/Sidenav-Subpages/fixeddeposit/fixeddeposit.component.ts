import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-fixeddeposit',
  templateUrl: './fixeddeposit.component.html',
  //styleUrls: ['./fixeddeposit.component.css']
})
export class FixeddepositComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
