import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  // styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
emailstring:any;
  constructor() { }
  ngOnInit() {
   this.emailstring= "mailto:apibanking@icicibank.com?subject=API Banking Developer Portal || Service Failure";
  }
}
