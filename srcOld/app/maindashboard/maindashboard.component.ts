import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  //styleUrls: ['./maindashboard.component.css']
})
export class MaindashboardComponent implements OnInit {
  constructor(private router:Router) {
  }

  ngOnInit() {
  }

}
