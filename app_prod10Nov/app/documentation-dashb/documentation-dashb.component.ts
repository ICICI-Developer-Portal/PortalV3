import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
declare var $: any;
@Component({
  selector: "app-documentation-dashb",
  templateUrl: "./documentation-dashb.component.html"
  //styleUrls: ['./documentation-dashb.component.css']
})
export class DocumentationDashbComponent implements OnInit {
  showSidebar: boolean;
  constructor(private router: Router) {}

  ngOnInit() {
    var url = this.router.url;

    if (url !== "/appathon-dashboard") {
      this.showSidebar = true;
    }
    $('ul li a[data-toggle="tab"]').removeClass('active');
    $('ul li a[data-toggle="tab"]').removeClass('show');
   
    $('ul li a[data-toggle="dropdown"]').removeClass('active');
    $('ul li a[data-toggle="dropdown"]').removeClass('show');
    $('ul li .documetationClass').addClass('active');
  }
}
