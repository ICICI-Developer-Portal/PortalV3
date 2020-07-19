import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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
  }
}
