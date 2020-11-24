import { Component, OnInit , EventEmitter,Output,Input } from '@angular/core';

import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
declare var $: any;


@Component({
  selector: 'app-sign-up-sidebar',
  templateUrl: './sign-up-sidebar.component.html',
  styleUrls: ['./sign-up-sidebar.component.css']
})
export class SignUpSidebarComponent implements OnInit {


  constructor(    private router: Router,
    ) { }

  ngOnInit() {
  }

  @Input()
  domainName: string;
@Output()
notify: EventEmitter<string>=new EventEmitter<string>();
  scroll(el: HTMLElement) {
    alert("hi");
    el.scrollIntoView();
}
  scroll_view(id) {
    this.router.navigate(["signUp"]);
    
    setTimeout(function() {
    $('html, body').animate({ scrollTop: $(id).offset().top -100});

      // document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }, 10);
    console.log("yes")
  
  }
  passListId(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    console.log(value);
      this.notify.emit(value);
      value.className = 'active';
  
  }
}
