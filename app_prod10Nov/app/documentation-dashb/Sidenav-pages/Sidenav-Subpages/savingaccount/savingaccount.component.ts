import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-savingaccount',
  templateUrl: './savingaccount.component.html',
  //styleUrls: ['./savingaccount.component.css']
})
export class SavingaccountComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}

  //open document as PDF
}
