import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-documentupload',
  templateUrl: './documentupload.component.html',
  // styleUrls: ['./documentupload.component.css']
})
export class DocumentuploadComponent implements OnInit {
  dataSource: any;
  p : any = "";
  jiraId:any=[];
  sellersPermitFile: any;
  modalRef: BsModalRef;
  confirmMsg:any;
  sellersPermitString: string;
  imageSrc;
  uploadDoc:FormGroup;

  constructor(
    private adm:LoginService,
    private spinnerService: Ng4LoadingSpinnerService,
    private HttpClient: HttpClient,
    private formbuilder: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    ) { 
    this.spinnerService.show();
  }

  ngOnInit() {
    this.request_data();
    this.uploadDoc=this.formbuilder.group({
      docUpload:["",[Validators.required]],
    });
  }

  get docUpload() {
    return this.uploadDoc.get('docUpload');
  }
  request_data() {
  //  this.spinnerService.show();
  this.adm.Onboardrequestsuser().subscribe((data: any) => {
    var response = data._body;

    var obj = JSON.parse(response);
    this.dataSource = obj;
    for(var i=0; i<=this.dataSource.length; i++){
      this.jiraId.push(this.dataSource[i].JiraId);
    }
    this.spinnerService.hide();
  },
  err => {
    console.log('err', err);
    this.router.navigate(['error']);
  },);

}
public picked(event) {
  let fileList: FileList = event.target.files;
  if (fileList.length > 0) {
    const file: File = fileList[0];
    this.sellersPermitFile = file;
    this.handleInputChange(file);
  }
}
handleInputChange(files) {
  var file = files;
  var reader = new FileReader();
  reader.onloadend = this._handleReaderLoaded.bind(this);
  reader.readAsDataURL(file);
}

_handleReaderLoaded(e) {
  let reader = e.target;
  var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
  this.imageSrc = base64result;
  localStorage.setItem('Imagepath', this.imageSrc);
}

btnConfirm(UATconfirm) {
  event.preventDefault();
      var formData = new FormData();
      let b: any = (<HTMLInputElement>document.getElementById('file1')).files;
      for (let k = 0; k < b.length; k++) {
        formData.append(this.uploadDoc.value.docUpload, b[k]);
      }
      this.HttpClient.post<any>(
        'https://developer.icicibank.com/PDFfileUpload',
        formData,
      ).subscribe(
        res => {
          console.log(res);
          this.confirmMsg = res['message'];
    this.confirmMsg = this.confirmMsg.substring(51, 44);
        },
        err => {
          console.log('err', err);
          this.router.navigate(['error']);
        },
      );
    this.modalRef = this.modalService.show(UATconfirm);
}
Close_ConfirmId() {
  this.modalRef.hide();
}
}