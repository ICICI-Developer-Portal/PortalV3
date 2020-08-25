import { Component, OnInit , EventEmitter,Output,Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-production-sidebar',
  templateUrl: './production-sidebar.component.html',
  styleUrls: ['./production-sidebar.component.css']
})
export class ProductionSidebarComponent implements OnInit {

  modalRef: BsModalRef;
  showTab = 1;


  @Input()
  domainName: string;
@Output()
notify: EventEmitter<string>=new EventEmitter<string>();
  scroll(el: HTMLElement) {
    alert("hi");
    el.scrollIntoView();
}
UAT_help(UAT_Help: any) {
  this.modalRef = this.modalService.show(UAT_Help, {
    backdrop: "static",
    class: "modal-lg"
  });
}
HWI_link(id) {
  this.showTab = id;
  //this.active ='#F06321';
}
passListId(event){
  var target = event.target || event.srcElement || event.currentTarget;
  var idAttr = target.attributes.id;
  var value = idAttr.nodeValue;
  console.log(value);
    this.notify.emit(value);
    value.className = 'active';

}

constructor(
  private modalService: BsModalService
){
    
   }

  ngOnInit() {
    console.log(this.domainName,"sidebar");

  }

}
