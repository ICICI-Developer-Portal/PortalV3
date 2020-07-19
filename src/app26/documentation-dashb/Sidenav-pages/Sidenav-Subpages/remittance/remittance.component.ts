import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-remittance',
  templateUrl: './remittance.component.html',
  //styleUrls: ['./remittance.component.css']
})
export class RemittanceComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
