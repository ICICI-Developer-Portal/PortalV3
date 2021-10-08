import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'safe' })

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  //styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  @Input()
  // url: string = "https://www.mmlpqtpkasjdashdjahd.com";+localStorage.getItem("email");
  url:string="http://34.93.3.223/icici-drupal/web/apigee/details?mail=gpay@apigee.com"
  urlSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }}