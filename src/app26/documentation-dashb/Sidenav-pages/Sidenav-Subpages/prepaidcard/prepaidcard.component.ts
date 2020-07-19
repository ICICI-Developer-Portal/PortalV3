import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-prepaidcard',
  templateUrl: './prepaidcard.component.html',
  //styleUrls: ['./prepaidcard.component.css']
})
export class PrepaidcardComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
