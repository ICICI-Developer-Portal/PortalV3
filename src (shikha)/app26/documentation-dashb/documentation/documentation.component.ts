import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services';
import { ToasterService, Toast } from 'angular2-toaster';


@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  //styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private router:Router, private adm:LoginService, private toasterService: ToasterService ) { 
    // if(localStorage.getItem('IsReload')=='true')
    // {
    //   window.location.reload(true);
    //   localStorage.setItem('IsReload','false');
    // }
  }

  ngOnInit() {
    
  }
  
  toastrmsg(type ,title) {
    var toast: Toast = {
      type: type,
      title:title,
      showCloseButton: true 
    }; 
    this.toasterService.pop(toast);
  }

  openModal(Authentication: TemplateRef<any>) {
    this.modalRef = this.modalService.show(Authentication, { backdrop:'static' });
    // this.modalRef2.hide();
  }


}
