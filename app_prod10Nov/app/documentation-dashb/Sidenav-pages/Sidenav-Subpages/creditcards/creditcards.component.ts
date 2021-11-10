import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-creditcards',
  templateUrl: './creditcards.component.html',
  //styleUrls: ['./creditcards.component.css']
})
export class CreditcardsComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
