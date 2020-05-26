import { Component, OnInit , EventEmitter,Output,Input } from '@angular/core';


@Component({
  selector: 'app-uatonboarding-dashboard-page-sidebar',
  templateUrl: './uatonboarding-dashboard-page-sidebar.component.html',
  styleUrls: ['./uatonboarding-dashboard-page-sidebar.component.css']
})
export class UATonboardingDashboardPageSidebarComponent implements OnInit {
  @Input()
  domainName: string;
@Output()
notify: EventEmitter<string>=new EventEmitter<string>();
  scroll(el: HTMLElement) {
    alert("hi");
    el.scrollIntoView();
}
passListId(event){
  var target = event.target || event.srcElement || event.currentTarget;
  var idAttr = target.attributes.id;
  var value = idAttr.nodeValue;
  console.log(value);
    this.notify.emit(value);
    value.className = 'active';

}
  constructor() {
    
   }

  ngOnInit() {
    console.log(this.domainName,"sidebar");

  }

}
