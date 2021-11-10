import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-cmspayment',
  templateUrl: './cmspayment.component.html',
  //styleUrls: ['./cmspayment.component.css']
})
export class CmspaymentComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
