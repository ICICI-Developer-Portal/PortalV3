import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-insta-imps',
  templateUrl: './insta-imps.component.html',
  //styleUrls: ['./insta-imps.component.css']
})
export class InstaIMPSComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
