import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-compositepay',
  templateUrl: './compositepay.component.html',
})
export class CompositepayComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
