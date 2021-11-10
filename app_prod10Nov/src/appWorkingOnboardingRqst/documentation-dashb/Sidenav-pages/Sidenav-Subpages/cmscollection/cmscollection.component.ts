import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../../../../config/application-constant';

@Component({
  selector: 'app-cmscollection',
  templateUrl: './cmscollection.component.html',
  //styleUrls: ['./cmscollection.component.css']
})
export class CmscollectionComponent implements OnInit {
  constructor() {}
  constants = CONSTANTS;

  ngOnInit() {}
}
