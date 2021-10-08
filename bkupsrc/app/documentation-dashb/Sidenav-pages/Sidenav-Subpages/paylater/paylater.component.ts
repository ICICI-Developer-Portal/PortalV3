import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-paylater',
  templateUrl: './paylater.component.html',
  //styleUrls: ['./paylater.component.css']
})
export class PaylaterComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
