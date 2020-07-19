import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-autoloan',
  templateUrl: './autoloan.component.html',
  //styleUrls: ['./autoloan.component.css']
})
export class AutoloanComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
